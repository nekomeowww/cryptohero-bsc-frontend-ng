<template>
  <div class="">
    <div v-if="loading" class="loader-wrapper">
      <pulse-loader></pulse-loader>
    </div>
    <ItemList :itemIds="itemIds" />
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader";
import ItemList from "@/components/ItemList";
import { getTotal, getItemIds } from "@/api";
import { toReadablePrice } from "@/util";
import { mapState } from "vuex";

export default {
  name: "item-list",
  components: {
    PulseLoader,
    ItemList
  },

  data() {
    return {
      loading: true,
      itemIds: [],
      total: null
    };
  },

  computed: {
    ...mapState(["payTokenInfo"])
  },

  async created() {
    this.total = await getTotal();
    const itemIds = await getItemIds(0, this.total);
    this.itemIds = itemIds;
    this.loading = false;
  },

  methods: {
    toDisplayedPrice(priceInWei) {
      const { payTokenInfo } = this;
      const readable = toReadablePrice(priceInWei, payTokenInfo.decimals);
      return `${readable.price} ${payTokenInfo && payTokenInfo.symbol}`;
    }
  },
  watch: {}
};
</script>
<style scoped>
.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
