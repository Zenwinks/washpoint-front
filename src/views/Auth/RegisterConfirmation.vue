<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          class="profile-img-card"
          src="../../assets/logo.png"
      />
      <div v-if="message">
        <div
            :class="successful ? 'alert-success' : 'alert-danger'"
            class="alert"
        >{{ message }}
        </div>
        <small v-if="message" id="emailHelp" class="form-text text-muted">Cliquez
          <router-link
              to="/login">ICI
          </router-link>
          si vous n'êtes pas redirigé.
        </small>
      </div>
      <div v-else class="spinner">
        <span v-show="loading" class="spinner-border spinner-border-sm"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterConfirmation",
  data() {
    return {
      submitted: false,
      successful: false,
      message: '',
      loading: false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    } else {
      this.handleRegisterConfirmation(this.$route.params.token);
    }
  },
  methods: {
    handleRegisterConfirmation(token) {
      this.loading = true;
      this.message = '';
      this.submitted = true;
      this.$store.dispatch('auth/registerConfirmation', token).then(
          () => {
            this.loading = false;
            this.message = "Votre compte a été validé avec succès, vous pouvez désormais bénéficier de toutes les fonctionnalités proposées.";
            this.successful = true;
            let that = this;
            setTimeout(function () {
              that.$router.push('/login');
            }, 5000);
          },
          error => {
            this.loading = false;
            this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            this.successful = false;
          }
      );
    }
  }
}
</script>

<style lang="scss" scoped>
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

.spinner {
  display: flex;
  justify-content: center;

  .spinner-border {
    width: 50px;
    height: 50px;
  }
}
</style>
