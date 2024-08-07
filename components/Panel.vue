<template>
    <div class="expansion-panel" v-if="visible">
        <transition name="panel-transition">
            <div class="panel" :class="{ expanded: isExpanded, fullscreen: isFullScreen }">
                <div class="panel-title" @click="toggleExpand">
                    <span :style="{ color: textColor }">
                        {{ title }}
                        <span v-if="quantity > 0" :style="{ color: '#5652bf', fontSize: '16px' }">({{ quantity }})</span>
                    </span>
                    <div class="actions">
                        <template v-for="(action, index) in actions" :key="index">
                            <button v-if="action.show !== false" :disabled="action.disabled" @click.stop="action.action">
                                <i :class="action.icon" :style="{ color: textColor }"></i>
                            </button>
                        </template>
                        <button v-if="fullscreenable" @click.stop="goFullScreen" style="color: whitesmoke">
                            Fullscreen
                        </button>
                    </div>
                </div>
                <div class="panel-content" v-show="isExpanded">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">

//* PROPS
const props = defineProps({
    title: { type: String },
    actions: { type: Array },
    expanded: { type: Boolean, default: false },
    fullscreenable: { type: Boolean, default: false },
    fullscreen: { type: Boolean },
    visible: { type: Boolean, default: true },
    color: { type: String },
    textColor: { type: String, default: 'whitesmoke' },
    quantity: { type: Number, default: 0 }
});

//* EMITS
const emit = defineEmits(['update:expanded', 'update:fullscreen']);

//* COMPUTED
const isExpanded = computed({
    get: () => props.expanded,
    set: (value) => {
        // Sai do fullscreen caso clique para colapsar o painel com ele em fullscreen
        if (isFullScreen.value && !value) {
            isFullScreen.value = false;
            // Mostrar todos os paineis
            const panels = document.querySelectorAll('.panel');
            panels.forEach(panel => {
                panel.style.display = 'block';
            });
        }
        emit('update:expanded', value);
    }
});

const isFullScreen = computed({
    get: () => props.fullscreen,
    set: (value) => emit('update:fullscreen', value)
});

//* ACTIONS
const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};

const goFullScreen = () => {
    isFullScreen.value = !isFullScreen.value;
    isExpanded.value = true;

    setTimeout(() => {
        if (isFullScreen.value) {
            // Ocultar todos os outros paineis
            const panels = document.querySelectorAll('.panel');
            const fullscreenPanel = document.querySelector('.panel.fullscreen');
            panels.forEach(panel => {
                if (panel !== fullscreenPanel) panel.style.display = 'none';
            });
        } else {
            // Mostrar todos os paineis
            const panels = document.querySelectorAll('.panel');
            panels.forEach(panel => panel.style.display = 'block');
        }
    }, 0);
};
</script>

<style scoped>
.expansion-panel {
    margin: 10px 20px;
}
.panel {
    border: 1px solid #252525;
    border-radius: 4px;
    transition: all 0.5s;
}
.panel-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-bottom: 2px solid #4ADE80;
    font-weight: bold;
    font-size: 20px;
    background-color: #252525;
}
.actions {
    display: flex;
    align-items: center;
}
.actions button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    margin-left: 10px;
}
.panel-content {
    padding: 10px;
    display: none;
    background-color: #303030;
}
.panel.expanded .panel-content {
    display: block;
}
.panel.fullscreen {
    position: fixed;
    top: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    z-index: 10;
    background: #303030;
    overflow: auto;
}

/* Transition Styles */
.panel-transition-enter-active, .panel-transition-leave-active {
    transition: max-height 0.5s ease, opacity 0.5s ease;
}
.panel-transition-enter, .panel-transition-leave-to {
    max-height: 0;
    opacity: 0;
}
</style>
