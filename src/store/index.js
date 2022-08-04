import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        countries: []
    }, getters: {}, mutations: {
        getAuth() {
            return !!localStorage.getItem('currentUser');
        }
    }, actions: {}, modules: {}
})