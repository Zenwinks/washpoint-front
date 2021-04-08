<template>
  <user-layout>
    <div class="wrapper">
      <header class="jumbotron">
        <h3>
          Profil
        </h3>
      </header>
      <div v-if="!editMode && !changePwd">
        <div class="form-group">
          <label for="firstname">Prénom</label>
          <input id="firstname" v-model="user.firstname" class="form-control" disabled type="text">
        </div>
        <div class="form-group">
          <label for="lastname">Nom</label>
          <input id="lastname" v-model="user.lastname" class="form-control" disabled type="text">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="user.email" class="form-control" disabled type="email">
        </div>
        <button class="btn btn-primary" @click="editMode = true">Modifier le profil</button>
        <button class="btn btn-secondary second-btn" @click="changePwd = true">Changer de mot de passe</button>
      </div>
      <div v-else-if="editMode && !changePwd">
        <div class="form-group">
          <label for="firstname">Prénom</label>
          <input id="firstname" v-model="user.firstname" class="form-control" type="text">
        </div>
        <div class="form-group">
          <label for="lastname">Nom</label>
          <input id="lastname" v-model="user.lastname" class="form-control" type="text">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="user.email" class="form-control" type="email">
        </div>
        <button class="btn btn-success" @click="updateUser()">Enregistrer</button>
        <button class="btn btn-danger second-btn" @click="editMode = false; message = ''">Annuler</button>
      </div>
      <div v-else>
        <div class="form-group">
          <label for="actualPassword">Mot de passe actuel</label>
          <input id="actualPassword" v-model="actualPwd" class="form-control" type="password">
        </div>
        <div class="form-group">
          <label for="newPassword">Nouveau mot de passe</label>
          <input id="newPassword" v-model="newPwd" class="form-control" type="password">
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmation nouveau mot de passe</label>
          <input id="confirmPassword" v-model="confirmNewPwd"
                 :class="['form-control', !goodPwd ? 'error-input' : confirmNewPwd ? 'valid-input': '']"
                 type="password">
        </div>
        <button class="btn btn-success" @click="updatePwd()">Enregistrer</button>
        <button class="btn btn-danger second-btn" @click="changePwd = false; message = ''">Annuler</button>
      </div>
      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
      </div>
    </div>
  </user-layout>
</template>

<script>
import UserLayout from "../../layouts/UserLayout";
import UserService from '@/services/user.service';
import {mapActions} from "vuex";

export default {
  name: 'Profile',
  components: {
    UserLayout
  },
  data() {
    return {
      editMode: false,
      changePwd: false,
      actualPwd: '',
      newPwd: '',
      confirmNewPwd: '',
      goodPwd: true,
      user: {},
      message: ''
    }
  },
  watch: {
    confirmNewPwd() {
      this.goodPwd = this.newPwd === this.confirmNewPwd;
    },
    newPwd() {
      this.goodPwd = this.newPwd === this.confirmNewPwd;
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.data.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    } else {
      this.user = this.currentUser;
    }
  },
  methods: {
    ...mapActions(["setSnackBar"]),
    updateUser() {
      if (this.user.email.trim() && this.user.firstname.trim() && this.user.lastname.trim()) {
        UserService.updateUser({
          id: this.user.id,
          email: this.user.email,
          firstname: this.user.firstname,
          lastname: this.user.lastname
        }).then(() => {
          this.message = '';
          this.setSnackBar({'type': 'success', 'text': 'Utilisateur modifié avec succès !'});
          this.updateLocalStorage();
          this.editMode = false;
        }).catch(error => {
          this.message = '';
          this.setSnackBar({'type': 'fail', 'text': error.response.data.error})
        })
      } else {
        this.message = "Tous les champs sont obligatoires !";
      }
    },
    updatePwd() {
      if (this.actualPwd.trim() && this.newPwd.trim() && this.confirmNewPwd.trim()) {
        if (this.newPwd === this.confirmNewPwd) {
          UserService.updatePwd({
            id: this.user.id,
            actualPwd: this.actualPwd,
            newPwd: this.newPwd
          }).then(() => {
            this.message = '';
            this.setSnackBar({'type': 'success', 'text': 'Mot de passe modifié avec succès !'});
            this.changePwd = false;
            this.actualPwd = '';
            this.newPwd = '';
            this.confirmNewPwd = '';
          }).catch(error => {
            this.message = '';
            this.setSnackBar({'type': 'fail', 'text': error.response.data.error});
          });
        } else {
          this.message = "Les nouveaux mots de passe ne correspondent pas !";
        }
      } else {
        this.message = "Tous les champs sont obligatoires !";
      }
    },
    updateLocalStorage() {

    }
  }
};
</script>

<style lang="scss" scoped>
label {
  font-weight: bold;
}

.second-btn {
  margin-left: 10px;
}

.error-input {
  background-color: #ec2828;
}

.valid-input {
  background-color: #4BB543;
}
</style>
