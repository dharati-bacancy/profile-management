// Utilities
import { defineStore } from 'pinia'
import { useRouter } from "vue-router";

export const useProfileStore = defineStore('app', {
  state: () => ({
    isLoggedin: false,
    drawer: true,
    route: useRouter(),
    user: {
      firstName: 'Jane',
      lastName: 'Smith',
      address: 'New York, NY, USA',
      dob: new Date().toLocaleDateString(),
      phoneNumber: '9977888856',
      email: 'jane.smith@gmail.com',
      educationField: 'B.E. Computer Science',
      profileImage: '',
    },
  }),
  actions: {
    login() {
      this.isLoggedin = true;
      this.route.push('/profile');
    },
    logout() {
      this.isLoggedin = false;
      this.route.push('/');
    },
    toggleDrawer(){
      this.drawer = !this.drawer;
    }
  },
})
