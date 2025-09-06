<template>
  <div class="flex justify-around py-32">
    <div class="w-md">
      <h2>DataPantry.org</h2>
      <p>
        {{ $t(`This project is built and maintained by me, with help from the open source community.`,
          `Dieses Projekt wird von mir mit Hilfe der Open-Source-Community erstellt und gepflegt.`
        )}}
      </p>
      <br/>
      <p v-html="$t(`DataPantry.org is a <b>database management website</b>.  Businesses can 
        design their database using a schema diagram, then immediately use the Pantry API to 
        access their database tables.`, `DataPantry.org ist eine <b>database management website</b>. 
        Unternehmen können ihre Datenbank mithilfe eines Schemadiagramms entwerfen und anschließend direkt 
        über die Pantry-API auf ihre Datenbanktabellen zugreifen.`)">
        
      </p><br/>
      <p>
        {{$t(`They can add, update, read or delete data, from their own
        website, securely, with datatype validation. `, `Sie können Daten auf ihrer eigenen 
        Website sicher hinzufügen, aktualisieren, lesen oder löschen, mit Datentypvalidierung.`)}}
      </p><br/><br/>
      <p v-html='$t(`Try it out yourself at <a href="https://datapantry.org" target="_blank">datapantry.org</a>!`,
        `Probieren Sie es selbst aus unter <a href="https://datapantry.org" target="_blank">datapantry.org</a>!`
      )'></p>
    </div>
    <div class="vid-container">
      <video style="width:100%;" autoplay muted loop>
        <source src="../../assets/portfolio/DataPantry/landing.webm" type="video/webm">
        <img src="../../assets/portfolio/DataPantry/landing.png" class="portfolio-pic" alt="A screenshot of the home page of DataPantry.com" />
      </video>
    </div>
  </div>


  <!--  Second section, with the schema demo.  -->
  <div class="flex-container">
    <div class="vid-container">
      <video style="width:100%;" autoplay muted loop>
        <source src="../../assets/portfolio/DataPantry/schema_demo.webm" type="video/webm">
        <img src="../../assets/portfolio/DataPantry/landing.png" class="portfolio-pic" alt="A screenshot of the home page of DataPantry.com" />
      </video>
    </div>
    <div>
      <p>{{ $t(`This is the schema editor.`, `Dies ist der schema editor`)}}</p><br/>
      <p>
        {{ $t(`Tables can be created, moved and renamed.  Table columns can also be created and renamed, and their datatypes can be set.
        Table relationships can also be defined.`, `Tabellen können erstellt, verschoben und umbenannt werden. Tabellenspalten können 
        ebenfalls erstellt und umbenannt sowie deren Datentypen festgelegt werden. Tabellenbeziehungen können ebenfalls definiert werden.`) }}
      </p>
    </div>
  </div>

  <!--  Spacer, to leave room at the bottom. -->
  <div style="padding:200px 0px 200px 10vw;">
    <a href="/portfolio">&#8617; {{ $t('Back to Ben\'s Portfolio', `Zurück zu Ben's Portfolio`)  }}</a>
  </div>

</template>


<script setup lang="ts">
import {ref} from 'vue';

const name = ref('datapantry');
function $t(en: any, de: any) {
  return en;
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
.vid-container video {
  display: block;
  box-shadow: 10px 10px var(--blue);
}
</style>