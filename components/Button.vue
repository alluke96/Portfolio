<template>
  <button 
    v-if="visible"
    :class="[buttonClass, { 'btn-disabled': disabled }]" 
    @click="onClick"
    :style="buttonStyle"
    :disabled="disabled"
  >
    <Loading v-if="loading" :color="loadingColor" size="small" />
    <span v-else class="button-content">
      <MdiIcon v-if="props.icon" :icon="props.icon" />
      <slot name="prepend" />
      {{ label }}
      <slot />
      <slot name="append" />
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  onClick: Function,
  label: String,
  icon: String,
  loading: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#4ADE80',
  },
  variant: {
    type: String,
    default: 'default',
  },
  loadingColor: {
    type: String,
    default: '#FFF'
  },
  width: {
    type: String,
    default: 'auto'
  },
  height: {
    type: String,
    default: 'auto'
  }
})

const buttonClass = computed(() => {
  return {
    'btn-default': props.variant === 'default',
    'btn-outlined': props.variant === 'outlined',
    'btn-flat': props.variant === 'flat',
  };
})

const buttonStyle = computed(() => {
  return {
    background: props.disabled ? '#d3d3d3' : props.color,
    border: props.variant === 'outlined' && !props.disabled ? `1px solid ${props.color}` : 'none',
    color: props.variant === 'outlined' && !props.disabled ? props.color : 'inherit',
    width: props.width,
    height: props.height
  };
})
</script>

<style scoped>
button {
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  column-gap: 0.375rem;
}

button:hover {
  opacity: 0.8;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.375rem;
}

.btn-default {
  border: none;
}

.btn-outlined {
  background-color: transparent !important;
}

.btn-flat {
  background-color: transparent !important;
  border: none;
}

.btn-disabled {
  background-color: #d3d3d3 !important;
  cursor: not-allowed; /* Opcional */
}

.btn-disabled:hover {
  opacity: 1;
}
</style>
