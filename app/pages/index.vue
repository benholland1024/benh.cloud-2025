<template>
  <!------------------------------>
  <!--    Image and About-Me    -->
  <!------------------------------>
  <div class="flex justify-around flex-wrap py-32">
    <div class="w-md">
      <img src="../assets/bio/decorated_pfp.png"/>
    </div> <!--  End shape container -->

    <div id="right-container">
      <h1 class="text-3xl">
        about me
      </h1>
      <!-- <img src="../assets/page_assets/bio/slice17.png" style="width:100%"/> -->
      <br>
      <p>
        {{ $t('I work in web design, making web apps, animations, data displays, etc.',
        'Ich arbeite im Webdesign und erstelle Web-Apps, Animationen, Datenanzeigen usw.')}}
      </p>
      <br>
      <p>
        {{ $t('I also have experience in circuit design, controlling motors, and reading from sensors.',
        'Ich habe auch Erfahrung im Schaltungsdesign, in der Steuerung von Motoren und im Auslesen von Sensoren.')}}
      </p>
      <br/><br/>
      <div class="bio-link-container" style="width: 300px; text-align: left">
        <p><UIcon name="i-ic:outline-mail" class="size-5" /> <a href="mailto:benholland1024@gmail.com">benholland1024@gmail.com</a></p>
        <p><UIcon name="ic:outline-phone" class="size-5" /> <a href="tel:+13307038105">+1 330.703.8105</a></p>
        <p><UIcon name="mdi:github" class="size-5"/> <a href="https://github.com/benholland1024">github.com/benholland1024</a></p>
      </div>
      <br/>
      <router-link to="/portfolio">Portfolio &#8674; </router-link>
      <br/><br/><br/><br/><br/><br/><br/><br/>
    </div>

  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue';
const selected_language = ref('en');

function $t(en: any, de: any) {
  if (selected_language.value == 'en') {
    return en;
  } else { return de; }
}
</script>
