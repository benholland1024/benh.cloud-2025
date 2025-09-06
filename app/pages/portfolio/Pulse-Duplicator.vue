<template>
  <div class="flex-container">
    <div>
      <h2>The Pulse Duplicator</h2>
      <p>
        {{$t(`This was my main project while working for the`, `Dies war mein Hauptprojekt während meiner Arbeit für die`)}} 
        <a href="" target="_blank">BETA Lab</a>  
         (<b>B</b>io<b>E</b>ngineering for <b>T</b>ranslational <b>A</b>pplications Lab).
      </p><br/>
      <p>
        {{ $t(`The lab was working on an artificial heart valve design. I was the only one in the lab 
        with a computer science degree, and so I was in charge of creating a system to test the 
        novel heart valve design, compliant with ISO standards.`, 
        `Das Labor arbeitete an der Entwicklung einer künstlichen Herzklappe. 
        Ich war der Einzige im Labor mit einem Informatik-Abschluss und daher 
        für die Entwicklung eines Systems zur Prüfung des neuartigen Herzklappendesigns 
        verantwortlich, das den ISO-Normen entspricht.`)}}
      </p><br/>
      <p>
        {{ $t(`I researched the needed sensors for us to order, designed a custom PCB, and used Linux 
        on an RPi to both display the data and provide touch-screen user controls.`, `Ich recherchierte 
        die für unsere Bestellung benötigten Sensoren, entwarf eine kundenspezifische Leiterplatte und 
        verwendete Linux auf einem RPi, um sowohl die Daten anzuzeigen als auch Touchscreen-Benutzersteuerungen 
        bereitzustellen.`)}}
      </p><br/>
      <p>
        {{ $t(`The UI was made using Python for hardware interfacing, and Javascript for the display 
        and user controls.`, 
        `Die Benutzeroberfläche wurde mit Python für die Hardware-Schnittstelle und Javascript für die 
        Anzeige und Benutzersteuerung erstellt.`)}}
      </p><br/><br/>
      <p>
        {{$t(`Check out a poster explaining the work `, `Schauen Sie sich ein Poster an, das die Arbeit erklärt`)}}
        <a :href="`/page_assets/portfolio/PulseDuplicatorBMESPoster.pdf`" target="_blank">{{$t('here', 'hier')}}</a>.
      </p>
    </div>
    <div class="media-container">
      <!-- <img src="../../assets/page_assets/portfolio/pulse_duplicator_diagram.png" class="portfolio-pic" alt="A diagram of the pulse duplicator." /> -->
      <video style="width:100%;" autoplay muted loop>
        <source src="../../assets/portfolio/PulseDuplicator/demo.webm" type="video/webm">
        Your browser does not support video :(
      </video>
    </div>
  </div>

  <div style="text-align: center; margin-top: 100px;" class="media-container">
    <img src="../../assets/portfolio/PulseDuplicator/pulse_duplicator_diagram.png"  alt="A diagram of the pulse duplicator." />
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
.media-container video, .media-container img {
  box-shadow: 10px 10px var(--blue);
}
</style>