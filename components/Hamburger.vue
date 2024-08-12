<template>
  <main>
    <div class="menu-icon" @click="toggleMenu">
      <MdiIcon icon="mdiMenu" size="24" style="color: whitesmoke;" />
    </div>

    <div v-if="showMenu" class="menu-overlay" @click.self="closeMenu">
      <div class="mobile-menu">
        <button v-for="title in titles" :key="title.path" @click="goToPage(title.path)">
          {{title.label}}
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const route = useRoute();

const titles = computed (() => ([
  {
    label: t("home"),
    path: "/",
  },
  {
    label: t("games"),
    path: "/games",
  },
  {
    label: t("apps"),
    path: "/apps",
  },
  {
    label: t("web"),
    path: "/web",
  },
  {
    label: t("government"),
    path: "/government",
  },
  {
    label: t("systems"),
    path: "/systems",
  },
  {
    label: t("about"),
    path: "/about",
  },
  {
    label: t("contact"),
    path: "/contact",
  },
]));

const goToPage = (path: string) => {
  navigateTo({ path: `/${locale.value}${path}` });
  toggleMenu();
};

const normalizePath = (path: string) => {
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

const isCurrentPage = (path: string) => {
  const currentPath = normalizePath(`/${locale.value}${path}`);
  const routePath = normalizePath(route.path);
  return currentPath === routePath;
}

const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const closeMenu = () => {
  showMenu.value = false;
};
</script>

<style scoped>
main {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

button {
  font-size: 1rem;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 60px; /* para ajustar ao topo do menu */
}

.mobile-menu {
  position: absolute;
  top: 60px;
  left: 20px;
  background-color: #333;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 11;
}

.mobile-menu button {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background-color: transparent;
  border: none;
  color: whitesmoke;
  text-align: left;
  font-size: 1.2rem;
  cursor: pointer;
}

.mobile-menu button:last-child {
  margin-bottom: 0;
}
</style>