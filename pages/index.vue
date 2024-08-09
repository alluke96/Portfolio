<template>
    <main>
        <Carousel :images="images" />
    </main>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const images = [
    {
        src: "/img/thumbs/games.jpg",
        onClick: () => openCategory("games"),
        title: t("games"),
    },
    {
        src: "/img/thumbs/apps.jpg",
        onClick: () => openCategory("apps"),
        title: t("apps"),
    },
    {
        src: "/img/thumbs/web.jpg",
        onClick: () => openCategory("web"),
        title: t("web"),
    },
    {
        src: "/img/thumbs/government.jpg",
        onClick: () => openCategory("government"),
        title: t("government"),
    },
    {
        src: "/img/thumbs/systems.jpg",
        onClick: () => openCategory("systems"),
        title: t("systems"),
    },
    {
        src: "/img/thumbs/about.jpg",
        onClick: () => openCategory("about"),
        title: t("about"),
    },
    {
        src: "/img/thumbs/contact.jpg",
        onClick: () => openCategory("contact"),
        title: t("contact"),
    },
];

const openCategory = (name: string) => {
    console.log(name);
    navigateTo({ path: `/${locale.value}/${name}` });
}
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>