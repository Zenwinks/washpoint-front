<template>
  <user-layout>
    <div class="wrapper">
      <header class="jumbotron">
        <h3>Nouvelle fiche</h3>
      </header>
      <div class="content">
        <form class="form">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Email address</label>
              <input id="exampleInputEmail1" aria-describedby="emailHelp" class="form-control" type="email">
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputPassword1">Password</label>
              <input id="exampleInputPassword1" class="form-control" type="password">
            </div>
          </div>
          <div class="form-group form-check">
            <input id="exampleCheck1" class="form-check-input" type="checkbox">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </user-layout>
</template>

<script>
import UserLayout from "../../layouts/UserLayout";

export default {
  name: "New",
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
