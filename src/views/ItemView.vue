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
                    <p class="subtitle is-6">{{ $t("Slogan") }}: {{ ad }}</p>
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
            <article v-if="notOwner" class="message is-warning">
              <div class="message-body">{{ $t("EDIT_SLOGAN_TIP") }}</div>
            </article>
          </div>

          <template v-if="notOwner">
            <div class="buttons">
              <button class="button is-danger is-outlined" @click="onBuy(1)">
                {{ $t("BUY_BTN") }}
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
            <div class="notifications" v-if="payTokenInfo">
              <article class="message is-info" v-if="buyStep === 0">
                <div class="message-body">
                  
                    这个卡牌需要 {{ payTokenInfo.name }}币 ({{
                    payTokenInfo.symbol
                  }}) 才能购买
                  <br />
                  购买步骤：
                  <br />
                  1. 先授权我们合约花费指定金额 {{
                    payTokenInfo.symbol
                  }} <br />
                  2. 调用我们合约去扣除你的 ERC20 代币。
                </div>
              </article>
              <article class="message is-primary" v-else-if="buyStep === 1">
                <div class="message-body">
                  需要消费授权
                  <br />
                  正在使用 {{ payTokenInfo.name }}币 ({{ payTokenInfo.symbol }})
                  购买这张卡牌，
                  <br />请授权（Approve）我们的卡牌合约从你的账户中扣除
                  {{ toDisplayedPrice(item.price) }}。
                  <br />
                  确认授权后，稍后会推送交易结果，授权成功后会自动进入购买程序，请不要离开。
                </div>
              </article>
              <article class="message is-primary" v-else-if="buyStep === 2">
                <div class="message-body">
                  请确认你的交易
                  <br />
                  点击 Confirm 确认交易，稍后会推送交易结果，请不要离开。
                </div>
              </article>
              <article class="message is-success" v-else-if="buyStep === 3">
                <div class="message-body">
                  购买成功
                  <br />
                  请稍后手动刷新页面，即可确认卡牌购买情况。
                </div>
              </article>
              <article class="message is-danger" v-else>
                <div class="message-body">
                  购买失败
                  <br />
                  发生了一些问题，请联系开发者。
                </div>
              </article>
            </div>
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
import { buyItem, approveSpending, setNextPrice } from "@/api";
import { toReadablePrice } from "@/util";
import { mapState } from "vuex";

export default {
  name: "item-view",

  data: () => ({
    buyStep: 0
  }),

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
        this.buyStep = 1;
        await approveSpending(buyPrice, this.me);
        this.buyStep = 2;
        await buyItem(this.itemId, this.me);
        this.buyStep = 3;
        alert(this.$t("BUY_SUCCESS_MSG"));
        setNextPrice(this.itemId, buyPrice);
      } catch (e) {
        this.buyStep = -1;
        alert(this.$t("BUY_FAIL_MSG"));
        console.log(e);
      }
    },
    toDisplayedPrice(priceInWei) {
      const { payTokenInfo } = this;
      const readable = toReadablePrice(priceInWei, payTokenInfo.decimals);
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
