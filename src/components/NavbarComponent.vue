

<template>
  <nav class="navbar my-transparent has-text-centered">
    <div class="container is-max-desktop has-text-weight-bold">
      <div class="level is-mobile" style="width: 100%">
        <p class="level-item has-text-centered">
        </p>
        <p class="level-item has-text-centered">
          <router-link to="/conversations" class="">Conversations</router-link>
        </p>
        <p class="level-item has-text-centered p-1">
          <router-link to="/"><img src="/branding/logo.svg" alt="" style="height: 48px;"></router-link>
        </p>
        <p class="level-item has-text-centered">
          <a class="">About</a>
        </p>
        <p class="level-item has-text-centered">

        </p>
        <div class="level-right">
          <div class="user" @mouseleave="dropdownIsActive = false">
            <!--Make it a dropdown menu-->
            <div :class="['dropdown', 'is-right', {'is-active': dropdownIsActive }]" style="display: flex">
              <div class="dropdown-trigger user" @click="dropdownIsActive = !dropdownIsActive" style="cursor: pointer">
                <span>{{ this.userStore.user.displayName }}</span>
                <img v-if="this.userStore.user.photoURL" class="is-rounded" :src="this.userStore.user.photoURL || '/placeholders/pfp.png'" alt=""/>
              </div>
              <div class="dropdown-menu" style="margin-top: -5px; overflow: clip" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <router-link to="/profil" class="dropdown-item has-text-grey-darker">
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
      </div>
    </div>
  </nav>
</template>

<script>
import {useUserStore} from "../stores/userStore.js";

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore }
  },
  data() {
    return {
      user: this.userStore.state,
      dropdownIsActive: false
    }
  }

}
</script>

<style scoped>
  .navbar-container {
    max-width: 1366px;
    margin: auto;
  }

  .navbar.my-transparent {
    background-color: transparent;
    background-image: none;
  }

  a {
    color: white;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: 5px;
    margin-left: -40px;
  }

  .user img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user img:hover {
    filter: brightness(0.8);
    cursor: pointer;
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
