<template>
  <div class="rel-container">
    <div class="rel-title">
      Referral

      <div class="rel-link">
        <input v-model="link" disabled class="rel-link-input" />
        <button class="rel-link-copy" @click="copyToClipboard">Copy</button>
      </div>
      <span class="rel-address">Current Address: {{ text }}</span
      ><br />
      <span v-if="inviter" class="rel-address"
        >Inviter Address: {{ inviter }}</span
      >
    </div>
  </div>
</template>

<script>
import web3 from '@/web3'
import { encryptText, decryptText, setCookie } from '@/util'
import { clearCookie, getCookie } from '../util'

export default {
  data () {
    return {
      text: '',
      link: '',
      encrypted: '',
      inviter: ''
    }
  },
  methods: {
    async getAccountReady () {
      const [address] = await web3.eth.getAccounts()
      this.text = address
      this.encrypted = encryptText(this.text)
      this.link = window.location.origin + '/referral?l=' + this.encrypted
    },
    copyToClipboard () {
      const text = this.link
      if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData('Text', text)
      } else if (
        document.queryCommandSupported &&
        document.queryCommandSupported('copy')
      ) {
        var textarea = document.createElement('textarea')
        textarea.textContent = text
        textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea)
        textarea.select()
        try {
          return document.execCommand('copy') // Security exception may be thrown by some browsers.
        } catch (ex) {
          console.error('failed')
          return false
        } finally {
          document.body.removeChild(textarea)
        }
      }
    },
    queryParse (search) {
      if (!search) return {}
      const queryString = search[0] === '?' ? search.substring(1) : search
      const query = {}
      queryString.split('&').forEach(queryStr => {
        const [key, value] = queryStr.split('=')
        if (key) query[decodeURIComponent(key)] = decodeURIComponent(value)
      })
      return query
    }
  },
  mounted () {
    this.getAccountReady()
    const c = getCookie('invitee_id')
    if (window.location.search) {
      try {
        const query = this.queryParse(window.location.search)
        const res = decryptText(query.l)
        this.inviter = res
        clearCookie('invitee_id')
        setCookie('invitee_id', this.inviter, 3)
        alert(res)
        const invitee = getCookie('invitee_id')
        alert('get cookie: ' + invitee)
      } catch (e) {
        console.error(e)
      }
    } else if (c) {
      this.inviter = c
    }
  }
}
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
  background-color: #48a2e2;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}
.rel-link-copy:hover {
  border: 2px solid #75c2f8;
  background-color: #75c2f8;
}
.rel-address {
  font-size: 14px;
}
</style>
