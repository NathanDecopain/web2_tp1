<script setup>

import {router} from "../router/router.js";
</script>

<template>
  <div id="firstBg">
    <div id="mainBg">
      <div class="container is-8 is-max-widescreen">
        <section class="columns is-vcentered fullpage">
          <div class="column is-7 has-text-centered">
            <figure class="image is-4by3 hero-image">
              <img v-bind:src="'/branding/logo.svg'">
            </figure>
            <h1 id="title" class="title has-text-white">Chatters!</h1>
          </div>
          <div class="column is-5 is-align-content-center ">
            <div class="myHero hero-right">
              <div class="hr"></div>
              <div class="container has-text-centered">
                <div class="buttons is-centered">
                  <button class="button is-primary is-large is-wide has-text-weight-semibold">
                    Se connecter!
                  </button>
                    <button
                        v-on:click="router.push('/signup')"
                        class="button is-warning is-large is-wide has-text-weight-semibold">S'inscrire!</button>
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
    margin-right: 50px;
    text-align: center;
  }

  .fullpage {
    height: 100vh
  }

  .hero-image {
    max-width:45vh;
    margin-left: 50px;
    margin-right: 40px;
  }

  #firstBg {
    background: url("/backgrounds/wp2476276.jpg");
    height: 100%;
    width: 100%;
    background-size: cover;
  }

  #mainBg {
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
