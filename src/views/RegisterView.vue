<template>
  <div id="bgImg">
    <div id="bgCharacters" class="hero is-fullheight">
      <section class="section">
        <div class="container is-max-widescreen">
          <div class="columns is-centered">
            <div class="column is-half">
              <div id="signUpForm" class="box">
                <div class="container m-2">
                  <h1 class="title is-2 has-text-weight-bold">S'inscrire</h1>
                  <div v-if="globalMessage.message" class="notification is-danger">
                    <button class="delete" @click="clearFormError(globalMessage)"></button>
                    {{ globalMessage.message }}
                  </div>
                  <form @submit.prevent="register">
                    <!--USERNAME-->
                    <input-field-component
                        label="Nom d'utilisateur"
                        type="username"
                        :value="username.value"
                        @update="(event) => {
                  username.value = event
                }"
                        placeholder="DarkSasuke999"
                        iconType="fa-solid"
                        icon="fa-user"
                        :success="username.success"
                        :error="username.error"
                        :message="username.message"
                    />

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

                    <!--CONFIRM PASSWORD-->
                    <input-field-component
                        label="Confirmer le mot de passe"
                        type="password"
                        :value="passwordConfirmation.value"
                        @update="(event) => {
                  passwordConfirmation.value = event
                }"
                        placeholder="********"
                        iconType="fa-solid"
                        icon="fa-lock"
                        :success="passwordConfirmation.success"
                        :error="passwordConfirmation.error"
                        :message="passwordConfirmation.message"
                    />

                    <br>
                    <div class="field">
                      <div class="control">
                        <label class="checkbox">
                          <input type="checkbox" v-model="terms.value">
                          J'accepte les <a href="#">termes et conditions</a>.
                        </label>
                        <p v-if="terms.success" class="help is-success">{{ terms.message }}</p>
                        <p v-if="terms.error" class="help is-danger">{{ terms.message }}</p>
                      </div>
                    </div>
                    <br>
                    <div class="field">
                      <div class="control has-text-centered">
                        <button class="button is-link"
                                type="submit"
                                :disabled="!(username.value
                                            && email.value
                                            && password.value
                                            && passwordConfirmation.value
                                            && (terms.value === true|| false))"
                        >S'inscrire</button>
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
  </div>
</template>

<script>
import InputFieldComponent from "../components/forms/InputFieldComponent.vue";
import {useUserStore} from "../stores/userStore.js";
import {checkFormField, clearFormError, initFormField, setFormError} from "../modules/forms.js";
import {firebaseApp} from "../firebaseSetup/firebaseConfig.js";
import {createUserWithEmailAndPassword, fetchSignInMethodsForEmail, updateProfile} from "firebase/auth"

export default {
    components: {
      InputFieldComponent,
    },
    setup() {
      const userStore = useUserStore();
      return { userStore }
    },
    data() {
      return {
        username: initFormField(),
        email: initFormField(),
        password: initFormField(),
        passwordConfirmation: initFormField(),
        terms: initFormField(),
        globalMessage: initFormField()
      }
    },
    methods: {
      clearFormError,
      register() {
        // Check every field
        const usernameValid = checkFormField(this.username, [{
          condition: (value) => value.trim().length >= 1,
          message: "Nom d'utilisateur est requis"
        }])

        const emailValid = checkFormField(this.email, [{
          condition: (value) => /^\S+@\S+/.test(value),
          message: "Ce courriel est invalide"
        }])

        const passwordValid = checkFormField(this.password,
        [{
          condition: (value) => value.length >= 6,
          message: "Le mot de passe doit avoir au moins 6 caractères"
        }])

        const passwordConfirmationValid = checkFormField(this.passwordConfirmation, [{
          condition: (value) => value === this.password.value,
          message: "Les mots de passe ne correspondent pas"
        }])

        const termsAccepted = checkFormField(this.terms, [{
          condition: (value) => value === true,
          message: "L'usage de cet application requiert d'accepter les termes et conditions."
        }])

        if (!(usernameValid && emailValid && passwordValid && passwordConfirmationValid && termsAccepted)) {
          setFormError(this.globalMessage, "Certaines informations sont invalides.")
          return false;
        }

        // Add user to database
        createUserWithEmailAndPassword(firebaseApp.auth, this.email.value, this.password.value)
          .then((userCredential) => {
            // this.userStore.user =
            return userCredential.user;
          })
          .then(async (newUser) => {
            // Set user's display name
            await updateProfile(newUser, {
              displayName: this.username.value
            })
          })
          .then(() => {
            if (this.userStore.user) {
              // Redirect to login page
              console.log("Sign-in successful")
              this.$router.push("/login")
              return true;
            } else {
              throw Error("User creation failed unexpectedly.")
            }
          })
          .catch((e) => {
            switch (e.code) {
              case "auth/email-already-in-use":
                setFormError(this.email, "Ce courriel est déjà utilisé.")
                    break;
              default:
                setFormError(this.globalMessage,
                    "Un problème est survenu lors de la création de l'utilisateur. Réessayez plus tard.");
                console.log(e);
            }
          })
      }
    },
  }
  /*TODO: FIX FALSE POSITIVE ERROR / DUPLICATE USER CREATION */

</script>

<style scoped>
#bgImg {
  background: url("/backgrounds/signup_bg_backdrop.png") no-repeat top;
  background-size: cover;
}
/* TODO: Fix the background on mobile */
#signUpForm::before {
  content:'';
  position: absolute;
  width: 150%;
  height: 150%;
  margin-left: -52%;
  margin-top: -20%;
  border-radius: 500px;
  z-index: -1;
}

#bgCharacters {
  background: url("/backgrounds/signup_bg.png") no-repeat bottom;
  background-size: 400px;
}

</style>
