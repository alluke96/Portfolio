<template>
    <Modal :show="showModal" @close="showModal = false" persistent background-color="#202020">
        <template #header>
            <h2 style="color: whitesmoke">{{ hasSeenModal ? $t('change_language') : 'Bem vindo(a) / Welcome' }} </h2>
        </template>

        <template #body>
            <div class="center">
                <Button label="Continue em Português" @click="selectLanguage('pt');">
                    <template #prepend>
                        <img src="/img/brasil.png" alt="Bandeira do Brasil" height="20" />
                    </template>
                </Button>
                <Button label="Switch to English" @click="selectLanguage('en');" color="#00aeff">
                    <template #prepend>
                        <img src="/img/united-states.png" alt="American Flag" height="20" />
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
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n'

const { locale } = useI18n();

const emit = defineEmits(['close']);
const props = defineProps({
    showModal: {
        type: Boolean,
        default: false
    }
})

const showModal = ref(props.showModal);
const hasSeenModal = ref(false);

watch(() => props.showModal, (newValue) => {
    showModal.value = newValue;
});

const checkModalStatus = () => {
    hasSeenModal.value = localStorage.getItem('hasSeenModal') as string === 'true';
    if (!hasSeenModal.value) {
        showModal.value = true;
    }
};

onMounted(() => {
    checkModalStatus();
});

const selectLanguage = (newLocale: string) => {
    locale.value = newLocale
    showModal.value = false
    localStorage.setItem('hasSeenModal', 'true');
    emit('close');
    // Change route from pt to en (old locale to new locale)
    navigateTo({ path: `/${newLocale}` });
};

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