<template>
  <div id="app">
    <app-snackbar
        :show="getSnackbar.text!==''"
        :text="getSnackbar.text"
        :type="getSnackbar.type"
        @close="close()"
    />
    <router-view/>
  </div>
</template>

<script>
import AppSnackbar from "./components/units/AppSnackbar";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "App",
  components: {AppSnackbar},
  computed: {
    ...mapGetters(['getSnackbar'])
  },
  methods: {
    ...mapActions(['setSnackBar']),
    close() {
      this.setSnackBar({'type': 'success', 'text': ''})
    }
  }
}
</script>

<style lang="scss">
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

.navbar-brand {
  margin-left: 10px;
}
</style>
