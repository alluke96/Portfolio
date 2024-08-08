<template>
    <main>
        <Carousel :images="images" />
    </main>
</template>

<script setup lang="ts">
const images = [
    "https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
]
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>