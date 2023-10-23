<script>
import InputFieldComponent from "../components/forms/InputFieldComponent.vue";
import {checkFormField, clearFormError, initFormField, setFormError} from "../modules/forms.js";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useUserStore} from "../stores/userStore.js";
import {firebaseApp} from "../firebaseSetup/firebaseConfig.js";
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore }
  },
  methods: {
    clearFormError,
    logIn() {
      // Get every field
      const email = this.email.value;
      const password = this.password.value;
      // Check every field
      const validEmail = checkFormField(this.email, [{
        condition: (value) => value.trim().length >= 1,
        message: "Ce champs est requis."
      }])

      const validPassword = checkFormField(this.password, [{
        condition: (value) => value.length >= 1,
        message: "Ce champs est requis."
      }])

      if (validEmail && validPassword) {
        // Login user
        signInWithEmailAndPassword(firebaseApp.auth, email, password)
            .then((response) => {
              this.userStore.user = response.user
            })
            .then(() => {
              this.$router.push("/conversations")
            })
            .catch((e) => {
              switch (e.code) {
                case "auth/invalid-login-credentials":
                  setFormError(this.globalMessage, "Courriel ou mot de passe invalide.")
                    setFormError(this.email, "")
                    setFormError(this.password, "")
                  break;
              }
            })
        // *** Throw errors ***
      }
    }
  },
  components: {InputFieldComponent},
  data() {
    return {
      email: initFormField(),
      password: initFormField(),
      globalMessage: initFormField()
    }
  }

}
</script>

<template>
<div id="bgImg">
  <section class="section">
    <div class="container is-max-widescreen">
      <div class="columns is-centered">
        <div class="column is-half">
          <div id="signUpForm" class="box">
            <div class="container m-2">
              <h1 class="title is-2 has-text-weight-bold">Se connecter</h1>
              <div v-if="globalMessage.message" class="notification is-danger">
                <button class="delete" @click="clearFormError(globalMessage)"></button>
                {{ globalMessage.message }}
              </div>
              <form @submit.prevent="logIn">
                <!--EMAIL-->
                <input-field-component
                    label="Courriel"
                    type="email"
                    :value="email.value"
                    @update="(event) => {
                  email.value = event
                }"
                    placeholder="sasuke.ninja@email.com"
                    iconType="fa-solid"
                    icon="fa-envelope"
                    :success="email.success"
                    :error="email.error"
                    :message="email.message"
                />

                <!--PASSWORD-->
                <input-field-component
                    label="Mot de passe"
                    type="password"
                    :value="password.value"
                    @update="(event) => {
                  password.value = event
                }"
                    placeholder="********"
                    iconType="fa-solid"
                    icon="fa-lock"
                    :success="password.success"
                    :error="password.error"
                    :message="password.message"
                />

                <div class="field">
                  <div class="control has-text-centered">
                    <button class="button is-link"
                            @click="logIn"
                            :disabled="!(email.value && password.value)"
                    >Se connecter</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<style scoped>
#bgImg {
  margin-top: -65px;
  padding-top: 65px;
  background: url("/backgrounds/login_bg.png") no-repeat top;
  background-size: cover;
  height: 100vh
}
</style>
