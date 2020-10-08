<template>
  <div class="rel-container">
    <div class="rel-title">
      Referral

      <div class="rel-link">
        <input v-model="link" disabled class="rel-link-input">
        <button class="rel-link-copy" @click="copyToClipboard">Copy</button>
      </div>
      <span class="rel-address">Current Address: {{text}}</span>
    </div>
  </div>
</template>

<script>

import web3 from "@/web3";
import { encryptText } from '@/util';
import { decryptText } from '../util';

export default {
  data() {
    return {
      text: "",
      link: "",
      encrypted: ""
    };
  },
  methods: {
    async getAccountReady() {
      const [address] = await web3.eth.getAccounts();
      this.text = address
      this.encrypted = encryptText(this.text)
      this.link = window.location.origin + "/referral?l=" + this.encrypted
      const result = decryptText(this.encrypted)
      alert(result)
    },
    copyToClipboard () {
      console.log('copy')
      const text = this.link
      if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData('Text', text)
      } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        var textarea = document.createElement('textarea')
        textarea.textContent = text
        textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea)
        textarea.select()
        try {
          console.log('success')
          return document.execCommand('copy') // Security exception may be thrown by some browsers.
        } catch (ex) {
          console.error('failed')
          return false
        } finally {
          document.body.removeChild(textarea)
        }
      }
    }
  },
  mounted() {
    this.getAccountReady()
  }
};
</script>

<style scoped>
.rel-container {
  padding: 0 20px;
  margin: 40px auto;
}
.rel-title {
  font-size: 30px;
}
.rel-link-input {
  outline: none;
  height: 40px;
  width: calc(100% - 57px);
  border: 2px solid #48a2e2;
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
  border-right: none;
  padding: 0 10px;
}
.rel-link-copy {
  outline: none;
  height: 40px;
  color: white;
  padding: 0px 10px 0px 10px;
  border: 2px solid #48a2e2;
  background-color: #48A2E2;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}
.rel-link-copy:hover {
  border: 2px solid #75c2f8;
  background-color: #75C2F8;
}
.rel-address {
  font-size: 14px;
}
</style>
