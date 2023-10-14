<template>

  <section class="section">
    <div class="container">
      <div id="signUpForm" class="box">
        <div class="container m-2">
          <h1 class="title is-2 has-text-weight-bold">S'inscrire</h1>
          <div v-if="globalMessage.visible" class="notification is-danger">
            <button class="delete" @click="globalMessage=false"></button>
            {{ globalMessage.message }}
          </div>
          <form @submit.prevent="signUp">
            <!--USERNAME-->
            <input-field-component
              label="Nom d'utilisateur"
              type="username"
              :value="username.value"
              @update="(event) => {
                  username.value = event
                  checkUsername()
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
                  checkEmail()
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
                  checkPassword()
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
                  checkPassword()
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
                  <input type="checkbox">
                  J'accepte les <a href="#">termes et conditions</a>
                </label>
              </div>
            </div>
            <br>
            <div class="field">
              <div class="control has-text-centered">
                <button class="button is-link"
                        @click="signUp"
                >S'inscrire</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import NavbarComponent from "../components/NavbarComponent.vue";
  import InputFieldComponent from "../components/forms/InputFieldComponent.vue";
  import {auth, mySignUpWithEmailAndPassword} from "../firebaseSetup/authService.js";
  import {createUserWithEmailAndPassword, getAuth, fetchSignInMethodsForEmail} from "firebase/auth";
  import {useUserStore} from "../stores/userStore.js";

  export default {
    components: {
      InputFieldComponent,
      NavbarComponent
    },
    setup() {
      const userStore = useUserStore();
      return { userStore }
    },
    data() {
      return {
        username: {
          value: "",
          success: false,
          error: false,
          message: ""
        },
        email: {
          value: "",
          success: false,
          error: false,
          message: ""
        },
        password: {
          value: "",
          success: false,
          error: false,
          message: ""
        },
        passwordConfirmation: {
          value: "",
          success: false,
          error: false,
          message: ""
        },
        globalMessage: {
          visible: false,
          message: ""
        }
      }
    },
    methods: {
      signUp() {
        // TODO : Sign Up
        // Input validation

        console.log(this)
        const inputIsValid =
            this.checkUsername()
            && this.checkEmail()
            && this.checkPassword()

        if (inputIsValid) {
          mySignUpWithEmailAndPassword(
              this.username.value,
              this.email.value,
              this.password.value,
              this.passwordConfirmation.value)
              .then((success) => {
                if (success) {
                  return this.$router.push({name: "Home"})
                } else {
                  this.globalMessage.visible = true;
                  this.globalMessage.message = "Une erreur est survenue lors de la création du compte. Réessayez plus tard."
                }
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode}, ${errorMessage}`)
                this.globalMessage.message = "Certaines informations sont invalides.";
                this.globalMessage.visible = true;

                switch (errorCode) {
                  case "auth/email-already-in-use":
                    this.email.success = false;
                    this.email.error = true;
                    this.email.message = "Ce courriel est déjà utilisé."
                    break;
                  case "auth/invalid-email":
                    this.email.success = false;
                    this.email.error = true;
                    this.email.message = "Ce courriel est invalide."
                    break;
                  case "auth/weak-password":
                    this.password.success = false;
                    this.password.error = true;
                    this.password.message = "Le mot de passe doit contenir au moins 6 caractères."
                    break;
                  default:
                    this.globalMessage.message = "Une erreur est survenue lors de la création du compte. Réessayez plus tard."
                    break;
                }
              });
        }
      },
      checkUsername() {
        if (!(1 <= this.username.value.length)) {
          this.username.success = false;
          this.username.error = true;
          this.username.message = "Un nom d'utilisateur est requis"
          return false;
        } else {
          this.username.success = true;
          this.username.error = false;
          this.username.message=""
          return true;
        }
      },
      async checkEmail() {
        if (!(this.email.value.length >= 1)) {
          this.email.success = false;
          this.email.error = true;
          this.email.message = "Un courriel est requis"
          return false;
        } else if (!/^\S+@\S/.test(this.email.value)) {
          this.email.success = false;
          this.email.error = true;
          this.email.message = "Ce courriel est invalide"
          return false;
        } else {
          this.email.success = true;
          this.email.error = false;
          this.email.message = "";
          return true;
        }
      },
      checkPassword() {
        if (!(this.password.value.length >= 6)) {
          this.password.success = false;
          this.password.error = true;
          this.password.message = "Le mot de passe doit contenir au moins 6 caractères.";
          return false;
        } else if (this.password.value !== this.passwordConfirmation.value) {
          this.password.success = true;
          this.password.error = false;
          this.password.message = ""

          this.passwordConfirmation.success = false;
          this.passwordConfirmation.error = true;
          this.passwordConfirmation.message = "Les mots de passe ne correspondent pas.";
          return false;
        }
        this.password.success = true;
        this.password.error = false;
        this.password.message = ""

        this.passwordConfirmation.success = true;
        this.passwordConfirmation.error = false;
        this.passwordConfirmation.message = "";
        return true;
      },
    }
  }
</script>

<style scoped>
#signUpForm {
  max-width: 500px;
}
</style>
