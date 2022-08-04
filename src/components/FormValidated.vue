<template>
  <div class="user-form">
    <form @submit.prevent @submit="">
      <fieldset class="form__fieldset">
        <legend class="form__legend">User Form</legend>
        <div class="form__item">
          <label for="full-name" class="form__label">Full Name</label>
          <input required type="text" @change="validate" class="form__input" name="full-name" id="full-name">
          <div class="text_message">{{ messages[0] }}</div>
        </div>
        <div class="form__item">
          <label for="passport" class="form__label">Passport</label>
          <input required type="text" placeholder="AC1234567" class="form__input" @input="validate" name="passport"
                 id="passport">
          <div class="text_message">{{ messages[1] }}</div>
        </div>
        <div class="form__item">
          <label for="country_code" class="form__label">Phone number</label>
          <div class="phone">
            <input type="text" value="+998" class="phone_code" disabled>
            <input required @input="validate"
                   type="text"
                   class="form__input"
                   name="phone_no"
                   id="phone_no">
          </div>
          <div class="text_message">{{ messages[2] }}</div>
        </div>
        <div class="form__item">
          <label for="pinfl" class="form__label">PINFL</label>
          <input required type="text" class="form__input" @input="validate" name="pinfl" id="pinfl">
          <div class="text_message">{{ messages[3] }}</div>
        </div>
        <div class="form__item">
          <label for="full-name" class="form__label">Birthday</label>
          <input required type="date" class="form__input" name="birthday" @change="validate" id="birthday">
          <div class="text_message">{{ messages[4] }}</div>
        </div>
        <div class="form__item text-end">
          <button class="btn btn-success" type="submit" :disabled="submission">Submit</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import {alphabet} from "@/constants";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      name: "FormValidated",
      options: [],
      messages: [''],
      submission: true
    }
  },
  methods: {
    validate(e) {
      let name = e.target.attributes.name;
      let val = e.target.value;
      let input = document.getElementById(e.target.attributes.id.value)
      switch (name.value) {
        case "full-name":
          if (val.length <= 2) {
            this.messages[0] = "Must be at least 2 characters"
          } else this.messages[0] = ""
          break;
        case "phone_no":
          if (val.length > 9) {
            input.value = val.slice(0, val.length - 1)
          }
          if (isNaN(val)) {
            this.messages[2] = "Must be number"
            input.value = val.slice(0, val.length - 1)
          } else this.messages[2] = ""
          break;
        case "passport":
          let letters = val.length > 1 ? val.toString().slice(0, 3).split('') : "";
          let numbers = val.length > 2 ? val.slice(2, val.length) : 0;
          input.value = val.toUpperCase();
          if (val.length > 9) {
            this.messages[1] = "Maximal 9 characters"
            input.value = val.slice(0, val.length - 1)
            setTimeout(() => {
              this.messages[1] = ""
            }, 3000)
          } else if (letters.length !== 0 && !alphabet.includes(letters[0]) && !alphabet.includes(letters[1])) {
            this.messages[1] = "First two must be letter"
          } else if (numbers !== 0 && isNaN(numbers)) {
            this.messages[1] = "Last 7 characters must be number"
            input.value = val.slice(0, val.length - 1)
          } else this.messages[1] = ''
          break;
        case "pinfl":
          if (val.length > 14) {
            this.messages[3] = "Maximal 14 characters"
            input.value = val.slice(0, val.length - 1)
            setTimeout(() => {
              this.messages[3] = ""
            }, 3000)
          } else if (isNaN(val)) {
            this.messages[3] = "Must be number"
            input.value = val.slice(0, val.length - 1)
          } else {
            this.messages[1] = ""
          }
          break;
        case "birthday":
          this.submission = false;
          break;
        default:
          break;
      }
    }
  }
}
</script>
<style>
</style>