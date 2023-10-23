<script setup>

import {router} from "../router/router.js";
</script>

<template>
  <div id="bgImg">
    <div id="gradientOverlay">
      <div class="container is-8 is-max-widescreen">
        <section class="columns is-vcentered fullpage">
          <div class="column is-7 has-text-centered">
            <figure class="image is-4by3 hero-image">
              <img :src="'/branding/logo.svg'" alt="">
            </figure>
            <h1 id="title" class="title has-text-white">Chatters!</h1>
          </div>
          <div class="column is-5 has-text-centered ">
            <div class="myHero hero-right">
              <div class="hr"></div>
              <div class="container has-text-centered">
                <div class="buttons is-centered">
                  <router-link to="/login">
                    <button class="button is-primary is-large is-wide has-text-weight-semibold">
                      Se connecter!
                    </button>
                  </router-link>
                  <router-link to="/register">
                    <button
                        class="button is-warning is-large is-wide has-text-weight-semibold">S'inscrire!
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .myHero.hero-right {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .fullpage {
    height: 95vh
  }

  .hero-image {
    max-width:45vh;
    margin-left: auto;
    margin-right: auto;
  }

  #bgImg {
    margin-top: -60px;
    padding-top: 60px;
    background: url("/backgrounds/wp2476276.jpg");
    height: 100%;
    width: 100%;
    background-size: cover;
  }

  #gradientOverlay {
    margin-top: -70px;
    padding-top: 70px;
    width: 100%;
    backdrop-filter: blur(10px);
    background: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0.5) 100%);  }

  .button.is-wide {
    min-width: 200px
  }

  #title {
    font-family: Andral, sans-serif;
    font-size: 5rem;
  }

  @font-face {
    font-family: 'Andral';
    src: url("/fonts/Andral.otf");
    src: url("/fonts/Andral.ttf");
  }
</style>
