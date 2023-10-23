<template>
  <div id="bgImg">
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns is-centered">
          <div class="column is-half">
            <div id="signUpForm" class="box">
              <div class="container m-2">
                <h1 class="title is-2 has-text-weight-bold">Modifier son profil</h1>
                <div v-if="globalMessage.message" class="notification is-danger">
                  <button class="delete" @click="clearFormError(globalMessage)"></button>
                  {{ globalMessage.message }}
                </div>
                <form @submit.prevent="register">
                  <!-- AVATAR IMAGE -->
                  <div class="columns is-centered is-mobile">
                    <div class="column is-half">
                      <figure class="image is-1by1" v-if="this.img1">
                        <img style="object-fit: cover" alt="Photo de profil chargée" class="is-rounded" :src="this.img1">
                      </figure>
                    </div>
                  </div>
                  <div class="control">
                    <label class="label">
                      Charger un avatar ? <span class="has-text-info-dark">(optionnel)</span>
                    </label>
                    <input @:change="previewImage" style="display: none" type="file" id="avatarUpload">
                    <label style="width: 100%" class="button is-primary" for="avatarUpload">
                      <span class="icon">
                        <i class="fa-solid fa-file-image"></i>
                      </span>
                      <span>Sélectionner un fichier...</span>
                    </label>
                    <progress v-if="this.uploadProgress !== null" class="progress is-info mt-1" style="border-radius: 5px" :value="this.uploadProgress" max="100">{{
                        this.uploadProgress
                      }}%</progress>

                    <p v-if="avatar.success" class="help is-success">{{ avatar.message }}</p>
                    <p v-if="avatar.error" class="help is-danger">{{ avatar.message }}</p>
                  </div>
                  <br>
                  <!--USERNAME-->
                  <input-field-component
                      label="Nom d'utilisateur"
                      type="username"
                      :value="username.value"
                      @update="(event) => {
                username.value = event.toLowerCase()
              }"
                      placeholder="DarkSasuke999"
                      iconType="fa-solid"
                      icon="fa-user"
                      :success="username.success"
                      :error="username.error"
                      :message="username.message"
                  />
                  <!--DISPLAY NAME-->
                  <input-field-component
                      label="Nom d'affichage"
                      type="display-name"
                      :value="displayName.value"
                      @update="(event) => {
                displayName.value = event
              }"
                      placeholder="Sasuke Uchiha"
                      iconType="fa-solid"
                      icon="fa-eye"
                      :success="displayName.success"
                      :error="displayName.error"
                      :message="displayName.message"
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

                  <!--OLD PASSWORD-->
                  <input-field-component
                      label="Mot de passe"
                      type="password"
                      :value="oldPassword.value"
                      @update="(event) => {
                oldPassword.value = event
              }"
                      placeholder="********"
                      iconType="fa-solid"
                      icon="fa-lock"
                      :success="oldPassword.success"
                      :error="oldPassword.error"
                      :message="oldPassword.message"
                  />

                  <!--CONFIRM OLD PASSWORD-->
                  <input-field-component
                      label="Confirmer le mot de passe"
                      type="password"
                      :value="oldPasswordConfirmation.value"
                      @update="(event) => {
                oldPasswordConfirmation.value = event
              }"
                      placeholder="********"
                      iconType="fa-solid"
                      icon="fa-lock"
                      :success="oldPasswordConfirmation.success"
                      :error="oldPasswordConfirmation.error"
                      :message="oldPasswordConfirmation.message"
                  />
                  <br>
                  <div class="field">
                    <div class="control has-text-centered">
                      <button class="button" type="button" @click="passwordChangeOn = !passwordChangeOn">
                      <span>
                        Changer de mot de passe?
                      </span>
                      </button>
                    </div>
                  </div>
                  <div id="passwordChange" :class="[{'is-hidden': !passwordChangeOn}]">
                    <!--NEW PASSWORD-->
                    <input-field-component
                        label="Nouveau mot de passe"
                        type="password"
                        :value="newPassword.value"
                        @update="(event) => {
                newPassword.value = event
              }"
                        placeholder="********"
                        iconType="fa-solid"
                        icon="fa-lock"
                        :success="newPassword.success"
                        :error="newPassword.error"
                        :message="newPassword.message"
                    />
                    <!--CONFIRM NEW PASSWORD-->
                    <input-field-component
                        label="Confirmer le nouveau mot de passe"
                        type="password"
                        :value="newPasswordConfirmation.value"
                        @update="(event) => {
                newPasswordConfirmation.value = event
              }"
                        placeholder="********"
                        iconType="fa-solid"
                        icon="fa-lock"
                        :success="newPasswordConfirmation.success"
                        :error="newPasswordConfirmation.error"
                        :message="newPasswordConfirmation.message"
                    />
                  </div>
                  <br>
                  <br>
                  <div class="field">
                    <div class="control has-text-centered">
                      <button class="button is-link"
                              type="submit"
                              :disabled="!(displayName.value
                                          && email.value
                                          && oldPassword.value
                                          && oldPasswordConfirmation.value
                                          && (!passwordChangeOn
                                              || (newPassword.value
                                                  && newPasswordConfirmation.value)))"
                      >Appliquer</button>
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

