<template>
  <div class="item-view">
    <div v-if="item">
      <div class="columns is-multiline is-mobile">
        <div class="column is-full-mobile">
          <img :src="getCardImage" style="width:100%;" />
        </div>
        <div class="column is-full-mobile">
          <img :src="getCardBackSideImage" style="width:100%;" />
        </div>
        <div class="column is-full-mobile">
          <div class="content">
            <!-- Experimental Start -->
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">
                      {{ item.nickname }} · {{ item.name }}
                    </p>
                    <p class="title is-5">{{ $t("Owner") }} {{ ownerTag }}</p>
                    <p class="subtitle is-6">
                      {{ $t("Current Price") }}：{{
                        toDisplayedPrice(item.price)
                      }}
                    </p>
                    <!-- <p class="subtitle is-6">{{ $t("Slogan") }}: {{ ad }}</p> -->
                  </div>
                </div>
              </div>
            </div>
            <!-- Experimental End -->

            <!-- <router-link :to="{ name: 'User', params:{address: item.owner}}">
            <figure class="image is-128x128">
              <img class="item-image"
              :src="getOwnerAvatar">
            </figure>
            </router-link>
            <ul>
              <li>{{$t('Owner')}}：
                <router-link :to="{ name: 'User', params:{address: item.owner}}">
                  {{ownerTag}}
                </router-link>
              </li>
              <li>{{$t('Current Price')}}：{{toDisplayedPrice(item.price)}}</li>
            </ul>
            <p class="item-slogan">{{$t('Slogan')}}: {{ad}}</p>-->
            <!-- <article v-if="notOwner" class="message is-warning">
              <div class="message-body">{{ $t("EDIT_SLOGAN_TIP") }}</div>
            </article> -->
          </div>

          <template v-if="notOwner">
            <div class="buttons">
              <button
                class="button is-danger is-outlined"
                @click="onBuy(1)"
                :disabled="isBuying"
              >
                {{ isBuying ? $t("BUYING_BTN") : $t("BUY_BTN") }}
              </button>
              <!-- <button class="button is-danger is-outlined" @click="onBuy(1.1)">
                {{ $t("PREMIUM_BUY_BTN", { rate: "10%" }) }}
              </button>
              <button class="button is-danger is-outlined" @click="onBuy(1.2)">
                {{ $t("PREMIUM_BUY_BTN", { rate: "20%" }) }}
              </button>
              <button class="button is-danger is-outlined" @click="onBuy(1.3)">
                {{ $t("PREMIUM_BUY_BTN", { rate: "30%" }) }}
              </button>
              <button class="button is-danger is-outlined" @click="onBuy(1.4)">
                {{ $t("PREMIUM_BUY_BTN", { rate: "40%" }) }}
              </button>
              <button class="button is-danger is-outlined" @click="onBuy(1.5)">
                {{ $t("PREMIUM_BUY_BTN", { rate: "50%" }) }}
              </button> -->
            </div>
            <BuyNotifications
              v-if="payTokenInfo"
              :payTokenInfo="payTokenInfo"
              :buyStep="buyStep"
              :price="item.price"
            />
          </template>

          <template v-if="isOwner">
            <!-- <div class="buttons">
              <button class="button is-warning" @click="onUpdateAd">
                {{ $t("Edit Slogan") }}
              </button>
            </div> -->
            <p>你拥有这个卡牌。</p>
          </template>
        </div>
      </div>
    </div>
    <div v-else-if="item === null">Token doesn't exist</div>
  </div>
</template>

<script>
import { buyItem, approveSpending } from "@/api";
import { toReadablePrice } from "@/util";
import BuyNotifications from "../components/BuyNotifications";
import { mapState } from "vuex";

export default {
  name: "item-view",

  data: () => ({
    buyStep: 0,
    isBuying: false
  }),

  components: {
    BuyNotifications
  },

  computed: {
    ...mapState(["payTokenInfo"]),
    ownerTag() {
      return this.item.owner.slice(-6).toUpperCase();
    },
    itemId() {
      return this.$route.params.id;
    },
    me() {
      return this.$store.state.me || {};
    },
    ownerAddress() {
      return this.item.owner;
    },
    item() {
      return this.$store.state.items[this.itemId];
    },
    ad() {
      return this.$store.state.ads[this.itemId];
    },
    getCardImage() {
      return `https://hero-static.mttk.net/assets/heros/${this.itemId}.jpg`;
    },
    getCardBackSideImage() {
      return `https://hero-static.mttk.net/assets/back/${this.itemId}.jpeg`;
    },
    isOwner() {
      return this.item.owner === this.me;
    },
    notOwner() {
      return !this.isOwner;
    }
  },
  async created() {
    this.$store.dispatch("FETCH_ITEM", this.itemId);
    this.$store.dispatch("FETCH_AD", this.itemId);
  },

  watch: {},

  methods: {
    async onBuy(rate) {
      if (this.$store.state.signInError) {
        return this.$router.push({ name: "Login" });
      }
      const buyPrice = (this.item.price * rate).toFixed(0);
      try {
        this.isBuying = true;
        this.buyStep = 1;
        await approveSpending(buyPrice, this.me);
        this.buyStep = 2;
        await buyItem(this.itemId, this.me);
        this.buyStep = 3;
      } catch (e) {
        this.buyStep = -1;
        alert(this.$t("BUY_FAIL_MSG"));
        console.log(e);
      }
      this.isBuying = false;
    },
    toDisplayedPrice(priceInWei) {
      const { payTokenInfo } = this;
      const readable = toReadablePrice(
        priceInWei,
        (payTokenInfo && payTokenInfo.decimals) || 4
      );
      return `${readable.price} ${payTokenInfo && payTokenInfo.symbol}`;
    }
  }
};
</script>
<style scoped>
.item-slogan {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
