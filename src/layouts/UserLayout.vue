<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a class="navbar-brand" href @click.prevent>
      <img alt="Logo" src="../../src/assets/logo.png">
    </a>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/">
          <i class="fas fa-home"></i>
          Accueil
        </router-link>
      </li>
      <li v-if="showAdminBoard" class="nav-item">
        <router-link class="nav-link" to="/admin">
          <i class="fas fa-cogs"></i>
          Administration
        </router-link>
      </li>
      <!--      <li class="nav-item">-->
      <!--        <router-link v-if="currentUser" class="nav-link" to="/new">-->
      <!--          <i class="fas fa-plus-circle"></i>-->
      <!--          Nouveau-->
      <!--        </router-link>-->
      <!--      </li>-->
      <!--      <li class="nav-item">-->
      <!--        <router-link v-if="currentUser" class="nav-link" to="/list">-->
      <!--          <i class="fas fa-list"></i>-->
      <!--          Listes-->
      <!--        </router-link>-->
      <!--      </li>-->
    </div>

    <div v-if="!currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/register">
          <i class="fas fa-user-plus"></i>
          Enregistrement
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/login">
          <i class="fas fa-sign-in-alt"></i>
          Connexion
        </router-link>
      </li>
    </div>

    <div v-if="currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/profile">
          <i class="fas fa-user"></i>
          {{ currentUser.firstname }} {{ currentUser.lastname }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href @click.prevent="logOut">
          <i class="fas fa-sign-out-alt"></i>

        </a>
      </li>
    </div>
  </nav>
  <div class="container">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "UserLayout",
  computed: {
    currentUser() {
      return this.$store.state.auth.data.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  height: 8%;
}

.container {
  height: 92%;
}

.navbar-brand {
  img {
    width: 125px;
    height: 50px;
  }
}
</style>
