<template>
  <ClientOnly>
  <div class="flex items-center gap-2 my-2">
    <div v-for="label in schemeLabels" :key="label">
      <div 
        :style="{ backgroundColor: getColorSchemeHexColor(label) }" 
        :class="{
          'w-6 h-6 border-2': true,
          'border-theme-text': modelValue === label,
          'cursor-pointer border-theme-background': modelValue !== label && disabled != label,
          'opacity-50 border-theme-background' : disabled == label
        }"
        @click="$emit('update:modelValue', label)" 
      ></div>
    </div>
    <!-- <input 
      type="color" 
      v-model="modelValue" 
      @input="$emit('update:modelValue', modelValue)" 
      class="w-12 h-12 p-0 border-0 bg-transparent cursor-pointer"
    /> -->
  </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import useColorScheme from '../composables/useColorScheme';
import { ref, watch } from 'vue';

const schemeLabels = ref<string[]>(['primary', 'secondary', 'accent', 'background', 'text']);
const { getColorSchemeHexColor, color_theme } = useColorScheme();

watch(color_theme, () => {
  // Force update schemeLabels to reflect any changes in color themes
  schemeLabels.value = ['primary', 'secondary', 'accent', 'color4', 'color5'];
})

defineProps<{
  modelValue: string
  disabled?: string
}>();


</script>