<script>
  import {useUserStore} from "../../stores/userStore.js";

  export default {
    setup() {
      return {
        userStore: useUserStore()
      }
    },
    data() {
      return {
        dropdownIsActive: false
      }
    }
  }
</script>

<template>
<div class="navbar bgImg" @mouseleave="dropdownIsActive = false">
  <div class="is-flex userNavbarLogo" style="align-items: center; gap: 10px; margin-left: 5px">
    <figure class="image is-32x32 mt-2">
      <router-link ref="homeLink" to="/"><img class="image" src="/branding/logo.svg" alt=""></router-link>
    </figure>
    <span class="logo">Chatters!</span>
  </div>
  <div class="user">
    <!--Make it a dropdown menu-->
    <div :class="['dropdown', {'is-active': dropdownIsActive }]" style="display: flex">
      <div class="dropdown-trigger user" @click="dropdownIsActive = !dropdownIsActive" style="cursor: pointer">
        <img alt="" :src="this.userStore.user.photoURL" >
        <span>{{ this.userStore.user.displayName }}</span>
      </div>
      <div class="dropdown-menu" style="margin-top: -5px" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <router-link to="/profil" class="dropdown-item">
            Modifier son profil
          </router-link>
          <hr class="dropdown-divider">
          <a href="#" class="dropdown-item is-danger" @click="this.userStore.logOut()">
            Se déconnecter
          </a>
        </div>
      </div>
    </div>
    <!--<button class="button is-small" @click="this.userStore.logOut()">Logout</button>-->
  </div>
</div>
</template>

<style scoped>
.navbar {
  color: whitesmoke;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px;
  justify-content: space-between;
  background-color: transparent;
}

.navbar .logo {
  font-weight: bold;
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 5px;
}

.user img {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.user img:hover {
  filter: brightness(0.8);
  cursor: pointer;
}

.bgImg::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  filter: blur(5px);
  z-index: -1;
  background: linear-gradient(0deg, rgba(43, 45, 49, 1) 0%, rgba(43, 45, 49, 1) 80%, rgba(43, 45, 49, 0) 100%), url("/backgrounds/wp2476276.jpg");
  background-size: cover;
}

.userNavbarLogo:hover {
  filter: brightness(0.8);
  cursor: pointer;
}

.dropdown-item.is-danger {
  background-color: #f03a5f;
  color: white;
}
</style>
