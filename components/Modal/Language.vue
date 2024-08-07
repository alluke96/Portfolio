<template>
    <Modal :show="showModal" @close="showModal = false" persistent background-color="#202020">
        <template #header>
            <h2 style="color: whitesmoke">Bem vindo(a) / Welcome</h2>
        </template>

        <template #body>
            <div class="center">
                <Button label="Continue em Português" @click="selectLanguage();">
                    <template #prepend>
                        <img src="@/public/img/brasil.png" alt="Bandeira do Brasil" height="20" />
                    </template>
                </Button>
                <Button label="Switch to English" @click="changeLocale('en'); selectLanguage();" icon="" color="#00aeff">
                    <template #prepend>
                        <img src="@/public/img/united-states.png" alt="American Flag" height="20" />
                    </template>
                </Button>
            </div>
        </template>

        <template #footer>
            <span></span>
        </template>
    </Modal>
</template>

<script setup lang="ts">
const locale = ref('pt');
const showModal = ref(false);

const checkModalStatus = () => {
    const hasSeenModal = localStorage.getItem('hasSeenModal');
    if (!hasSeenModal) {
        showModal.value = true;
    }
};
onMounted(() => {
    checkModalStatus();
});

const selectLanguage = () => {
    localStorage.setItem('hasSeenModal', 'true');
    showModal.value = false;
};

const changeLocale = (newLocale: string) => {
    locale.value = newLocale;
    showModal.value = false;
}
</script>

<style scoped>
.center {
    display: flex;
    align-items: center;
    gap: 20px;
}

@media screen and (max-width: 600px) {
    .center {
        flex-direction: column;
    }
}
</style>