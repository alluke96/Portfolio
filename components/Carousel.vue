<template>
    <main>
      <ClientOnly>
        <div v-if="clientReady">
          <div ref="track" id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
              <div v-for="(image, index) in images" :key="index">
                  <img class="image" :src="image" draggable="false" />
              </div>
          </div>
        </div>
      </ClientOnly>
    </main>
</template>

<script setup>
const images = ref([
    "https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    "https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80",
    "https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80",
    "https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
])
const track = ref(null);
const mouseDownAt = ref(0);
const prevPercentage = ref(0);
const percentage = ref(0);

const handleOnDown = (e) => {
  mouseDownAt.value = e.clientX;
};

const handleOnUp = () => {
  mouseDownAt.value = 0;
  prevPercentage.value = percentage.value;
};

const handleOnMove = (e) => {
  if (mouseDownAt.value === 0) return;

  const mouseDelta = mouseDownAt.value - e.clientX;
  const maxDelta = window.innerWidth / 2;

  const newPercentage = (mouseDelta / maxDelta) * -30;
  const nextPercentageUnconstrained = prevPercentage.value + newPercentage;
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  percentage.value = nextPercentage;

  track.value.style.transform = `translate(${nextPercentage}%, -50%)`;

  Array.from(track.value.getElementsByClassName('image')).forEach((image) => {
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  });
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
  left: 50%;
  top: 50%;
  transform: translate(0%, -50%); 
  user-select: none; /* -- Prevent image highlighting -- */
}

#image-track > div > .image {
  width: 40vmin;
  height: 56vmin;
  object-fit: cover;
  object-position: 100% center;
  cursor: pointer;
  border-radius: 4px;
}
</style>