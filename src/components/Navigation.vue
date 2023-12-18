<script setup>
import { useProfileStore } from "@/store/profile";
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();

const path = computed(() => router.currentRoute.value.path);

const store = useProfileStore();

const routePage = (page) => {
  switch (page) {
    case "profile":
      router.push("/profile");
      break;
    case "edit":
      router.push("/edit-profile");
      break;
    case "reset":
      router.push("/reset-password");
      break;
  }
};

const { logout } = store;
</script>
<template>
  <v-navigation-drawer v-model="store.drawer" permanent disable-resize-watcher>
    <!-- <template v-slot:prepend>
      <v-list-item
        lines="two"
        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
        title="Jane Smith"
        subtitle="Logged in"
      ></v-list-item>
    </template>

    <v-divider></v-divider> -->

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-account"
        title="Profile"
        value="profile"
        :active="path === '/profile'"
        @click="routePage('profile')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-edit"
        title="Edit Profile"
        value="edit"
        :active="path === '/edit-profile'"
        @click="routePage('edit')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-lock-reset"
        title="Reset Password"
        value="reset"
        :active="path === '/reset-password'"
        @click="routePage('reset')"
      ></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logout" color="primary"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
