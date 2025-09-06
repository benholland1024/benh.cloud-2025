<template>
  <UApp>
  <!-- The outer div, containing the whole app. -->
  <div :class="{ 'dark-mode': dark_mode }" style="min-height: 100vh; display:flex;">
    
    <NuxtRouteAnnouncer />
    <!-- <img src="./assets/misc/moon.png" id="dark-mode-icon" @click="toggle_dark_mode()" /> -->

    
    <UNavigationMenu 
      :items="items" 
      orientation="vertical"
      class="data-[orientation=vertical]:w-xl:bg-gray" 
      color="neutral"
      :ui="{
        linkLabel: 'text-lg',
        link: 'text-lg w-64 text-white'
      }"
    />

    <div id="content-container">
      <NuxtPage />
    </div>

    <!-- <div id="mobile-navbar">
      <router-link class="nav-link" to="/"><div class="img" id="about-me-link"></div>{{$t('about', 'über')}}</router-link>
      <router-link class="nav-link" to="/portfolio"><div class="img" id="portfolio-link"></div>portfolio</router-link> -->
      <!--<router-link class="nav-link" to="/projects"><div class="img" id="projects-link"></div>projects</router-link>-->
      <!-- <router-link class="nav-link" to="/blog"><div class="img" id="blog-link"></div>blog</router-link>
    </div> -->

  </div>
  </UApp>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()


import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'benh.cloud',
    to: '/',
    class: `font-[family-name:var(--serif-font)] 
      text-white font-bold text-3xl my-4`,
    ui: {
      link: `text-white font-bold text-3xl`,
    },
    active: false
  },
  {
    label: 'About Me',
    icon: 'i-ic:outline-face',
    to: '/',
  },
  {
    label: 'Portfolio',
    icon: 'i-material-symbols:precision-manufacturing-outline-sharp',
    to: '/portfolio',
    children: [
      {
        label: 'Startup Stirfry',
        icon: 'i-lucide-file-text',
        description: 'A web agency with taste',
        to: '/portfolio/startup-stirfry'
      },
    ]
  },
])

const dark_mode = ref(true);
const selected_language = ref('en');
const languages = ref({
  en: { nativeName: ' 🇺🇲 English' },
  de: { nativeName: ' 🇩🇪 Deutsch' },
})

function $t(en: any, de: any) {
  if (selected_language.value == 'en') {
    return en;
  } else { return de; }
}

// if (String(localStorage.darkMode) == "false") {
//   dark_mode.value = false;
// } else {
//   dark_mode.value = true;
// }

// if (['en', 'de'].includes(localStorage.selected_language)) {
//   selected_language.value = localStorage.selected_language;
// }



// export default {

//   watch: {
//     selected_language() {
//       localStorage.selected_language = this.selected_language;
//     }
//   },
  
//   methods: {
//     toggle_dark_mode() {
//       this.dark_mode = !this.dark_mode;
//       localStorage.darkMode = this.dark_mode;
//     },
//     $t(en, de) {
//       if (this.selected_language == 'en') {
//         return en;
//       } else { return de; }
//     }
//   },
  
//   mounted() {
//     //  Get browser's dark mode settings
//     if (String(localStorage.darkMode) == "false") {
//       this.dark_mode = false;
//     } else {
//       this.dark_mode = true;
//     }

//     if (['en', 'de'].includes(localStorage.selected_language)) {
//       this.selected_language = localStorage.selected_language;
//     }

//   }

// }
</script>


<style> /*  App-wide styles!  */

/* @import url('./assets/styling/page-content.css'); */
/*  This file has css classes used in multiple pages.  */

/*  Centered column.  */
.text-center {
    max-width: 600px;
    margin: auto;
}

.container-center {
    max-width: 600px;
    margin: auto;
}
.flex {
    display: flex;
}
.space-between {
    justify-content: space-between;
}

h2, h3, p {
    margin: 0px;
}


.icon {
    width: 18px;
    margin-right: 10px;
}
.dark-mode .icon {
    filter: invert();
}

.centered {
    text-align: center;
}
/* @import url('./assets/styling/css-images.css'); */
/*  These classes produce visual elements when applied to div's.  */

