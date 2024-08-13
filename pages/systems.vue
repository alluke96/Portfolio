<template>
    <main>
        <Carousel :images="images" />
    </main>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();

const images = [

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