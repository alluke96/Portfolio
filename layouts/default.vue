<template>
  <div class="layout-container">
    
    <div class="breadcrumbs-container">
      <Breadcrumbs v-if="!isMobile" />
    </div>

    <h1 class="logo-container" @click="navigateTo('/about')">
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
    
  </div>
</template>

<script setup lang="ts">
  const router = useRouter();
  const route = useRoute()

  const breadcrumbStore = useBreadcrumbStore()
  if (route.path === '/') breadcrumbStore.setBreadcrumbs([{ label: 'Home', path: '/' }])

  router.beforeEach((to) => {
    const breadcrumbStore = useBreadcrumbStore()

    if (to.path === '/') return breadcrumbStore.setBreadcrumbs([{ label: 'Home', path: '/' }])

    const pathArray = to.path.split('/').filter(path => path)
    const crumbs = pathArray.map((path, index) => {
      return {
        label: getLabel(path),
        path: '/' + pathArray.slice(0, index + 1).join('/')
      }
    })

    if (breadcrumbStore.getBreadcrumbs().length === 0) breadcrumbStore.setBreadcrumbs([{ label: 'Home', path: '/' }])
    breadcrumbStore.addBreadcrumb(crumbs[0])
  })

  const getLabel = (path: string): string => {
    return path.charAt(0).toUpperCase() + path.slice(1)
  }

  const isMobile = computed(() => { if(process.browser) return window.innerWidth < 768 ? true : false })
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
  filter: blur(1rem);
}

html {
  overflow: hidden;
  font-family: "Open Sans", sans-serif;
  background-color: #121212;
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
