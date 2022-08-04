<template>
  <div class="user-form">
    <form @submit.prevent @submit="addStudent">
      <fieldset class="form__fieldset">
        <legend class="form__legend">{{ isEdit ? `Edit Student` : `Student Form` }}</legend>
        <div class="form__item">
          <label for="full-name" class="form__label">Full Name</label>
          <input required type="text" class="form__input" v-model="full_name" name="full-name" id="full-name">
        </div>
        <div class="form__item">
          <label for="country_code" class="form__label">Phone number</label>
          <div class="phone">
            <input type="text" value="+998" class="phone_code" disabled>
            <input required
                   type="text"
                   class="form__input"
                   name="phone_no"
                   v-model="phone_no"
                   id="phone_no">
          </div>
        </div>
        <div class="form__item">
          <label for="course" class="form__label">Course</label>
          <select class="form__input" v-model="course" required>
            <option selected value="0">Select course</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div class="form__item text-end">
          <button class="btn btn-success" type="submit">Save</button>
        </div>
      </fieldset>
    </form>
  </div>
  <div>
    <div class="flex">
      <input v-model="searchVal" type="search" placeholder="🔎 Search" class="form__input">
      <select @change="setCourse" class="form__input" id="sort">
        <option selected>All</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Course</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="students.length === 0">
        <td colspan="5" class="center-td">No data</td>
      </tr>
      <tr v-for="(st, index) in students.filter(ss => {
        return ((ss.full_name.toLowerCase().includes(searchVal.toLowerCase()) || ss.phone_no.toLowerCase().includes(searchVal.toLowerCase())) && sortCourse===`All`|| ss.course.includes(sortCourse))
      })">
        <td class="text-center">{{ index + 1 }}</td>
        <td>{{ st.full_name }}</td>
        <td>{{ st.phone_no }}</td>
        <td>{{ st.course }}</td>
        <td class="text-center">
          <i @click="editStarts(st)" class="bi bi-pencil"/>
          <i @click="deleteStudent(st.id)" class="bi bi-trash"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {v4} from "uuid";

export default {
  name: 'Students',
  props: {
    msg: String
  },
  data() {
    return {
      name: "FormValidated",
      students: [
        {id: 23487234333, full_name: "Ziyodbek", phone_no: '+998941079990', course: '3'},
        {id: 12312312387, full_name: "Bunyodbek", phone_no: '+998938838030', course: '4'},
      ],
      full_name: '',
      phone_no: '',
      course: '',
      searchVal: '',
      sortCourse: 'All',
      isEdit: false,
      editingSt: {}
    }
  },
  methods: {
    addStudent(e) {
      if (!this.isEdit) {
        this.students.push({
          id: v4(),
          full_name: this.full_name,
          phone_no: `+998${this.phone_no}`,
          course: this.course
        })
      } else {
        this.students = this.students.map(st => {
          if (st.id === this.editingSt.id) {
            st.full_name = this.full_name;
            st.phone_no = this.phone_no;
            st.course = this.course;
            return st;
          }
          return st;
        })
        this.isEdit = false;
      }
      this.full_name = ""
      this.phone_no = ""
      this.course = ""
    },
    deleteStudent(id) {
      let confirmation = window.confirm("Are you sure to delete this object?");
      if (confirmation) {
        this.students = this.students.filter(a => a.id !== id);
      }
    },
    editStarts(obj) {
      this.full_name = obj.full_name;
      this.phone_no = obj.phone_no;
      this.course = obj.course;
      this.isEdit = true;
      this.editingSt = obj;
    },
    setCourse(e) {
      this.sortCourse = e.target.value;
    }
  }
}
</script>

<style scoped>
.table {
  max-width: 1200px;
  min-width: 700px;
  width: 100%;
  margin: 2rem auto;
  border-radius: .3rem;
  background-color: #2c3e50;
  color: white;
  border-collapse: collapse;
}

tr, th, td {
  border: 1px solid rgba(255, 255, 255, 0.42);
}

th, td {
  padding: .5rem;
}

.text-center {
  text-align: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.center-td {
  text-align: center;
  color: rgba(255, 255, 255, 0.45);
}

.flex {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5rem;
}

input[type="search"] {
  color: white;
  background-color: #2c3e50;
}

input[type="search"]::placeholder {
  color: white;
}

select[id="sort"] {
  background-color: #2c3e50;
  color: white;
}

select[id="sort"]:focus {
  background-color: #2c3e50;
  color: white;
}
</style>