<script>
import InputFieldComponent from "../components/forms/InputFieldComponent.vue";
import {useUserStore} from "../stores/userStore.js";
import {checkFormField, clearFormError, initFormField, setFormError} from "../modules/forms.js";
import {firebaseApp} from "../firebaseSetup/firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  fetchSignInMethodsForEmail,
  updateEmail,
  updatePassword,
  updateProfile, signInWithEmailAndPassword
} from "firebase/auth"
import {doc, setDoc, getDoc, serverTimestamp} from "firebase/firestore"
import {uploadBytesResumable, ref, getDownloadURL} from "firebase/storage"
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
        displayName: initFormField(),
        email: initFormField(),
        oldPassword: initFormField(),
        oldPasswordConfirmation: initFormField(),
        newPassword: initFormField(),
        newPasswordConfirmation: initFormField(),
        passwordChangeOn: false,
        avatar: initFormField(),
        terms: initFormField(),
        globalMessage: initFormField(),
        uploadProgress: null,
        img1: null
      }
    },
    methods: {
      clearFormError,

      previewImage(event) {
        this.uploadProgress=0;
        this.img1=null;
        this.avatar.value = event.target.files[0];
        this.onUpload()
      },
      onUpload(){
        this.img1=null;
        const storageRef = ref(firebaseApp.storage, `${this.avatar.value.name}`);
        const uploadTask = uploadBytesResumable(storageRef, this.avatar.value)
        uploadTask.on(`state_changed`,snapshot=>{
              this.uploadProgress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=> {
          console.log(error.message)
            setFormError(this.avatar, "Le chargement de cette image a échoué")
            },
            ()=>{this.uploadProgress=100;
              getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                this.img1 = url;
                console.log(this.img1)
              });
            }
        );
      },
      register() {
        // Check every field
        const usernameValid = checkFormField(this.username, [{
          condition: (value) => value.trim().length >= 1,
          message: "Nom d'utilisateur est requis"
          // TODO: Check if unique in backend and frontend
        }])

        const displayNameValid = checkFormField(this.displayName, [{
          condition: (value) => value.trim().length >= 1,
          message: "Un nom d'affichage est requis"
        }])

        const emailValid = checkFormField(this.email, [{
          condition: (value) => /^\S+@\S+/.test(value),
          message: "Ce courriel est invalide"
        }])

        const oldPasswordValid = checkFormField(this.oldPassword,
        [{
          condition: async (value) => {
            await signInWithEmailAndPassword(firebaseApp.auth, this.userStore.user.email, value)
                .then((userCredential) => {
                  return true;
                })
                .catch((e) => {
                      return false;
                })
          },
          message : "Le mot de passe est incorrect"
        }])

        const oldPasswordConfirmationValid = checkFormField(this.oldPasswordConfirmation, [{
          condition: (value) => ((this.oldPassword.value && value) && (this.oldPassword.value === value)),
          message: "Les mots de passe ne correspondent pas"
        }])

        if (!(usernameValid && displayNameValid && emailValid && oldPasswordValid && oldPasswordConfirmationValid)) {
          setFormError(this.globalMessage, "Certaines informations sont invalides.")
          return false;
        }

        // If user wants to change password
          if (this.passwordChangeOn) {
            const newPasswordValid = checkFormField(this.newPassword, [{
              condition: (value) => value.trim().length >= 6,
              message: "Le mot de passe doit contenir au moins 6 caractères"
            }])

            const newPasswordConfirmationValid = checkFormField(this.newPasswordConfirmation, [{
              condition: (value) => this.newPassword.value && value && this.newPassword.value === value,
              message: "Les mots de passe ne correspondent pas"
            }])

            if (!(newPasswordValid && newPasswordConfirmationValid)) {
              setFormError(this.globalMessage, "Certaines informations sont invalides.")
              return false;
            }
          }

        // Add user to database
        signInWithEmailAndPassword(firebaseApp.auth, this.email.value, this.oldPassword.value)
          .then((userCredential) => {
            // this.userStore.user =
            return userCredential.user;
          })
          .then(async (newUser) => {
            // TODO: constrain image uploads, limit file size and file types, show errors, auto-crop?
            // Set user's display name
            await updateProfile(newUser, {
              displayName: this.displayName.value,
            })

            if (this.img1 && this.uploadProgress === 100) {
              await updateProfile(newUser, {
                photoURL: this.img1
              })
            }
            return newUser
          })
            .then(async (newUser) => {
              await updateEmail(newUser, this.email.value)
              return newUser
            })
          // Update user record in database
          .then(async (newUser) => {
            await setDoc(doc(firebaseApp.db, "/users", newUser.uid), {
              displayName: newUser.displayName,
              user_uid: newUser.uid,
              created_at: serverTimestamp(),
              email: newUser.email,
              username: this.username.value,
              photoURL: newUser.photoURL
            });

            return newUser
          })
            .then(async (newUser) => {
              // If user wants to change password
              if (this.passwordChangeOn) {
                // Update password
                await updatePassword(newUser, this.newPassword.value)
              }
              return newUser
            })
          .then((newUser) => {
            if (getDoc(doc(firebaseApp.db, "/users", newUser.uid))) {
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
      },
      async fetchProfileData() {
        await getDoc(doc(firebaseApp.db, "users", this.userStore.user.uid)).then((doc) => {
          const data = doc.data()
          this.displayName.value = data.displayName
          this.email.value = data.email
          this.username.value = data.username
          this.img1 = data.photoURL
          console.log(this.img1)
        })
      }
    },
  created() {
      this.fetchProfileData()
  },
  async beforeCreate() {
    if (!this.userStore.user.uid) {
      this.$router.push("/login")
    }
  }
}
  /*TODO: FIX FALSE POSITIVE ERROR / DUPLICATE USER CREATION */

</script>

<style scoped>
#bgImg {
  height: 100%;
  width: 100%;
  background: url("/backgrounds/profile_bg.jpg") no-repeat fixed top;
  background-size: cover;
  margin-top: -70px;
  padding-top: 70px;
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
</style>
