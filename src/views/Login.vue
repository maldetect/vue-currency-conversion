<template>
<v-container class="fill-height" fluid>
    
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="6" align="center" justify="center">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col>
                  <v-card-text class="mt-2 pb-10">
                    
                    <h1 class="text-center display-1">Currency Conversion</h1>
                    <v-form>
                      <v-text-field
                        label="Email"
                        v-model="email"
                        prepend-icon="fas fa-user"
                        type="text"
                        color="teal accent-3"
                        data-testid="email"
                        :error-messages="emailErrors"
                        required
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"

                      />

                      <v-text-field
                        id="password"
                        data-testid="password"
                        label="Password"
                        v-model="password"
                        name="password"
                        prepend-icon="fas fa-lock"
                        type="password"
                        color="teal accent-3"
                        :error-messages="passwordErrors"
                        required
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                      />
                    </v-form>
                    <div class="text-center mt-3 mb-5">
                      <v-btn
                        rounded
                        color="teal "
                        data-testid="login"
                        block
                        dark
                        @click="login"
                        >Entrar</v-btn
                      >
                    </div>
                    

                    <v-row class="mt-3">
                      <v-col cols="12" class="text-center pa-1">
                        <v-btn rounded text @click="step++"
                          >Register</v-btn
                        >
                      </v-col>
                      
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <register @back="step--"></register>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>

import { validationMixin } from 'vuelidate'
import Vue from 'vue';

import {
  required,
  maxLength,
  minLength,
  email,
} from 'vuelidate/lib/validators'
import Register from '../components/Auth/Register.vue';

export default {
  components: { Register },
  mixins: [validationMixin],
  data () {
    return {
      email: 'leandro@currencyconvertion.com',
      password: 'password',
      step:1,
      errorMessages:{}
    }
  },
  validations: {
    email: {
      required,
      email,
      maxLength: maxLength(60),
      minLength: minLength(3),
      serverFailed() {
        return !this.hasServerError('email')
      },
    },
    password: {
      required,
      
    },
  },
  computed: {
    emailErrors: {
      get() {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.maxLength && errors.push('Email must not have more than 60 characters.')
        !this.$v.email.required && errors.push('Email is required.')
        !this.$v.email.email && errors.push('Invalid email.')
        !this.$v.email.minLength &&errors.push('Email must have at least 3 characters.')
        !this.$v.email.serverFailed && errors.push(this.errorMessage.email.join(' '))
        if (!this.$v.email.serverFailed) delete this.errorMessage.email
        return errors
      },
    },
    passwordErrors: {
      get() {
        const errors = []
        
        if (!this.$v.password.$dirty) return errors
      
        !this.$v.password.required && errors.push('Pasword is required.')

        return errors
      },
    },

  },
  methods: {
    hasServerError(field) {
      if (Object.prototype.hasOwnProperty.call(this.errorMessages, field))
        return true
      else {
        return false
      }
    },

    login () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        Vue.$toast.error('Check errors!')
        return
      }

      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          Vue.$toast.error(err.response.data.message)
        })
    }
  }
}
</script>