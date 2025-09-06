<template>
  <div class="flex-container">
    <div>
      <h2>Kent Hack Enough Hackathon</h2>
      <p>{{$t(`This was the website and style guide for the hackathon for Kent State University`,
        `Dies war die Website und der Styleguide für den Hackathon der Kent State University`
      )}}.</p>
      <br/>
      <p>
        {{$t(`I made all the assets for this website. The site has since been updated, but you can see the 
        original style guide I made`, 
        `Ich habe alle Assets für diese Website erstellt. Die Website wurde inzwischen aktualisiert, 
        aber Sie können den ursprünglichen Styleguide sehen, den ich erstellt habe.`)}}
         <a :href="`/page_assets/portfolio/khe2019_StyleGuide.png`" target="_blank">{{$t('here', 'Hier ist der link')}}</a>.
      </p><br/>
    </div>
    <div class="media-container">
      <video style="width:100%;" autoplay muted loop>
        <source src="../../assets/portfolio/khe2019/demo.webm" type="video/webm">
        <img src="../../assets/portfolio/khe2019/khe2019.png" class="portfolio-pic" alt="A screenshot of the KHE 2019 website." />
      </video>
    </div>
  </div>


  <!--  Spacer, to leave room at the bottom. -->
  <div style="padding:200px 0px 200px 10vw;">
    <a href="/portfolio">&#8617; {{ $t('Back to Ben\'s Portfolio', `Zurück zu Ben's Portfolio`)  }}</a>
  </div>

</template>


<script setup lang="ts">
import {ref} from 'vue'

function $t(en:any , de: any ) { 
  return en
}

</script>

<style scoped>
.flex-container {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  gap: 40px;
  padding-top: 100px;
}
.flex-container div {
  min-width: 300px;
  width: 40%;
}
h2 {
  font-weight: normal; 
  font-size: 3em;
  margin-bottom: 30px;
  font-family: morallySerif;
}
.portfolio-pic {
  width: 30vw;
}
.media-container img, .media-container video {
  display: block;
  box-shadow: 10px 10px var(--blue);
}
</style>