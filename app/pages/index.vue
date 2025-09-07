<template>
  <!------------------------------>
  <!--    Image and About-Me    -->
  <!------------------------------>
  <div class="flex justify-around flex-wrap py-32 relative h-screen">
    <!-- Decorative Icons -->
    <div class="hidden xl:block">
      <Cog class="spin-very-slow absolute bottom-20 left-10 w-16 h-16" />
      <Heart class="animate-pulse absolute top-40 right-10 w-16 h-16" />
      <Star class="animate-bounce absolute bottom-10 right-50 w-16 h-16" />
    </div>

    <!-- Profile Image -->
    <div class="w-md">
      <ProfileImage class="w-full h-auto" />
    </div>

    <!-- About Me Section -->
    <div class="max-w-lg space-y-6 z-10">
      <h1 class="text-3xl text-theme-secondary">about me</h1>
      <br />
      <p>
        {{
          $t(
            "I work in web design, making web apps, animations, data displays, etc.",
            "Ich arbeite im Webdesign und erstelle Web-Apps, Animationen, Datenanzeigen usw."
          )
        }}
      </p>

      <p>
        {{
          $t(
            "I also have experience in circuit design, controlling motors, and reading from sensors.",
            "Ich habe auch Erfahrung im Schaltungsdesign, in der Steuerung von Motoren und im Auslesen von Sensoren."
          )
        }}
      </p>
      <br /><br />

      <!-- Contact Info  -->
      <div class="space-y-2 w-[300px]">
        <p class="flex items-center gap-2">
          <UIcon name="i-ic:outline-mail" class="size-5 pr-4" />
          <a href="mailto:benholland1024@gmail.com">benholland1024@gmail.com</a>
        </p>
        <p class="flex items-center gap-2">
          <UIcon name="ic:outline-phone" class="size-5 pr-4" />
          <a href="tel:+13307038105">+1 330.703.8105</a>
        </p>
        <p class="flex items-center gap-2">
          <UIcon name="mdi:github" class="size-5 pr-4" />
          <a href="https://github.com/benholland1024">github.com/benholland1024</a>
        </p>
      </div>

      <NuxtLink to="/portfolio" class="inline-block"> Portfolio &#8674; </NuxtLink>

      <br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTranslation } from "../composables/useTranslation";

const { $t } = useTranslation();
</script>
