<template>
  <div class="h-screen w-full bg-gray-900 relative">
    <div class="absolute right-4 bottom-4 text-theme-text z-10">Made using Globe.gl</div>
    <ClientOnly>
      <div
        v-if="hoveredCountry"
        class="absolute left-4 top-4 bg-white bg-opacity-80 p-2 rounded shadow text-black z-20"
      >
        <div>
          <strong>{{ hoveredCountry.name }}</strong>
        </div>
        <div v-if="hoveredCountry.gdp">
          GDP: ${{ hoveredCountry.gdp.toLocaleString() }}
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
import { ref, onMounted, nextTick } from "vue";
import type { Feature, FeatureCollection, Geometry } from "geojson";

const globeContainer = ref<HTMLElement | null>(null);
const isLoaded = ref(false);
const loadingStatus = ref("Initializing globe...");
const hoveredCountry = ref<{ name: string; gdp: number | null } | null>(null);

const hexPolygonColorFn = (feat: Feature | object): string => {
  if (!("properties" in feat)) return "#444444";
  const properties = (feat as Feature).properties;
  const gdp = properties?.GDP_MD_EST;
  if (typeof gdp !== "number") return "#444444";
  const normalized = Math.log(gdp) / Math.log(22427700000000); // Normalize based on max GDP (USA ~22.4T);
  return `hsl(200, 100%, ${60 * normalized * normalized}%)`;
};

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

    loadingStatus.value = "Creating globe instance...";
    const globe = new Globe(globeContainer.value)
      .backgroundColor("#111827")
      .width(globeContainer.value.offsetWidth)
      .height(globeContainer.value.offsetHeight);

    await new Promise<void>((resolve) => {
      globe.globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg");
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
  } catch (error) {
    console.error("Error creating globe:", error);
    loadingStatus.value = "Error loading globe: " + (error as Error).message;
  }
});
</script>
