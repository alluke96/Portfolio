<template>
    <main>
        <Carousel :images="images" />
    </main>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();

const images = [
    {
        src: "/img/apps/memoletras_thumb.png",
        onClick: () => openProject("memoletras"),
        title: "MemoLetras",
    },
    {
        src: "/img/apps/para_aprender_e_memorizar_thumb.png",
        onClick: () => openProject("para_aprender_e_memorizar"),
        title: "Para aprender e memorizar",
    },
];

const openProject = (project: string) => {
    navigateTo(`/${locale.value}/projects/${project}`);
}
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>