<template>
  <main>
    <ClientOnly>
      <div v-if="clientReady">
        <div ref="track" id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
          <div v-for="(image, index) in images" :key="index" @click="handleClick(image.onClick)">
            <span class="image-title">{{ image.title }}</span>
            <img
              class="image"
              :src="image.src"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  </main>
</template>

<script setup>
const props = defineProps({
  images: Array
});

const track = ref(null);
const mouseDownAt = ref(0);
const prevPercentage = ref(0);
const percentage = ref(0);
const isDragging = ref(false);
const clickThreshold = 5;

const handleOnDown = (e) => {
  mouseDownAt.value = e.clientX;
  isDragging.value = false;
};

const handleOnUp = (e) => {
  mouseDownAt.value = 0;
  prevPercentage.value = percentage.value;
};

const handleOnMove = (e) => {
  if (mouseDownAt.value === 0) return;

  const mouseDelta = mouseDownAt.value - e.clientX;
  const maxDelta = window.innerWidth / 2;

  if (Math.abs(mouseDelta) > clickThreshold) {
    isDragging.value = true;
  }

  const newPercentage = (mouseDelta / maxDelta) * -40;
  const nextPercentageUnconstrained = prevPercentage.value + newPercentage;
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  percentage.value = nextPercentage;

  track.value.style.transform = `translate(${nextPercentage}%, -50%)`;

  Array.from(track.value.getElementsByClassName('image')).forEach((image) => {
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  });
};

const handleClick = (onClick) => {
  if (!isDragging.value) {
    onClick();
  }
};

const clientReady = ref(false);
onMounted(() => {
  clientReady.value = true;
  window.addEventListener('mousedown', handleOnDown);
  window.addEventListener('touchstart', (e) => handleOnDown(e.touches[0]));
  window.addEventListener('mouseup', handleOnUp);
  window.addEventListener('touchend', (e) => handleOnUp(e.touches[0]));
  window.addEventListener('mousemove', handleOnMove);
  window.addEventListener('touchmove', (e) => handleOnMove(e.touches[0]));
});

onUnmounted(() => {
  window.removeEventListener('mousedown', handleOnDown);
  window.removeEventListener('touchstart', (e) => handleOnDown(e.touches[0]));
  window.removeEventListener('mouseup', handleOnUp);
  window.removeEventListener('touchend', (e) => handleOnUp(e.touches[0]));
  window.removeEventListener('mousemove', handleOnMove);
  window.removeEventListener('touchmove', (e) => handleOnMove(e.touches[0]));
});
</script>

<style scoped>
body {
  height: 100vh;
  width: 100vw;
  background-color: black;
  margin: 0rem;
  overflow: hidden;
}

#image-track {
  display: flex;
  gap: 4vmin;
  position: absolute;
  left: 25%;
  top: 50%;
  transform: translate(0%, -50%);
  user-select: none;
}

#image-track > div > .image {
  width: 40vmin;
  height: 56vmin;
  object-fit: cover;
  object-position: 100% center;
  cursor: pointer;
  border-radius: 4px;
}

#image-track > div {
  position: relative;
}

#image-track > div > .image-title {
  color: whitesmoke;
  cursor: pointer;
  width: 100%;
  height: 4vmin;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -60%);
  z-index: 1;
  font-weight: bold;
  text-shadow: -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, 1px 1px 0 #000;
}
</style>
