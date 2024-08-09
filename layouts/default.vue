<template>
  <div class="layout-container">
    
    <div class="breadcrumbs-container">
      <!-- <Breadcrumbs v-if="!isMobile" /> -->
      <Button variant="flat" @click="showModal = true" style="color: whitesmoke" :tooltip="$t('change_language')">
        <template #prepend>
          <MdiIcon icon="mdiTranslate" size="18" />
        </template>
      </Button>
    </div>

    <div class="header-container" v-if="$route.path !== '/pt' && $route.path !== '/en' && $route.path !== '/pt/' && $route.path !== '/en/'">
      <Header />
    </div>

    <h1 class="logo-container" @click="goToAbout">
      ALLYSON<br>
      DUNKE
    </h1>

    <footer>
      <a href="https://github.com/alluke96" target="_blank">
        <MdiIcon icon="mdiGithub" />
      </a>
      <a href="https://linkedin.com/in/allyson-dunke" target="_blank">
        <MdiIcon icon="mdiLinkedin" />
      </a>
    </footer>

    <NuxtPage />

    <ModalLanguage :showModal="showModal" @close="showModal = false" />
    
  </div>
</template>

<script setup>
  const { locale } = useI18n();
  const isMobile = computed(() => { if(process.browser) return window.innerWidth < 768 ? true : false });

  const showModal = ref(false);

  const goToAbout = () => {
    navigateTo({ path: `/${locale.value}/about` });
  }
</script>


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

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw; 
  box-sizing: border-box; 
}

.breadcrumbs-container {
  position: absolute;
  top: 20px;
  left: 20px;
}

.header-container {
  position: absolute;
  top: 20px;
  translate: (0, 50%);
}

.logo-container {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

h1 {
  color: whitesmoke;
  font-size: 2rem;
  font-weight: 200;
  line-height: 0.8;
  /* transform: rotate(-8deg) skew(-15deg); */
  /* text-shadow: -3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, 3px 3px 0 #000; */
  text-align: right;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

footer {
  position: absolute;
  bottom: 20px;
  translate: (0, 50%);
  display: flex;
  gap: 20px;
}

a {
  text-decoration: none;
  color: whitesmoke;
  font-size: 2rem;
}

</style>
