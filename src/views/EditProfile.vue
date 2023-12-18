<script setup>
import Navigation from "@/components/Navigation.vue";
import UserProfilePhoto from "@/components/UserProfilePhoto.vue";
import { onBeforeMount, ref, reactive, watch } from "vue";
import { useProfileStore } from "@/store/profile";

const store = useProfileStore();

const user = ref({
  firstName: "",
  lastName: "",
  address: "",
  dob: "",
  phoneNumber: "",
  email: "",
  educationField: "",
  profileImage: null,
});

const rules = {
  required: (value) => !!value || "This field is required",
  email: (value) =>
  !!value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || "Invalid email address",
  max_length: length => {
    return function (value) {
      if (value && value.length > length) {
        return `Value should not be greater than ${length} characters`;
      }
      return true;
    };
  },
  phone: value => {
    const pattern = /^\d+$/;
    if(!pattern.test (value)){
      return 'It must be numeric';
    } 

    if(value.length < 10 || value.length > 10){
      return 'Phone number must be 10 digits'
    }
    return true
  },
};
const menu = ref(false);
const date = ref(null);
const pickerRef = ref(null);
const form = ref(null);

const data = reactive({
  showAlert: false,
});

const submitForm = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    store.user = { ...user.value };
    data.showAlert = true;
    setTimeout(() => (data.showAlert = false), 5000);
  }
};

const getBase64Image = (e) => {
  user.value.profileImage = e;
};

watch(
  () => date.value,
  (value) => {
    console.log(value);
    user.value.dob = new Date(value).toLocaleDateString();
    menu.value = false;
  }
);

onBeforeMount(() => {
  user.value = { ...store.user };
});
</script>

<template>
  <v-container class="pa-8">
    <v-row>
      <v-col>
        <v-card class="elevation-6">
          <v-card-text>
            <v-card-title>Edit Profile</v-card-title>
            <v-form ref="form" @submit.prevent="submitForm">
              <v-row>
                <user-profile-photo :user="user" @change="getBase64Image" />
                <v-col cols="6">
                  <v-text-field
                    v-model="user.firstName"
                    :rules="[rules.required,rules.max_length(10)]"
                    counter="10"
                    label="First Name"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.lastName"
                    :rules="[rules.required,rules.max_length(10)]"
                    counter="10"
                    label="Last Name"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.email"
                    :rules="[rules.required, rules.email]"
                    type="email"
                    label="Email"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.phoneNumber"
                    :rules="[rules.required,rules.phone]"
                    counter="10"
                    label="Phone Number"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.address"
                    :rules="[rules.required,rules.max_length(50)]"
                    counter="50"
                    label="Address"
                  />
                </v-col>
                <v-col cols="6">
                  <!-- <v-text-field
                    v-model="user.dob"
                    :rules="[rules.required]"
                    label="Date of Birth"
                  /> -->
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ props }">
                      <v-text-field
                        v-model="user.dob"
                        label="Birthday date"
                        :rules="[rules.required]"
                        readonly
                        v-bind="props"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="pickerRef"
                      v-model="date"
                      color="primary"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.educationField"
                    :rules="[rules.required,rules.max_length(30)]"
                    counter="30"
                    label="Education Field"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn type="submit" class="mr-2" color="primary"
                    >Submit</v-btn
                  >
                  <v-btn type="reset" color="error">Reset</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-alert
      v-if="data.showAlert"
      value="true"
      type="success"
      transition="fade-transition"
      closable
      @input="showAlert = false"
      position="absolute"
      class="profile-alert"
    >
      Profile Updated Successfully!.
    </v-alert>
  </v-container>
  <Navigation />
</template>

<style>
.profile-alert {
  position: absolute;
  top: 13%;
  right: 5%;
}
</style>
