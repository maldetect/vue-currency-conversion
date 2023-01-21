<template>
  <v-row class="fill-height">
    <v-col cols="12" md="4" class="teal">
      <v-card-text class="white--text mt-2">
        <h1 class="text-center display-0">Welcome!</h1>
        <h4 class="text-center">Already registered?</h4>
      </v-card-text>
      <div class="text-center">
        <v-btn small rounded outlined dark @click="back">Login</v-btn>
      </div>
    </v-col>

    <v-col cols="12" md="8">
      <v-card-text class="">
        <h1 class="text-center display-1">Currency Conversion</h1>
        <v-form>
          <v-overlay :absolute="absolute" :value="loading">
            <v-progress-circular indeterminate size="44"></v-progress-circular>
          </v-overlay>
          <v-row>
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                v-model="name"
                label="Name"
                name="name"
                type="text"
                color="teal accent-3"
                :error-messages="nameErrors"
                :counter="60"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              />
            </v-col>
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                v-model="email"
                label="Email"
                name="Email"
                type="text"
                color="teal accent-3"
                :counter="60"
                :error-messages="emailErrors"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                id="password"
                v-model="password"
                label="Password"
                name="password"
                type="password"
                color="teal accent-3"
                :error-messages="passwordErrors"
                :counter="20"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              />
            </v-col>
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                id="password_confirmation"
                v-model="password_confirmation"
                label="Password Confirmation"
                name="password_confirmation"
                type="password"
                color="teal accent-3"
                :error-messages="password_confirmationErrors"
                :counter="20"
                required
                @input="$v.password_confirmation.$touch()"
                @blur="$v.password_confirmation.$touch()"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <div class="text-center mb-4">
        <v-btn rounded color="teal" black dark @click.stop="submit">Register</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  mixins: [validationMixin],
  data(){
    return {
        absolute: true,
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        loading: false,
        errorMessage:{}
    }
  },
  validations: {
    name: {
      required,
      maxLength: maxLength(60),
      minLength: minLength(3),
      serverFailed() {
        // console.log('oi')
        return !this.hasServerError("name");
      },
    },
    email: {
      required,
      email,
      maxLength: maxLength(60),
      minLength: minLength(3),
      serverFailed() {
        return !this.hasServerError("email");
      },
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(20),
      serverFailed() {
        return !this.hasServerError("password");
      },
    },
    password_confirmation: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(20),
      sameAs: sameAs("password"),
      serverFailed() {
        return !this.hasServerError("password_confirmation");
      },
    },
  },
  computed: {
    nameErrors: {
      get() {
        const errors = [];
        if (!this.$v.name.$dirty) return errors;
        !this.$v.name.maxLength &&
          errors.push("Name must not have more than 60 characters.");
        !this.$v.name.required && errors.push("Name is required.");
        !this.$v.name.minLength &&
          errors.push("Name must have at least 3 characters.");
        !this.$v.name.serverFailed &&
          errors.push(this.errorMessage.name.join(" "));
        delete this.errorMessage?.name;
        return errors;
      },
    },
    emailErrors: {
      get() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.maxLength &&
          errors.push("Email must not have more than 60 characters.");
        !this.$v.email.required && errors.push("Email is required.");
        !this.$v.email.email && errors.push("Invalid email.");
        !this.$v.email.minLength &&
          errors.push("Email must have at least 3 characters.");
        !this.$v.email.serverFailed &&
          errors.push(this.errorMessage.email.join(" "));
        delete this.errorMessage?.email;
        return errors;
      },
    },
    passwordErrors: {
      get() {
        const errors = [];
        // console.log('oi')
        if (!this.$v.password.$dirty) return errors;
        !this.$v.password.minLength &&
          errors.push("Password must have at least 8 characters.");
        !this.$v.password.maxLength &&
          errors.push("Password must not have more than 20 characters.");
        !this.$v.password.required && errors.push("Password is required.");
        !this.$v.password.serverFailed &&
          errors.push(this.errorMessage.password.join(" "));
        delete this.errorMessage?.password;
        return errors;
      },
    },
    password_confirmationErrors: {
      get() {
        const errors = [];
        // console.log('oi')
        if (!this.$v.password_confirmation.$dirty) return errors;
        !this.$v.password_confirmation.minLength &&
          errors.push("Confirmation must have at least 8 characters.");
        !this.$v.password_confirmation.maxLength &&
          errors.push("Confirmation must not have more than 20 characters.");
        !this.$v.password_confirmation.required &&
          errors.push("Confirmation is required.");
        !this.$v.password_confirmation.sameAs &&
          errors.push("Confirmation does not match with password");
        !this.$v.password_confirmation.serverFailed &&
          errors.push(this.errorMessage.password_confirmation.join(" "));
        delete this.errorMessage?.password_confirmation;
        return errors;
      },
    },
  },
  methods: {
    hasServerError(field) {
      if (Object.prototype.hasOwnProperty.call(this.errorMessage, field))
        return true;
      else {
        return false;
      }
    },
    clear(){
        this.name=''
        this.email=''
        this.password=''
        this.password_confirmation=''
        this.$nextTick(() => { this.$v.$reset() })
    },
    back() {
      this.$emit("back");
    },
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.error('Check Errors!')
        return
      }
      if (this.password.length > 0) {
        this.loading=true
        this.$store
          .dispatch('submit',{
            
            email: this.email,
            password: this.password,
            name : this.name,
            password_confirmation : this.password_confirmation
        
          })
          .then(() => {
            this.loading=false
            this.clear();
            this.back()
            this.$toast.success(
              'Account has been created!'
            )
          })
          .catch((err) => {
            this.loading = false
            if (err.response.status === 422) {
              this.errorMessage = err.response.data.errors
              this.$toast.error('Check error!')
              return
            }

            this.$toast.error('Something went wrong!')
          })
      } else {
        this.$toast.error('Password is required!')
      }
    },

  },
};
</script>
