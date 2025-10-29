<template>
  <div class="flex justify-around flex-wrap py-32 relative h-screen">
    <div style="width: 600px;">
      <h1>Ideas</h1>
      <ul>
        <li v-for="(idea, index) in ideas" :key="index" class="mb-4">
          <b>{{ idea.title }}</b> - {{ idea.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTranslation } from "../../composables/useTranslation";

const ideas = [
  { 
    title: "DataPantry", 
    description: "Database as a service (backend as a service?)."
  }, {
    title: "CookBook",
    description: "A platform for making, sharing, and hosting vue projects."
  }, {
    title: "Pluggy",
    description: "The self-charging robot."
  }, {
    title: "Karma calculator",
    description: `Enter a description of a situation, a set of values, and a possibility. 
      The calculator will output the karma points you will receive based on your actions.`
  }, {
    title: "Webapp similar to Solidworks",
    description: "3d CAD with extrude boss/base and similar functions."
  }, {
    title: "Home recycling into versatile materials",
    description: "Copper, polymers, etc.",
  }, {
    title: "Audio based phone app with tactile control",
    description: "For listening to articles while walking",
  }, {
    title: "Molecular simulation abstraction model",
    description: "Use hierarchical abstractions to simulate emergent properties accurately.",
  }, {
    title: "wspace",
    description: "A voxel version of wplace.live. Users place voxels on a voxel globe.",
  }, {
    title: "",
    description: "",
  },
];

const { $t } = useTranslation();
</script>
