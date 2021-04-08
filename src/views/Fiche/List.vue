<template>
  <user-layout>
    <div class="wrapper">
      <header class="jumbotron">
        <h3>Liste des fiches</h3>
      </header>
      <div class="content">

      </div>
    </div>
  </user-layout>
</template>

<script>
import UserLayout from "../../layouts/UserLayout";

export default {
  name: "List",
  components: {
    UserLayout
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .jumbotron {
    width: 100%;
    height: 20%;
  }

  .content {
    width: 100%;
    height: 80%;
  }
}
</style>
