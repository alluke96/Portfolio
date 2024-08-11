<template>
    <main>
        <Carousel :images="images" />
    </main>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();

const images = [
    {
        src: "/img/games/a_vida_de_um_gato.png",
        onClick: () => openProject("a_vida_de_um_gato"),
        title: "A Vida de um Gato",
    },
    {
        src: "/img/games/anxiety_wires.png",
        onClick: () => openProject("anxiety_wires"),
        title: "Anxiety Wires",
    },
    {
        src: "/img/games/sweets_vs_salts.png",
        onClick: () => openProject("sweets_vs_salts"),
        title: "Sweets vs Salts",
    },
    {
        src: "/img/games/rpg_ao_quadrado.png",
        onClick: () => openProject("rpg_ao_quadrado"),
        title: "RPG²",
    },
    {
        src: "/img/games/memories_of_a_forgotten_time.png",
        onClick: () => openProject("memories_of_a_forgotten_time"),
        title: "Memories of a Forgotten Time",
    },
    {
        src: "/img/games/furious_fists.png",
        onClick: () => openProject("furious_fists"),
        title: "Furious Fists",
    },
    {
        src: "/img/games/remember.png",
        onClick: () => openProject("remember"),
        title: "Remember",
    },
    {
        src: "/img/games/capture_the_flags.png",
        onClick: () => openProject("capture_the_flags"),
        title: "Capture the Flags",
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