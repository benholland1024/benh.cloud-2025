
import {ref} from 'vue'

const color_theme = ref<string>("dark"); //  The current color theme.
import type { DropdownMenuItem } from "@nuxt/ui";


const update_theme = (new_theme: string) => {
  color_theme.value = new_theme;
  if (process.client) {
    localStorage.setItem("theme", new_theme);
  }
  document.documentElement.setAttribute("data-theme", new_theme);
}

const interpolateColor = (color1: string, color2: string, factor: number) => {
  // Convert hex to RGB
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);
  
  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);
  
  // Interpolate
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

console.log(interpolateColor('#ff0000', '#0000ff', 0.5)); // Should print a purple color

const getColorSchemeHexColor = (colorName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${colorName}`).trim()
}

// The color themes available in the dropdown menu.
const colorThemes = ref<DropdownMenuItem[][]>([
  [
    {
      label: "Dark Themes",
      type: "label",
    },
    {
      label: "Dark",
      icon: "i-lucide-moon",
      onSelect: () => {
        update_theme("dark");
      },
    },
    {
      label: "Angler fish",
      icon: "game-icons:angler-fish",
      onSelect: () => {
        update_theme("angler");
      },
    },
    {
      label: "All-Night Diner",
      icon: "i-solar:moon-stars-bold",
      onSelect: () => {
        update_theme("diner");
      },
    },
    {
      label: "Hot House Flower",
      icon: "game-icons:vine-flower",
      onSelect: () => {
        update_theme("flower");
      },
    },
  ],
  [
    {
      label: "Light Themes",
      type: "label",
    },
    {
      label: "Light",
      icon: "i-lucide-sun",
      onSelect: () => {
        update_theme("light");
      },
    },
    {
      label: "Lunch",
      icon: "material-symbols:lunch-dining",
      onSelect: () => {
        update_theme("lunch");
      },
    },
    {
      label: "Winter",
      icon: "i-lucide-snowflake",
      onSelect: () => {
        update_theme("winter");
      },
    },
  ],
]);

function useColorScheme() {
  return {
    color_theme,
    colorThemes,
    update_theme,
    interpolateColor,
    getColorSchemeHexColor
  }
}

export default useColorScheme