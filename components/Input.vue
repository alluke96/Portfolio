<template>
    <main>
        <div class="input-container">
            <label :class="{ active: isActive }" :style="labelStyle">{{ props.label }}</label>
            <input
                v-model="inputValue"
                :type="props.type"
                :placeholder="props.placeholder"
                @input="handleInput"
                @focus="isActive = true"
                @blur="checkActive"
                :style="inputStyle"
            />
        </div>
        <span class="validation-message" v-if="validationMessage !== ''">{{ validationMessage }}</span>
    </main>
</template>

<script setup lang="ts">

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  modelValue: String,
  onInput: Function,
  color: {
    type: String,
    default: '#4ADE80',
  },
  label: String,
  rules: Array as () => Array<{ condition: (value: string) => boolean, message: string }>,
})

const isActive = ref(false);
const validationMessage = ref('');
const inputValue = ref(props.modelValue);

const emits = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
  if (props.onInput) {
    props.onInput(event);
  }
  const value = (event.target as HTMLInputElement).value;
  inputValue.value = value;
  validate(value);
  emits('update:modelValue', value);
};

const checkActive = () => {
  if (!inputValue.value) {
    isActive.value = false;
  }
};

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
  isActive.value = !!newValue;
});

const validate = (value: string) => {
  if (props.rules) {
    for (const rule of props.rules) {
      if (!rule.condition(value)) {
        validationMessage.value = rule.message;
        return;
      }
    }
  }
  validationMessage.value = '';
};

const labelStyle = computed(() => {
  return {
    color: props.color,
  };
});

const inputStyle = computed(() => {
  return {
    borderColor: props.color,
  };
});
</script>

<style scoped>
.input-container {
  position: relative;
  margin-bottom: 20px;
}
input {
  background: transparent;
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s;
}
input:focus {
  outline: none;
}
label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: all 0.2s ease;
  pointer-events: none;
  font-size: 16px;
  padding: 0 5px;
}
label.active {
  top: -10px;
  left: 0;
  font-size: 12px;
}
.validation-message {
  color: red;
  font-size: 12px;
  margin-top: -15px;
  display: block;
}
</style>
