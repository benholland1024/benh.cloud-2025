<template>
  <div class="flex-container">
    <div>
      <h2>Ktty - {{$t(`A terminal text editor`, `Ein Terminal-Texteditor`)}}</h2>
      <p>
        {{$t(`This is a terminal text editor written in NodeJS, and re-written in C++.  It's similar to 
        Emacs or Nano.`,
        `Dies ist ein Terminal-Texteditor, der in NodeJS geschrieben und in C++ umgeschrieben wurde. 
        Er ähnelt Emacs oder Nano.`)}}
      </p><br/>
      <p>
        {{$t(`It currently lets you make new files or open existing files, edit text, navigate around text, and save.  
        You can scroll or resize the window. And it warns you if you try to exit without saving, prompting you 
        to either save first or commit to losing changes.  A menu bar is implemented, but no menu options are 
        functional yet.`, `Derzeit können Sie neue Dateien erstellen oder vorhandene öffnen, Text bearbeiten, 
        im Text navigieren und speichern. Sie können scrollen oder die Fenstergröße ändern. Wenn Sie versuchen, 
        das Fenster ohne Speichern zu beenden, werden Sie gewarnt und aufgefordert, entweder zuerst zu speichern 
        oder die Änderungen zu verlieren. Eine Menüleiste ist implementiert, aber die Menüoptionen sind noch nicht 
        funktionsfähig.`)}}
      </p><br/>
      <p>
        {{$t(`The biggest feature of ktty is it's documentation.  Each step required to recreate ktty is documented 
        in a tutorial, which you can check out`, 
        `Das größte Feature von ktty ist die Dokumentation. Jeder Schritt zur Neuerstellung von ktty ist in einem Tutorial dokumentiert.`)}} 
        <a href="https://salbertlaw.com" target="_blank">{{$t(`here`, `Der Link ist hier`)}}</a>.
      </p><br/><br/>
    </div>
    <div class="media-container">
      <video style="width:100%;" autoplay muted loop>
        <source src="../../assets/portfolio/ktty/ktty-demo.webm" type="video/webm">
        <img src="../../assets/portfolio/ktty/ktty.png" class="portfolio-pic" alt="A screenshot of the ktty app." />
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
.media-container video, .media-container img {
  display: block;
  box-shadow: 10px 10px var(--blue);
}
</style>