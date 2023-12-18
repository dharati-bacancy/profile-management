<script setup>
import { useProfileStore } from "@/store/profile";
import { computed } from "vue";

const store = useProfileStore();

const isLoggedin = computed(() => store.isLoggedin);

const { login, logout } = store;
</script>

<template>
  <div class="text-center mt-5">
    <v-btn
      append-icon="mdi-account-circle"
      v-if="!isLoggedin"
      @click="login"
      color="indigo-darken-3"
    >
      Login
      <template v-slot:append>
        <v-icon color="warning"></v-icon>
      </template>
    </v-btn>
    <v-btn append-icon="mdi-account-circle" @click="logout" v-else>
      Logout
      <template v-slot:append>
        <v-icon color="danger"></v-icon>
      </template>
    </v-btn>
  </div>
</template>
