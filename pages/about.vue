<template>
    <main>
        <pre>{{ $t('about_text') }}</pre>
    </main>
</template>

<script setup lang="ts">

</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 70vh;
    max-width: 90vw;
    overflow: auto;
}

pre {
    color: whitesmoke;
    font-size: 1rem;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
}
</style>