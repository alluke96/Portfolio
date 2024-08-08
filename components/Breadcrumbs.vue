<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(crumb, index) in crumbs" :key="index" class="breadcrumb-item">
        <div
          v-if="index !== crumbs.length - 1"
          class="breadcrumb-not-actual"
          @click="goToPage(crumb.path)"
        >
          {{ crumb.label }}
        </div>
        <span v-else>{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();
const { t, locale } = useI18n();

const paths = computed(() => [
  {
    label: t("home"),
    path: "",
  },
  {
    label: t("about"),
    path: "about",
  },
  {
    label: t("contact"),
    path: "contact",
  },
]);

const crumbs = computed(() => {
  // Remova o locale e divida o fullPath em segmentos
  let realPaths = route.fullPath.replace(locale.value, "").replaceAll("//", "/").split("/").filter((segment, index, array) => {
    // Permitir apenas um match ""
    if (segment === "") {
      return index === array.indexOf("");
    }
    return true;
  });

  // Encontre todos os paths que correspondem a cada segmento de realPaths
  const matchedPaths = realPaths.map(realPath => paths.value.find(path => path.path === realPath)).filter(Boolean);

  // Retorne o array com todos os paths correspondentes ou o primeiro path se nenhum for encontrado
  return matchedPaths.length > 0 ? matchedPaths : [paths.value[0]];
});

const goToPage = (path: string) => {
  navigateTo({ path: `/${locale.value}/${path}` });
};
</script>

<style>
.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  color: whitesmoke;
}

.breadcrumb-item {
  margin-right: 0.5rem;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: ">";
  margin-right: 0.5rem;
  color: whitesmoke;
}

.breadcrumb-item span {
  font-weight: bold;
}

.breadcrumb-not-actual {
  font-weight: normal;
  cursor: pointer;
}

.breadcrumb-item a {
  text-decoration: none;
  color: gray;
}
</style>
