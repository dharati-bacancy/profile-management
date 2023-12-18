<script setup>
import Navigation from "@/components/Navigation.vue";
import { reactive, ref, computed } from "vue";

const passwordHidden = ref(true);
const confirmPasswordHidden = ref(true);

const rules = {
  required: (value) => !!value || "Field is required",
  passwordRules: (value) =>
    (value &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        value
      )) ||
    "Minimum 6 characters, One capital latter, Special charater, Number",
};

const field = reactive({
  password: "",
  password_confirmation: "",
});

const resetForm = ref(null);

const data = reactive({
  showAlert: false,
});

const submitForm = async () => {
  const { valid } = await resetForm.value.validate();
  if (valid) {
    data.showAlert = true;
    setTimeout(() => (data.showAlert = false), 5000);
    resetForm.value.reset();
  }
};

const passwordConfirmationRule = computed(
  () => field.password === field.password_confirmation || "Password must match"
);

const showPassword = () => {
  if (passwordHidden.value) passwordHidden.value = false;
  else passwordHidden.value = true;
};

const showConfirmPassword = () => {
  if (confirmPasswordHidden.value) confirmPasswordHidden.value = false;
  else confirmPasswordHidden.value = true;
};
</script>

<template>
  <v-container class="pa-8">
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="1000">
          <v-card-text>
            <v-card-title class="text-center mb-5">Reset Password</v-card-title>
            <v-form ref="resetForm" @submit.prevent="submitForm">
              <v-row class="justify-center">
                <v-col cols="6">
                  <v-text-field
                    v-model="field.password"
                    :type="passwordHidden ? 'password' : 'text'"
                    label="Password"
                    :rules="[rules.required, rules.passwordRules]"
                    :append-inner-icon="
                      passwordHidden ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    @click:append-inner="showPassword"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col cols="6">
                  <v-text-field
                    v-model="field.password_confirmation"
                    :type="confirmPasswordHidden ? 'password' : 'text'"
                    label="Confirm password"
                    :rules="[
                      rules.required,
                      passwordConfirmationRule,
                      rules.passwordRules,
                    ]"
                    :append-inner-icon="
                      confirmPasswordHidden ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    @click:append-inner="showConfirmPassword"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col cols="4">
                  <v-btn
                    type="submit"
                    color="primary"
                    block
                    size="large"
                    variant="elevated"
                    class="justify-center"
                    >Submit</v-btn
                  >
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
      Password Reset Successfully!
    </v-alert>
  </v-container>
  <Navigation />
</template>

<style>
.profile-alert {
  position: absolute;
  top: 9%;
  right: 1%;
}
</style>
