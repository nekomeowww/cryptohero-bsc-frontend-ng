<template>
  <div class="notifications" v-if="payTokenInfo">
    <Notification v-if="buyStep === 0">
      <template v-slot:title>
        这个卡牌需要 {{ payTokenInfo.name }}币 ({{ payTokenInfo.symbol }})
        才能购买
      </template>
      购买步骤：
      <br />
      1. 先授权我们合约花费指定金额 {{ payTokenInfo.symbol }} <br />
      2. 调用我们合约去扣除你的 ERC20 代币。
    </Notification>
    <Notification v-else-if="buyStep === 1">
      <template v-slot:title>
        需要消费授权
      </template>
      正在使用 {{ payTokenInfo.name }}币 ({{ payTokenInfo.symbol }})
      购买这张卡牌， <br />请授权（Approve）我们的卡牌合约从你的账户中扣除
      {{ toDisplayedPrice(price) }}。
      <br />
      确认授权后，稍后会推送交易结果，授权成功后会自动进入购买程序，请不要离开。
    </Notification>
    <Notification class="message is-primary" v-else-if="buyStep === 2">
      <template v-slot:title>
        请确认你的交易
      </template>
      点击 Confirm 确认交易，稍后会推送交易结果，请不要离开。
    </Notification>
    <Notification class="message is-success" v-else-if="buyStep === 3">
      <template v-slot:title>
        交易发送成功
      </template>
      {{ $t("BUY_SUCCESS_MSG") }}
    </Notification>
    <Notification class="message is-danger" v-else>
      <template v-slot:title>
        购买失败
      </template>
      发生了一些问题，请联系开发者。
    </Notification>
  </div>
</template>

<script>
import Notification from "./Notification";
import { toReadablePrice } from "@/util";

export default {
  name: "BuyNotifications",
  props: ["payTokenInfo", "buyStep", "price"],
  components: {
    Notification
  },
  methods: {
    toDisplayedPrice(priceInWei) {
      const { payTokenInfo } = this;
      const readable = toReadablePrice(priceInWei, payTokenInfo.decimals);
      return `${readable.price} ${payTokenInfo && payTokenInfo.symbol}`;
    }
  }
};
</script>
