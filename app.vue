<template>
<NuxtLayout name="default">
  <NuxtPage />
</NuxtLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  /* filter: blur(1rem); */
}

html {
  overflow: hidden;
  font-family: "Open Sans", sans-serif;
  background-color: #121212;
}

body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
</style>