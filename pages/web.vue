<template>
    <main>
        <Carousel :images="images" />
    </main>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();

const images = [
    {
        src: "/img/web/mesinha_digital.png",
        onClick: () => openProject("mesinha_digital"),
        title: "Mesinha Digital",
    },
    {
        src: "/img/web/traceboard.png",
        onClick: () => openProject("traceboard"),
        title: "Traceboard",
    },
    {
        src: "/img/web/vino.png",
        onClick: () => openProject("vino"),
        title: "Vino & Mare",
    },
    {
        src: "/img/web/parceiros.png",
        onClick: () => openProject("parceiros"),
        title: "Parceiros SIEG-AD",
    },
    {
        src: "/img/web/portal_md.png",
        onClick: () => openProject("portalmd"),
        title: "Portal Mesinha Digital",
    },
    {
        src: "/img/web/bookings.png",
        onClick: () => openProject("bookings"),
        title: "Reserva de Oportunidades",
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