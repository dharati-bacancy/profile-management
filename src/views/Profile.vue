<script setup>
import Navigation from "@/components/Navigation.vue";
import { useProfileStore } from "@/store/profile";

const store = useProfileStore();
</script>

<template>
  <Navigation />
  <v-card class="mx-auto mt-5" width="400">
    <v-container fluid class="text-md-center">
      <v-img
        :src="
          store.user.profileImage
            ? store.user.profileImage
            : 'https://cdn.vuetifyjs.com/images/john.jpg'
        "
        alt="John"
        width="100%"
      ></v-img>
      <h1>{{ store.user.firstName }} {{ store.user.lastName }}</h1>
      <p><v-icon size="x-small"> mdi-email </v-icon> {{ store.user.email }}</p>
      <p>
        <v-icon size="x-small" color="green">mdi-phone</v-icon>
        {{ store.user.phoneNumber }}
      </p>
      <p>
        <v-icon size="x-small">mdi-map-marker-outline</v-icon>
        {{ store.user.address }}
      </p>
      <p><v-icon size="x-small"> mdi-cake </v-icon> {{ store.user.dob }}</p>
      <p>
        <v-icon size="x-small"> mdi-school </v-icon>
        {{ store.user.educationField }}
      </p>
    </v-container>
  </v-card>
</template>

<style scoped></style>