.divider-line {
  margin-top: 20px;
  width: 400px;
  border-bottom: solid 1px black;
  margin-left: auto;
  margin-right: auto;
}
.dark-mode .divider-line {
  border-bottom: solid 1px white;
}

.ellipsis {
  margin-top: 40px;
  margin-bottom: 40px;
  width: 100px;
  height: 50px;
  /* background-image: url(../misc/ellipsis.svg); */
  background-repeat: no-repeat;
  margin-left: auto;
  margin-right: auto;
}
.dark-mode .ellipsis {
  filter: invert();
}

/****************** */
/*    Variables.    */
/****************** */

h1 {
  font-family: Caprasimo, serif;
}
:root .dark-mode {
  --text-color: white;
  --background-color: black;
  --bg-translucent: rgba(0,0,0,0.9);
}

.blue {
  color: var(--blue);
}
.blue2 {
  color: var(--blue2);
}
.brown {
  color: var(--brown);
}
.orange {
  color: var(--orange);
}
.gray {
  color: var(--gray);
}

/**************** */
/*    App.vue     */
/**************** */
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html, body {
  margin: 0px;
}

header, #nav-links, #dark-mode-icon {
  z-index: 1;
}
header, #nav-links {
  position: relative;
}

/*  Dark mode stuff.   */
#dark-mode-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 2;
}
.dark-mode #dark-mode-icon {
  filter: invert();
}
.dark-mode {
  background: #0D0D0D;
  color: white;
}

#tooltip {
    position: absolute;
    /* display: none; */
    width: 100px;
    height: 40px;
    font-size: 12px;
    border-radius: 5px;
    background: black;
    color: white;
    z-index: 100;
    padding: 5px 10px;
}

#mobile-navbar {
  display: none;
}

@media only screen and (max-width: 650px) {
  #sidebar {
    display: none;
  }
  #mobile-navbar {
    display: block;
    background: #ddd;
    width: 100vw;
    height: 80px;
    position: fixed;
    bottom: 0px;
    z-index: 4;
    display: flex;
  }
  .dark-mode #mobile-navbar {
    background: #161616;
  }

}

#nav-links {
  text-align: left;
}
.nav-link {
  width: 200px;
  margin-top: 20px;
  margin-left: 10px;
  padding: 5px;
  border-radius: 5px;
  text-align: left;

  text-decoration: none;
  display: flex;
  align-items: center;
}
.nav-link, .nav-link:visited {
  color: black;
}
.dark-mode .nav-link, .dark-mode .nav-link:visited {
  color: white;
}
.nav-link .img {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-bottom: -3px;  /*  Makes icons align better with text */
  background-color: black;
  background-size: contain;
  border: solid 3px black;
  mask-position: center;
  mask-repeat: no-repeat;
  padding:3px;
  /* -webkit-mask-image: url(./assets/icons/face.svg);
  mask-image: url(./assets/icons/face.svg); */
}
.dark-mode .nav-link .img {
  background-color: white;
}
.nav-link:hover {
  text-decoration: underline;
}
@media only screen and (max-width: 650px) {
  .nav-link {
    text-align: center;
    margin: 0px;
    padding-top: 10px;
    box-sizing: border-box;
    display: block;
  }
  .nav-link img {
    margin: 0px;
    padding: 0px;
  }
  .img {
    margin: 0px !important;
  }
  #mobile-navbar .nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #mobile-navbar a.router-link-exact-active {
    font-weight: bold;
  }
  .dark-mode #mobile-navbar a.router-link-exact-active {
    background: #222;
  }
  #mobile-navbar a:not(.router-link-exact-active) {
    font-weight: normal;
  }
}

/****   Language dropdown    ****/
#lang-select {
  background: var(--background-color);
  color: var(--text-color);
  position: absolute;
  bottom: 30px;
  left: 30px;
}


/************************* */
/*  Page content container */
/************************* */
#content-container {
  width: 100vw;
  padding-left: var(--sidebar-width);
  box-sizing: border-box;
  overflow-x: hidden;
}
@media only screen and (max-width: 650px) {
  #content-container {
    padding-left: 0px;
  }
}

</style>
