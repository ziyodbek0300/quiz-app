<template>
  <nav class="center">
    <router-link class="router-link" v-if="!auth" to="/login">Login</router-link>
    <router-link class="router-link" v-if="auth" to="/">Form</router-link>
    <router-link class="router-link" v-if="auth" to="/students">Students</router-link>
    <router-link class="router-link" v-if="auth" to="/quiz">Quiz</router-link>
    <i v-if="auth" class="bi bi-arrow-right-circle-fill" @click="logout"></i>
  </nav>
  <router-view/>
</template>
<script>
export default {
  name: "Hello",
  data() {
    return {
      auth: localStorage.getItem('currentUser')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('currentUser');
      window.location.reload();
    }
  }
}
</script>
<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #2c3e50;
  border-radius: .5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.router-link {
  color: #fff;
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
  color: #41b883;
}

.user-form {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  margin: 1rem auto;
  border-radius: .5rem;
  background-color: #2c3e50;
  color: white;
}

.form__label {
  font-size: .8rem;
}

.form__fieldset {
  padding: 1rem;
  border: 1px solid #41b883;
  border-radius: .3rem;
}

.form__item {
  margin-bottom: 1rem;
}

input.form__input, input.phone_code, select.form__input {
  display: block;
  width: 100%;
  padding: .5rem;
  border-radius: .3rem;
  border: 1px solid #2c3e50;
  background-color: rgba(255, 255, 255, 0.17);
  outline-color: #41b883;
  color: white;
}

select.form__input:focus {
  background-color: #2c3e50;
}

input:focus {
  outline-style: solid;
}

input {
  -moz-appearance: textfield !important;
}

.phone {
  display: flex;
  align-items: center;
}

input.phone_code {
  width: 20%;
}

.phone input {
  margin: 0;
}

.text_message {
  font-size: .5rem;
  margin-top: 0;
}

.btn {
  padding: .5rem;
  border: 1px solid transparent;
  border-radius: .3rem;
}

.btn:hover {
  opacity: .9;
}

.btn:active {
  opacity: .8;
}

.btn-success {
  background-color: #41b883;
  color: white;
  letter-spacing: 1px;
  font-weight: bold;
}

.text-end {
  text-align: right;
  margin-bottom: 0;
}

::placeholder {
  color: rgba(255, 255, 255, 0.76);
}

::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

i {
  color: white;
}
</style>
