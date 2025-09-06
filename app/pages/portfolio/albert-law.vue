<template>
  <div class="flex-container">
    <div>
      <h2>The Albert Law Firm</h2>
      <p>
        {{ $t('This client needed their site redesigned using a flexible CMS.', 
        'Dieser Kunde benötigte eine Neugestaltung seiner Site mit einem flexiblen CMS.')}}
      </p><br/>
      <p>
        {{$t(`Rather than using WordPress or similar, I chose a more flexible route that could precisely fit the client's vision.
        The website is built in VueJS, with the page content loaded in using`, `Anstatt WordPress oder ähnliches zu verwenden, 
        habe ich mich für einen flexibleren Weg entschieden, der genau zur Vision des Kunden passte.
        Die Website wurde in VueJS erstellt, wobei der Seiteninhalt mit`)}} <a href="https://prismic.io/" target="_blank">Prismic</a>
        {{ $t('.', ' geladen wurde.') }}
      </p><br/>
      <p>
        {{ $t(`The client can now edit page content securely from Prismic, without touching any code.  But we still have the flexibility 
        to add and update features using VueJS tools and libraries when needed.`, `Der Kunde kann nun Seiteninhalte sicher von Prismic 
        aus bearbeiten, ohne Code zu bearbeiten. Wir haben jedoch weiterhin die Flexibilität, bei Bedarf Funktionen mithilfe von 
        VueJS-Tools und -Bibliotheken hinzuzufügen und zu aktualisieren.`)}}
      </p><br/><br/>
      <p>
        {{ $t('Check out the Albert Law Firm at', `Schauen Sie sich die Albert Law Firm auf`) }} 
        <a href="https://salbertlaw.com" target="_blank">salbertlaw.com</a> 
        {{ $t('.', 'an.') }}
      </p>
    </div>
    <div class="media-container">
      <video style="width:100%;" autoplay muted loop>
        <source src="../../assets/portfolio/AlbertLaw/AlbertLaw.webm" type="video/webm">
        <img src="../../assets/portfolio/AlbertLaw/salbertlaw.png" class="portfolio-pic" alt="A screenshot of the home page of DataPantry.com" />
      </video>
    </div>
  </div>

  <!--  Spacer, to leave room at the bottom. -->
  <div style="padding:200px 0px 200px 10vw;">
    <a href="/portfolio">&#8617; {{ $t('Back to Ben\'s Portfolio', `Zurück zu Ben's Portfolio`)  }}</a>
  </div>

</template>


<script setup lang="ts">

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
.media-container video, .media-container img {
  display: block;
  box-shadow: 10px 10px var(--blue);
}
</style>