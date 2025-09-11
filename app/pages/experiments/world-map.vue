<template>
  <div class="h-screen w-full bg-gray-900 relative">

    <!-- Attribution, lower right corner  -->
    <div class="absolute right-4 bottom-4 text-theme-text z-10">
      <div>Made using Globe.gl</div>
      Data from <a href="https://www.naturalearthdata.com/" target="_blank" class="underline">Natural Earth</a>
      <div>
        and 
        <a href="https://www.kaggle.com/datasets/nelgiriyewithana/countries-of-the-world-2023" 
          target="_blank" class="underline"
        >Kaggle</a>
      </div>
    </div>

    <div class="absolute top-4 left-4 text-theme-text z-10 text-sm bg-theme-background-darker-10 
      rounded p-2"
    >
      <div>
        Display:
        <select class="bg-theme-background-darker">
          <option value="gdp">GDP</option>
          <option value="population">Population (coming soon)</option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        High color:
        <theme-color-picker v-model="highColor" :disabled="lowColor"/>
      </div>
      <div class="flex items-center gap-2">
        Low color:
        <theme-color-picker v-model="lowColor" :disabled="highColor" />
      </div>
    </div>
     

    <!--  The canvas + tooltip  -->
    <ClientOnly>
      <div
        v-if="hoveredCountry"
        :style="{
          left: mousePosition ? `${mousePosition.x + 20}px` : '20px',
          top: mousePosition ? `${mousePosition.y + 20}px` : '20px'
        }"
        class="absolute bg-theme-background-lighter-10 bg-opacity-80 p-2 rounded 
          shadow-lg text-theme-text z-20"
      >
        <div>
          <strong>{{ hoveredCountry.name }}</strong>
        </div>
        <div v-if="hoveredCountry.gdp">
          GDP: {{ formatGDP(hoveredCountry.gdp) }}
        </div>
        <div v-else>No GDP data</div>
      </div>
      <div id="globe-container" ref="globeContainer" class="w-full h-full relative">
        <div
          v-if="!isLoaded"
          class="absolute inset-0 flex items-center justify-center text-white"
        >
          {{ loadingStatus }}
        </div>
      </div>
      <!-- Fallback slot for SSR -->
      <template #fallback>
        <div class="h-full w-full flex items-center justify-center text-white">
          Trying to load globe...
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import ThemeColorPicker from "~/components/ThemeColorPicker.vue";

//  Import color scheme stuff
import useColorScheme from "~/composables/useColorScheme";
const { color_theme, getColorSchemeHexColor, interpolateColor } = useColorScheme();

const globeContainer = ref<HTMLElement | null>(null);
const isLoaded = ref(false);
const loadingStatus = ref("Initializing globe...");
const hoveredCountry = ref<{ name: string; gdp: number | null } | null>(null);
const mousePosition = ref<{ x: number; y: number } | null>(null);

const highColor = ref<string>('primary');
const lowColor = ref<string>('secondary');

let hexPolygonColorFn: (feat: Feature | object) => string = () => "#444444";

const getPolygonColor = function() {
  hexPolygonColorFn = (feat: Feature | object): string => {
    if (!("properties" in feat)) return "#444444";
    const properties = (feat as Feature).properties;
    const gdp = properties?.GDP_MD_EST;
    if (typeof gdp !== "number") return "#444444";
    const minGDP = 47271463;        // Tuvalu's GDP
    const maxGDP = 21427700000000;  // USA's GDP
    const normalizedGDP = Math.log(gdp);
    const minLog = Math.log(minGDP);
    const maxLog = Math.log(maxGDP);  
    let factor = (normalizedGDP - minLog) / (maxLog - minLog);
    factor = Math.max(0, Math.min(1, factor)); // Clamp between 0 and 1
    factor = factor * factor; // Square it to make it approach 0 faster
    const lowColorHex = getColorSchemeHexColor(lowColor.value);    //  :)
    const highColorHex = getColorSchemeHexColor(highColor.value);  
    return interpolateColor(lowColorHex, highColorHex, factor);
    // `hsl(200, 100%, ${60 * normalized * normalized}%)`;
  };
}
getPolygonColor();

