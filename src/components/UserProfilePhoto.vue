<script setup>
import { onMounted, ref } from "vue";
import { useProfileStore } from "@/store/profile";

const store = useProfileStore();
const emits = defineEmits(["change"]);
const userprofile = ref(null);
const userProfileInput = ref(null);

onMounted(() => {
  if(store.user?.profileImage){
    userprofile.value = store.user.profileImage
  }
})
const uploadPicture = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      emits("change", reader.result);
      userprofile.value = reader.result;
    };

    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <v-col class="d-flex justify-center" style="position: relative" cols="12">
    <v-avatar
      size="130"
      style="border: 1px solid grey"
      @click="$refs.fileInput.click()"
    >
      <img
        :src="
          userprofile
            ? userprofile
            : 'https://cdn.vuetifyjs.com/images/john.jpg'
        "
        style="object-fit: contain; width: inherit; height: inherit"
      />
    </v-avatar>
    <v-btn
      class="ma-2"
      color="primary"
      icon="mdi-pencil"
      size="small"
      style="position: absolute; bottom: 3px; left: 51%"
      @click="$refs.fileInput.click()"
    ></v-btn>
    <v-file-input
      ref="fileInput"
      v-model="userProfileInput"
      accept="image/*"
      label="Upload Picture"
      @change="uploadPicture"
      style="display: none"
    ></v-file-input>
  </v-col>
</template>

<style scoped></style>
