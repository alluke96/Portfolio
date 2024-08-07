<template>
  <div class="loading-spinner" :class="sizeClass">
    <svg class="spinner" viewBox="0 0 50 50">
      <circle class="path" :stroke="color" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
// Tamanhos permitidos
enum Size {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

const props = defineProps({
  color: {
    type: String,
    default: '#FFF',
  },
  size: {
    type: String as () => Size,
    default: Size.Medium,
    validator: (value: string) => Object.values(Size).includes(value as Size),
  },
});

const sizeClass = computed(() => {
  return {
    'spinner-small': props.size === Size.Small,
    'spinner-medium': props.size === Size.Medium,
    'spinner-large': props.size === Size.Large,
  };
});
</script>

<style scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.spinner {
  animation: rotate 2s linear infinite;
}

.spinner-small .spinner {
  width: 20px;
  height: 20px;
}

.spinner-medium .spinner {
  width: 50px;
  height: 50px;
}

.spinner-large .spinner {
  width: 100px;
  height: 100px;
}

.path {
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
