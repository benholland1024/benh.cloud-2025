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

const globeContainer = ref<HTMLElement | null>(null);
const isLoaded = ref(false);
const loadingStatus = ref("Initializing globe...");

onMounted(async () => {
  try {
    // Wait for next DOM update cycle
    await nextTick();

    if (!globeContainer.value) {
      console.error("Globe container element not found!");
      loadingStatus.value = "Container not found";
      // Try fallback to getElementById
      const container = document.getElementById("globe-container");
      if (!container) {
        console.error("Fallback container lookup also failed");
        return;
      }
      globeContainer.value = container;
    }

    console.log("Container dimensions:", {
      width: globeContainer.value.offsetWidth,
      height: globeContainer.value.offsetHeight,
      element: globeContainer.value,
    });

    loadingStatus.value = "Loading Globe.gl...";
    const Globe = (await import("globe.gl")).default;

    loadingStatus.value = "Creating globe instance...";
    const globe = new Globe(globeContainer.value)
      .backgroundColor("#111827")
      .width(globeContainer.value.offsetWidth)
      .height(globeContainer.value.offsetHeight);

    loadingStatus.value = "Loading Earth texture...";
    await new Promise((resolve) => {
      globe
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
        .onGlobeReady(() => {
          console.log("Globe is ready!");
          resolve(true);
        });
    });

    // Add controls after globe is ready
    globe
      .showAtmosphere(true)
      .atmosphereColor("#ffffff")
      .atmosphereAltitude(0.1)
      .pointOfView({ lat: 0, lng: 0, altitude: 2.5 });

    isLoaded.value = true;

    // Handle window resize
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
