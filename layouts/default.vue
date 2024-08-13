<template>
  <div class="layout-container">

    <NuxtPage />
    
    <div class="breadcrumbs-container" v-if="$route.path !== '/pt' && $route.path !== '/en' && $route.path !== '/pt/' && $route.path !== '/en/'">
      <!-- <Breadcrumbs v-if="!isMobile" /> -->
      <Button variant="flat" @click="goBack" style="color: whitesmoke" :label="$t('back')" v-if="!isMobile" />
      <Hamburger v-else />
    </div>

    <div class="header-container" v-if="$route.path !== '/pt' && $route.path !== '/en' && $route.path !== '/pt/' && $route.path !== '/en/'">
      <Header v-if="!isMobile" />
    </div>

    <h1 class="logo-container" @click="goToAbout">
      ALLYSON<br>
      DUNKE
    </h1>

    <div class="language-container">
      <Button variant="flat" @click="showModal = true" style="color: whitesmoke" :tooltip="$t('change_language')">
        <template #prepend>
          <MdiIcon icon="mdiTranslate" size="18" />
        </template>
      </Button>
    </div>

    <footer>
      <a href="https://github.com/alluke96" target="_blank">
        <MdiIcon icon="mdiGithub" />
      </a>
      <a href="https://linkedin.com/in/allyson-dunke" target="_blank">
        <MdiIcon icon="mdiLinkedin" />
      </a>
    </footer>

    <ModalLanguage :showModal="showModal" @close="showModal = false" />
    
  </div>
</template>

<script setup>
const { locale } = useI18n();
const router = useRouter();

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth < 768;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768;
  });
});

const showModal = ref(false);

const goToAbout = () => {
  navigateTo({ path: `/${locale.value}/about` });
}

const goBack = () => {
  router.back();
}
</script>

<style scoped>
.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
    right: 10px;
  }

  .breadcrumbs-container,
  .language-container {
    left: 10px;
    bottom: 10px;
  }
}

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

.language-container {
  position: absolute;
  bottom: 20px;
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
