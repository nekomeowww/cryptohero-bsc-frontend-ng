<template lang="pug">
  #login-view
    section.hero(class="is-warning is-bold" v-if="isMetaMaskLocked")
      .hero-body
        .container
          h1.title|{{$t('MetaMask is locked')}}
          h2.subtitle|{{$t('UnlockYourMetaMask')}}

    section.hero(class="is-danger is-bold" v-if="isNoMetaMask")
          .hero-body
            .container
              h1.title|{{$t('NoMetaMaskTitle')}}
              h2.subtitle|{{$t('NoMetaMaskMsg')}}

    section.hero(class="is-danger is-bold" v-if="isNotEnabled")
          .hero-body
            .container
              h1.title| Please connect your MetaMask
              button(@click="enableWeb3()")| Connect

    section.hero(class="is-success is-bold" v-if="me")
          .hero-body
            router-link(:to="jumpToUser")
              .container
                h1.title|{{$t('LoginOKTitle')}}
                h2.subtitle|{{$t('LoginOKMsg')}}

</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SignInView",
  computed: {
    me() {
      return this.$store.state.me;
    },
    signInError() {
      return this.$store.state.signInError;
    },
    isNoMetaMask() {
      return this.signInError === "NO_METAMASK";
    },
    isMetaMaskLocked() {
      return this.signInError === "METAMASK_LOCKED";
    },
    isNotEnabled() {
      return this.signInError === "METAMASK_NOT_ENABLED"
    },
    jumpToUser() {
      if (!this.me) return null;
      return {
        name: "User",
        params: { address: this.me }
      };
    }
  },
  methods: {
    ...mapActions(['FETCH_ME']),
    async enableWeb3() {
        console.log('connect')
        await window.ethereum.enable()
        await this.FETCH_ME()
    }
  }
};
</script>

<style scoped></style>