function handlePolygonHover(polygon: object | null, prevPolygon: object | null) {
  if (polygon && "properties" in polygon) {
    const props = (polygon as Feature).properties;
    if (props) {
      hoveredCountry.value = {
        name: props.name,
        gdp: typeof props.GDP_MD_EST === "number" ? props.GDP_MD_EST : null,
      };
    } else {
      hoveredCountry.value = null;
    }
  } else {
    hoveredCountry.value = null;
  }
}

const formatGDP = (gdp: number) => {
  if (!gdp || gdp === 0) return 'No GDP data';
  
  const trillion = 1e12;
  const billion = 1e9;
  const million = 1e6;
  
  if (gdp >= trillion) {
    return `$${(gdp / trillion).toFixed(1)} trillion`;
  } else if (gdp >= billion) {
    return `$${(gdp / billion).toFixed(1)} billion`;
  } else if (gdp >= million) {
    return `$${(gdp / million).toFixed(1)} million`;
  } else {
    return `$${gdp.toLocaleString()}`;
  }
};

onMounted(async () => {
  try {
    await nextTick();

    if (!globeContainer.value) {
      console.error("Globe container element not found!");
      loadingStatus.value = "Container not found";
      const container = document.getElementById("globe-container");
      if (!container) {
        console.error("Fallback container lookup also failed");
        return;
      }
      globeContainer.value = container;
    }

    loadingStatus.value = "Loading Globe.gl...";
    const Globe = (await import("globe.gl")).default;

    loadingStatus.value = "Loading country data...";
    const countries = (await fetch("/world-map/countries-110m.geo.json").then((res) =>
      res.json()
    )) as FeatureCollection<Geometry>;

    let start_width = globeContainer.value.offsetWidth;
    let start_height = globeContainer.value.offsetHeight;
    let bgColor = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();

    loadingStatus.value = "Creating globe instance...";
    const globe = new Globe(globeContainer.value)
      .backgroundColor(bgColor)
      .width(start_width)
      .height(start_height)
      

    // Constrain all Globe.js elements
    //  TODO:  Find a better solution. This creates issues w/ ascpect ratio.
    const allElements = globeContainer.value.querySelectorAll('*');
    allElements.forEach(element => {
      const el = element as HTMLElement;
      el.style.maxWidth = '100%';
      el.style.maxHeight = '100%';
      el.style.boxSizing = 'border-box';
    });

    await new Promise<void>((resolve) => {
      // globe.backgroundImageUrl("/world-map/night-sky.png");
      globe.globeImageUrl("/world-map/earth-night.jpg");
      globe.onGlobeReady(() => {
        resolve();
      });
    });

    globe
      .polygonsData(countries.features)
      .polygonStrokeColor(() => "#ffffff")
      .polygonSideColor(() => "#333333")
      .polygonCapColor(hexPolygonColorFn)
      .polygonAltitude(0.06)
      .onPolygonHover(handlePolygonHover)
      .showAtmosphere(true)
      .atmosphereColor("#ffffff")
      .atmosphereAltitude(0.1)
      .pointOfView({ lat: 39.6, lng: -98.5, altitude: 2 });

    isLoaded.value = true;

    window.addEventListener("resize", () => {
      if (!globeContainer.value) return;
      globe
        .width(globeContainer.value.offsetWidth)
        .height(globeContainer.value.offsetHeight);
    });

    window.addEventListener('mousemove', (event) => {
      if (globeContainer.value) {
        const rect = globeContainer.value.getBoundingClientRect();
        mousePosition.value = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      }
    });

    watch(color_theme, () => {
      if (globeContainer.value) {
        const bgColor = getColorSchemeHexColor('background');
        globeContainer.value.style.backgroundColor = bgColor;
        globe.backgroundColor(bgColor)
        getPolygonColor()
        globe.polygonCapColor(hexPolygonColorFn)
      }
    });
    watch([highColor, lowColor], () => {
      getPolygonColor()
      globe.polygonCapColor(hexPolygonColorFn)
    });
  } catch (error) {
    console.error("Error creating globe:", error);
    loadingStatus.value = "Error loading globe: " + (error as Error).message;
  }
});
</script>
