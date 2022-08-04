import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import StudentsView from "@/views/StudentsView";
import QuizView from "@/views/QuizView";

const routes = [ {
    path: '/', name: 'home', component: localStorage.getItem('currentUser') ? HomeView : LoginView
}, {
    path: '/students', name: 'students', component: localStorage.getItem('currentUser') ? StudentsView : LoginView
}, {
    path: '/quiz', name: 'quiz', component: localStorage.getItem('currentUser') ? QuizView : LoginView
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})

export default router
