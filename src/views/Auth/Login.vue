<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          class="profile-img-card"
          src="../../assets/logo.png"
      />
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
              id="email"
              v-model="user.email"
              :disabled="loading"
              class="form-control"
              name="email"
              type="text"
          />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
              id="password"
              v-model="user.password"
              :disabled="loading"
              class="form-control"
              name="password"
              type="password"
          />
        </div>
        <div class="form-group">
          <button :disabled="loading" class="btn btn-primary btn-block">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Connexion</span>
          </button>
          <small id="emailHelp" class="form-text text-muted">Vous n'avez pas encore de compte ? Cliquez
            <router-link
                to="/register">ICI
            </router-link>
          </small>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from '@/models/User';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', '', '', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  methods: {
    handleLogin() {
      if (this.user.email && this.user.password) {
        this.loading = true;
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/');
            },
            error => {
              this.loading = false;
              this.message = error.response.data.error;
            }
        );
      } else {
        this.message = "Veuillez remplir tous les champs pour continuer !"
      }
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 100%;
  height: 100%;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.spinner-border {
  margin-right: 5px;
}
</style>
