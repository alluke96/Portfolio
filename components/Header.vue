<template>
    <main>
        <div v-for="title in titles" :key="title">
            <Button :label="title.label" variant="flat" @click="goToPage(title.path)" 
            :style="{ color: isCurrentPage(title.path) ? '#4ADE80' : 'whitesmoke', fontWeight: isCurrentPage(title.path) ? 'bold' : 'normal' }" />
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
};

const normalizePath = (path: string) => {
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

const isCurrentPage = (path: string) => {
  const currentPath = normalizePath(`/${locale.value}${path}`);
  const routePath = normalizePath(route.path);
  return currentPath === routePath;
}
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
</style>