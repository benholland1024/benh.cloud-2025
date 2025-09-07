<template>
  <UApp>
  
  <!--  The color theme dropdown menu, in the top right corner.  -->
  <UDropdownMenu
    arrow
    :items="colorThemes"
    class="fixed top-4 right-8 z-10 bg-theme-background"
    :ui="{ content: 'w-48'}"
  >
    <UButton icon="i-material-symbols:palette-outline" class="text-theme-text" variant="outline" />
  </UDropdownMenu>

  <!-- The outer div, containing the whole app. -->
  <div class="min-h-screen flex bg-theme-background text-theme-text">
    
    <NuxtRouteAnnouncer />    <!--  This describes the route for screen readers.  -->

    <!--  Nav side bar, for desktop -->
    <div v-if="!isMobile" class="hidden md:block">
      <UNavigationMenu 
        :items="items" 
        orientation="vertical"
        class="bg-theme-background-darker-10 sticky top-0 h-screen" 
        :ui="{ link: 'px-8 text-theme-text' }"
        trailing-icon="mdi:chevron-down"
      />
    </div>

    <div class="bg-theme-background text-theme-text w-full box-border">
      <NuxtPage />
    </div>

    <!--  Mobile nav, on the bottom -->
    <div v-if="isMobile" class="md:hidden fixed bottom-0 w-full z-10">
      <UNavigationMenu 
        :items="items" 
        orientation="horizontal" 
        class="w-full bg-theme-background-darker-10 flex justify-around" 
        :ui="{
          link: 'px-8 flex flex-col items-center gap-1',
          icon: 'mb-1',
          linkTrailing: 'hidden'
        }"
      />
    </div>

  </div>
  </UApp>
</template>



<script setup lang="ts">

//  Datatypes for the navigation menu and dropdown menu.
import type { NavigationMenuItem, DropdownMenuItem } from '@nuxt/ui'

//  Tool to declare reactive variables.
import {ref} from 'vue';

//  Responsive design tool - check if we're using mobile.
import { useMediaQuery } from '@vueuse/core'
const isMobile = useMediaQuery('(max-width: 767px)') // md breakpoint is 768px


const color_theme = ref('dark');  //  The current color theme.
//  A function to update the color theme.
function update_theme(new_theme: string) {
  color_theme.value = new_theme;
  localStorage.setItem('theme', new_theme); // Optional: persist theme choice
  console.log("Theme updated to " + new_theme);
  document.documentElement.setAttribute('data-theme', new_theme);
}

// The color themes available in the dropdown menu.
const colorThemes = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Dark Themes',
      type: 'label'
    },
    {
      label: 'Dark',
      icon: 'i-lucide-moon',
      onSelect: () => { update_theme('dark')}
    },
    {
      label: 'Stars',
      icon: 'i-lucide-sun-moon',
      onSelect: () => { update_theme('stars')}
    },
    {
      label: 'All-Night Diner',
      icon: 'i-solar:moon-stars-bold',
      onSelect: () => { update_theme('diner')}
    },
    {
      label: 'Hot House Flower',
      icon: 'game-icons:vine-flower',
      onSelect: () => { update_theme('flower')}
    }
  ], [
    {
      label: 'Light Themes',
      type: 'label'
    },
    {
      label: 'Light',
      icon: 'i-lucide-sun',
      onSelect: () => { update_theme('light')}
    },
    {
      label: 'Desert',
      icon: 'mdi:cactus',
      onSelect: () => { update_theme('desert')},
    },
    {
      label: 'Winter',
      icon: 'i-lucide-snowflake',
      onSelect: () => { update_theme('winter')}
    }
  ]
])

//  The items in the navigation menu.
const items = ref<NavigationMenuItem[]>([
  {
    label: 'benh.cloud',
    to: '/',
    class: `font-[family-name:var(--serif-font)] 
      [&>span]:text-theme-primary
      text-theme-primary
      [&>span]:text-3xl 
      my-4 hidden md:block`,
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
    defaultOpen: true,
    children: [
      {
        label: 'Data Pantry',
        icon: 'mdi:file-text-outline',
        description: 'A database manager',
        to: '/portfolio/data-pantry'
      },
      {
        label: 'Alber Law Firm',
        icon: 'mdi:file-text-outline',
        description: 'A law firm\'s website',
        to: '/portfolio/albert-law'
      },
      {
        label: 'Pulse Duplicator',
        icon: 'mdi:file-text-outline',
        description: 'A novel pulse duplicator',
        to: '/portfolio/pulse-duplicator'
      },
      {
        label: 'KHE website',
        icon: 'mdi:file-text-outline',
        description: 'A hackathon website',
        to: '/portfolio/khe2019'
      },
      {
        label: 'ktty',
        icon: 'mdi:file-text-outline',
        description: 'A terminal text editor',
        to: '/portfolio/ktty'
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

</script>


<style> /*  App-wide styles!  */


h1 {
  font-family: Caprasimo, serif;
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
  box-sizing: border-box;
  overflow-x: hidden;
}
@media only screen and (max-width: 650px) {
  #content-container {
    padding-left: 0px;
  }
}

</style>
