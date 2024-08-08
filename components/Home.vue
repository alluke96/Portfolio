<template>
  <main>
    <div class="star-container">
      <MdiIcon icon="mdiController" size="110" color="#00aeff" />
      <MdiIcon icon="mdiCellphonePlay" size="100" color="#ff585d" />
      <MdiIcon icon="mdiGavel" size="100" color="#ffdf82" />
      <MdiIcon icon="mdiWeb" size="100" color="#5652bf" />
      <MdiIcon icon="mdiLaptop" size="100" color="#4ade80" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const rotation = ref(0);

const rotateStar = () => {
  rotation.value += 10;
};
rotateStar();
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.star-container {
  position: relative;
  width: 400px;
  height: 400px;
  transform: rotate(var(--rotation, 0deg));
  transition: transform 0.5s;
}

.star-container div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(calc(var(--angle) + var(--rotation, 0deg)));
  transform-origin: 0 -150px;
}
</style>
