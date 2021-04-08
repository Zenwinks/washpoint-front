<template>
  <user-layout>
    <div class="wrapper">
      <header class="jumbotron">
        <h3>Accueil</h3>
      </header>
      <div class="content">
        <div class="new-btn" @click="$router.push('/new')">
          <i class="fas fa-plus-circle"/>&nbsp;
          Créer une nouvelle fiche
        </div>
        <div class="list-btn" @click="$router.push('/list')">
          <i class="fas fa-list"/>&nbsp;
          Liste des fiches
        </div>
      </div>
    </div>
  </user-layout>
</template>

<script>
import UserLayout from "../layouts/UserLayout";

export default {
  name: 'Home',
  components: {
    UserLayout
  },
  data() {
    return {
      content: ''
    };
  }
};
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
    display: flex;
    flex-direction: column;
    align-items: center;

    .new-btn, .list-btn {
      width: 50%;
      height: 15%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: dodgerblue;
      border-radius: 10px;
      font-size: 20px;
      color: white;

      &:hover {
        background-color: royalblue;
      }
    }

    .list-btn {
      margin-top: 5%;
    }
  }
}
</style>
