<template>
  <div class="user-form">
    <form @submit.prevent @submit="login">
      <fieldset class="form__fieldset">
        <legend class="form__legend">Login form</legend>
        <div class="form__item">
          <label for="login" class="form__label">Login</label>
          <input required type="text" class="form__input" v-model="loginName" name="login" id="login">
        </div>
        <div class="form__item">
          <label for="password" class="form__label">Password</label>
          <input required type="password" class="form__input" v-model="password" name="password" id="password">
        </div>
        <div class="form__item text-end">
          <button class="btn btn-success" type="submit">Submit</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import {users} from "@/constants";

export default {
  name: "Login",
  data() {
    return {
      loginName: "",
      password: ""
    }
  },
  methods: {
    login() {
      let isDef = false;
      users.map(user => {
        if (user.loginName === this.loginName && user.password === this.password) {
          isDef = true;
        }
      })
      if (isDef) {
        localStorage.setItem('currentUser', JSON.stringify({loginName: this.loginName, password: this.password}))
        window.location.reload();
      } else {
        alert('User not found')
      }
    }
  }
}
</script>

<style scoped>

</style>