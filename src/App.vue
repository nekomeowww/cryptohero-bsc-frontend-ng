<template>
  <div id="app">
    <Header />

    <div class="container main-container">
      <router-view :key="key"></router-view>
    </div>

    <Footer />
  </div>
</template>

<script>
import { getAppName } from "./util";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  methods: {
    ...mapActions(["FETCH_ME", "FetchCards"]),
    initAppName() {
      document.title = getAppName();
    }
  },
  mounted() {
    this.initAppName();
    this.FETCH_ME();
    this.FetchCards();
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  }
};
</script>

<style>
.main-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
