<template>
  <transition name="modal">
    <div class="modal" v-show="show" @click="checkPersistence">
      <div class="modal-content" @click.stop :style="{ backgroundColor: backgroundColor }">
        <div class="modal-header">
          <slot name="header" />
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <Button label="Fechar" @click="$emit('close')" /> <!-- Botão padrão -->
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  persistent: {
    type: Boolean,
    default: false
  },
  backgroundColor: {
    type: String,
    default: 'whitesmoke'
  }
});

const emit = defineEmits(['close']);

const checkPersistence = () => {
  if (!props.persistent) {
    emit('close');
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
}
.modal-content {
  padding: 20px;
  border-radius: 5px;
}
.modal-header {
  margin-bottom: 20px;
}
.modal-body {
  margin-bottom: 20px;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
}

/* Transitions */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
}
</style>
