<template>
  <div class="h-screen w-full bg-gray-900">
    <div class="absolute right-4 bottom-4 text-theme-text z-10">Made using Globe.gl</div>
    <ClientOnly>
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
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

interface CountryData {
  ISO3: string;
  GDP_MD_EST: number;
}

interface CountryName {
  name: string;
  code: string;
}

const data = ref<CountryData[]>([]);

// Add this constant with country name to ISO3 mappings
const countryNameToCode: CountryName[] = [
  { name: "United States of America", code: "USA" },
  { name: "People's Republic of China", code: "CHN" },
  { name: "Japan", code: "JPN" },
  { name: "Germany", code: "DEU" },
  { name: "United Kingdom", code: "GBR" },
  { name: "India", code: "IND" },
  { name: "France", code: "FRA" },
  { name: "Canada", code: "CAN" },
  { name: "Commonwealth of Australia", code: "AUS" },
  { name: "Federative Republic of Brazil", code: "BRA" },
  { name: "Lao People's Democratic Republic", code: "LAO" },
  // Add more mappings as needed
];

// TODO: Add more country mappings. Current mappings cover:
// - North America: USA, CAN
// - Europe: GBR, DEU, FRA
// - Asia: CHN, JPN, IND, LAO
// - Oceania: AUS
// - South America: BRA
// Next step: Add mappings for countries shown in console output

// Add this set before the color function to track logged countries
const loggedCountries = new Set<string>();

const hexPolygonColorFn = (feat: Feature | object): string => {
  if (!("properties" in feat)) {
    return "#444444";
  }
  const properties = (feat as Feature).properties;

  if (!properties?.name) {
    return "#444444";
  }

  // Find the country code from our mapping
  const countryMapping = countryNameToCode.find((c) => c.name === properties.name);

  if (!countryMapping) {
    if (!loggedCountries.has(properties.name)) {
      console.log(`Need mapping for: "${properties.name}"`);
      loggedCountries.add(properties.name);
    }
    return "#444444";
  }

  const countryData = data.value.find((d: CountryData) => d.ISO3 === countryMapping.code);

  if (countryData) {
    const gdp = countryData.GDP_MD_EST;
    const normalized = Math.log10(gdp) / Math.log10(25000000);
    const color = `hsl(${240 * (1 - normalized)}, 100%, 50%)`;
    console.log(`Coloring ${properties.name} (${countryMapping.code}) with ${color}`);
    return color;
  }

  return "#444444";
};

const globeContainer = ref<HTMLElement | null>(null);
const isLoaded = ref(false);
const loadingStatus = ref("Initializing globe...");

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
    const topoData = (await fetch(
      "https://unpkg.com/world-atlas/countries-110m.json"
    ).then((res) => res.json())) as Topology;

    // Convert TopoJSON to GeoJSON with proper typing
    const countries = topojson.feature(
      topoData,
      topoData.objects.countries as GeometryCollection
    ) as FeatureCollection<Geometry>;

    console.log("Converted GeoJSON features count:", countries.features.length);

    // Sample GDP data
    data.value = [
      { ISO3: "USA", GDP_MD_EST: 22996100 },
      { ISO3: "CHN", GDP_MD_EST: 16862979 },
      { ISO3: "JPN", GDP_MD_EST: 4937422 },
      { ISO3: "DEU", GDP_MD_EST: 4223116 },
      { ISO3: "GBR", GDP_MD_EST: 3186860 },
      { ISO3: "IND", GDP_MD_EST: 3176295 },
      { ISO3: "FRA", GDP_MD_EST: 2937473 },
      { ISO3: "CAN", GDP_MD_EST: 2000661 },
      { ISO3: "AUS", GDP_MD_EST: 1542659 },
      { ISO3: "BRA", GDP_MD_EST: 1608981 },
    ];
    console.log("GDP data count:", data.value.length);

    loadingStatus.value = "Creating globe instance...";
    const globe = new Globe(globeContainer.value)
      .backgroundColor("#111827")
      .width(globeContainer.value.offsetWidth)
      .height(globeContainer.value.offsetHeight);

    // Load the globe texture first
    await new Promise<void>((resolve) => {
      globe.globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg");
      globe.onGlobeReady(() => {
        console.log("Globe texture loaded");
        resolve();
      });
    });

    // Then add the polygon data
    console.log("Adding polygon data...");
    globe
      .polygonsData(countries.features)
      .polygonStrokeColor(() => "#ffffff")
      .polygonSideColor(() => "#333333")
      .polygonCapColor(hexPolygonColorFn)
      .polygonAltitude(0.06)
      .showAtmosphere(true)
      .atmosphereColor("#ffffff")
      .atmosphereAltitude(0.1)
      .pointOfView({ lat: 39.6, lng: -98.5, altitude: 2 });

    console.log("Globe configuration complete");

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
