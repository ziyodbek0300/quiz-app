<template>
  <div class="container">
    <h1>Quiz App</h1>
    <div class="user-form">
      <form @submit.prevent @submit="addQuiz">
        <fieldset class="form__fieldset">
          <legend class="form__legend">Quiz creator</legend>
          <div class="form__item">
            <label for="question" class="form__label">Question</label>
            <input required type="text" class="form__input" v-model="question" name="question" id="question">
          </div>
          <div class="form__item">
            <label for="answer_type" class="form__label">Answer type</label>
            <select class="form__input" @change="selectType" id="answer_type" v-model="answer_type" required>
              <option selected value="single">Single</option>
              <option value="multi">Multiple</option>
              <option value="text">Text</option>
            </select>
          </div>
          <div v-for="(variant, index) in variants" class="flex">
            <input @change="changeIn($event, index)" :type="variant" v-model="answer[index]" name="quiz" class="asd">
            <input type="text" class="form__input" v-model="answers[index]" :placeholder="index + 1" required>
          </div>
          <div class="form__item text-end">
            <button class="btn btn-success" type="submit">Save</button>
          </div>
        </fieldset>
      </form>
    </div>
    <div>
      <div class="quiz" v-for="(q, index) in quizzes">
        <h4>{{ (index + 1) + ". " + q.question }}</h4>
        <ul v-for="(ans, index) in q.answers">
          <li>
            <input :id="ans + q.id"
                   :name="q.id"
                   :type="q.answer_type === 'single' ? `radio` : q.answer_type === 'multi' ? `checkbox` : `text` ">
            <label :for="ans + q.id" v-if="q.answer_type !== 'text'">{{ ans }}</label></li>
        </ul>
        <button class="btn btn-success">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import {v4} from "uuid";

export default {
  name: "Quiz",
  data() {
    return {
      question: '',
      answer: [false, true, false, false],
      answers: ['', '', '', ''],
      answer_type: '',
      variants: ['radio', 'radio', 'radio', 'radio'],
      quizzes: [
        {
          id: 1,
          question: "What is ReactJs?",
          answer: ["JavaScript library"],
          answers: [
            'Backend tool', 'JavaScript library', 'Type of juice'
          ],
          answer_type: 'single',
          author: ''
        },
        {
          id: 2,
          question: "What is Java?",
          answer: ["Backend tool", "Programming language"],
          answers: [
            'Backend tool', 'Programming language', 'Type of juice'
          ],
          answer_type: 'multi',
          author: ''
        },
        {
          id: 3,
          question: "What is Earth?",
          answer: ["Planet"],
          answers: [
            'Planet', 'JavaScript library', 'Type of juice'
          ],
          answer_type: 'single',
          author: ''
        }
      ]
    }
  },
  mounted() {
    localStorage.getItem('quizzes') ? this.quizzes = JSON.parse(localStorage.getItem('quizzes')) : localStorage.setItem('quizzes', JSON.stringify(this.quizzes));
  },
  methods: {
    selectType(e) {
      this.answer = ['', '', '', ''];
      if (e.target.value === 'multi') {
        this.variants = ['checkbox', 'checkbox', 'checkbox', 'checkbox']
      } else if (e.target.value === 'single') {
        this.variants = ['radio', 'radio', 'radio', 'radio']
      } else {
        this.variants = ['checkbox']
      }
    },
    addQuiz() {
      let answer_a = [];
      let answer_b = [];
      Array(4).fill(null).map((a, i) => {
        answer_a.push(this.answer[i]);
        answer_b.push(this.answers[i]);
      })
      this.answer = answer_a;
      this.answers = answer_b;
      let asds = [];
      if (this.answer_type === 'multi') {
        const inputs = document.querySelectorAll('.asd');
        for (let i = 0; i < 4; i++) {
          asds.push(inputs[i].checked ? 'on' : '');
        }
        let res = [];
        asds.map((a, i) => a === 'on' ? res.push(answer_b[i]) : console.log())
        if (this.quizzes.length >= 10) {
          alert("Maximum 10 quizzes. You can delete one!");
        } else {
          this.quizzes.push({
            id: v4(),
            author: '',
            question: this.question,
            answer: res,
            answers: answer_b,
            answer_type: this.answer_type,
          })
        }
      } else if (this.answer_type === 'single') {
        let res = [];
        answer_a.map((a, i) => a === 'on' ? res.push(answer_b[i]) : console.log())
        if (this.quizzes.length >= 10) {
          alert("Maximum 10 quizzes. You can delete one!");
        } else {
          this.quizzes.push({
            id: v4(),
            author: '',
            question: this.question,
            answer: res,
            answers: answer_b,
            answer_type: this.answer_type,
          })
        }
      } else if (this.answer_type === "text") {
        let res = [];
        answer_b.map((a) => a !== "" ? res.push(a) : console.log());
        if (this.quizzes.length >= 10) {
          alert("Maximum 10 quizzes. You can delete one!");
        } else {
          this.quizzes.push({
            id: v4(),
            author: '',
            question: this.question,
            answer: res,
            answers: res,
            answer_type: this.answer_type,
          })
        }
      }
      if (this.quizzes.length >= 10) {
        alert("Maximum 10 quizzes. You can delete one!");
      } else {
        localStorage.setItem("quizzes", JSON.stringify(this.quizzes))
      }
      this.question = '';
      this.answer = [false, true, false, false];
      this.answers = ['', '', '', ''];
      this.answer_type = '';
      this.variants = ['radio', 'radio', 'radio', 'radio'];
    },
    changeIn(e, index) {
      if (this.answer_type === 'single') {
        this.answer = ['', '', '', ''];
        this.answer[index] = e.target.value;
      }
    }
  }
}
</script>

<style scoped>
.quiz {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  margin: .5rem 0;
  border-radius: .5rem;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
}

.flex {
  display: flex;
  margin-bottom: .3rem;
}

ul {
  list-style: none;
}
</style>