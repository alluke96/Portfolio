<template>
    <main>
        <pre style="color: whitesmoke">{{ $t('about_text') }}</pre>
    </main>
</template>

<script setup lang="ts">

</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

pre {
    font-size: 1rem;
}
</style>