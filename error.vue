<template>
    
</template>

<script setup lang="ts">
const { error } = useError();
const { t, locale } = useI18n();

onMounted(() => {
    if(error.value) {
        console.log(error)
        navigateTo({ path: `/${locale.value}/` })
    }
})
</script>