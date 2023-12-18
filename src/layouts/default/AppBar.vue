<script setup>
import { useProfileStore } from "@/store/profile";
import { computed } from "vue";

const store = useProfileStore();
const isLoggedin = computed(() => store.isLoggedin);

const username = computed(
  () => store.user?.firstName + " " + store.user?.lastName
);
</script>

<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon
      color="white"
      @click.stop="store.toggleDrawer()"
    ></v-app-bar-nav-icon>
    <v-app-bar-title>Welcome to Profile</v-app-bar-title>
    <template v-slot:append v-if="isLoggedin">
      <v-list-item
        lines="two"
        :prepend-avatar="
          store.user?.profileImage
            ? store.user.profileImage
            : 'https://cdn.vuetifyjs.com/images/john.jpg'
        "
        :title="username"
        :subtitle="isLoggedin ? 'Logged in' : 'Login'"
      ></v-list-item>
    </template>
  </v-app-bar>
</template>
