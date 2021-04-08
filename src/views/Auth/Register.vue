<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          class="profile-img-card"
          src="../../assets/logo.png"
      />
      <form v-if="showForm" name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="firstname">Prénom</label>
            <input
                id="firstname"
                v-model="user.firstname"
                :disabled="loading"
                class="form-control"
                name="firstname"
                type="text"
            />
          </div>
          <div class="form-group">
            <label for="lastname">Nom</label>
            <input
                id="lastname"
                v-model="user.lastname"
                :disabled="loading"
                class="form-control"
                name="lastname"
                type="text"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
                id="email"
                v-model="user.email"
                :disabled="loading"
                class="form-control"
                name="email"
                type="email"
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
            <label for="password">Confirmez votre mot de passe</label>
            <input
                id="password"
                v-model="confirmPwd"
                :class="['form-control', !goodPwd ? 'error-input' : confirmPwd ? 'valid-input': '']"
                :disabled="loading"
                name="password"
                type="password"
            />
          </div>
          <div class="form-group">
            <button :disabled="loading" class="btn btn-primary btn-block">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Enregistrer</span>
            </button>
            <small id="emailHelp" class="form-text text-muted">Vous avez déjà un compte ? Cliquez
              <router-link
                  to="/login">ICI
              </router-link>
            </small>
          </div>
        </div>
      </form>

      <div
          v-if="message"
          :class="successful ? 'alert-success' : 'alert-danger'"
          class="alert"
      >{{ message }}
      </div>
      <small v-if="!showForm" id="emailHelp" class="form-text text-muted">Cliquez
        <router-link
            to="/login">ICI
        </router-link>
        si vous n'êtes pas redirigé.
      </small>
    </div>
  </div>
</template>

<script>
import User from '@/models/User';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', ''),
      submitted: false,
      successful: false,
      message: '',
      showForm: true,
      loading: false,
      confirmPwd: '',
      goodPwd: true
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  watch: {
    confirmPwd() {
      this.goodPwd = this.user.password === this.confirmPwd;
    },
    'user.password': function () {
      this.goodPwd = this.user.password === this.confirmPwd;
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      if (this.user.email.trim() && this.user.firstname.trim() && this.user.lastname.trim() && this.user.password.trim()) {
        if (this.user.password === this.confirmPwd) {
          this.loading = true
          this.$store.dispatch('auth/register', this.user).then(
              () => {
                this.loading = false
                this.showForm = false;
                this.message = 'Enregistrement réussi, un email de confirmation vous a été envoyé pour valider votre compte.';
                this.successful = true;
                let that = this;
                setTimeout(function () {
                  that.$router.push('/login');
                }, 5000);
              },
              error => {
                this.loading = false
                this.message = error.response.data.error;
                this.successful = false;
              }
          );
        } else {
          this.message = "Les deux mots de passe ne correspondent pas !"
        }
      } else {
        this.message = "Tous les champs doivent être remplis pour continuer !"
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

.error-input {
  background-color: #ec2828;
}

.valid-input {
  background-color: #4BB543;
}
</style>
