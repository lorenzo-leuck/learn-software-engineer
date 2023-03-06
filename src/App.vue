<template>
  <div id="app">
    <AnimatedBackground>
      <Guide />
    </AnimatedBackground>
  </div>
</template>

<script>
import Guide from "./components/Guide.vue";
import AnimatedBackground from "./components/AnimatedBackground.vue";

export default {
  name: "App",
  components: {
    Guide,
    AnimatedBackground,
  },
};
</script>
