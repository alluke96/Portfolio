<template>
    <main>
        <Carousel :images="images" />
    </main>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();

const images = [
    {
        src: "/img/government/leminskiando.png",
        onClick: () => openProject("leminskiando_palavras"),
        title: "(SESC-PR) Leminskiando Palavras",
    },
    {
        src: "/img/government/literacon.png",
        onClick: () => openProject("literacon"),
        title: "(SESC-PR) Literacon",
    },
    {
        src: "/img/government/maquete_virtual.png",
        onClick: () => openProject("maquete_virtual"),
        title: "(CAGEPA) Maquete Virtual",
    },
    {
        src: "/img/government/quiz_meio_ambiente.png",
        onClick: () => openProject("quiz_meio_ambiente"),
        title: "(CAGEPA) Quiz Meio Ambiente",
    },
    {
        src: "/img/government/tjrr.png",
        onClick: () => openProject("tjrr"),
        title: "(TJRR) Centro de Memória e Cultura",
    },
    {
        src: "/img/government/sebraehub.png",
        onClick: () => openProject("sebraehub"),
        title: "(SEBRAE-SC) Sebrae Hub",
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