<template>
  <div class="contact-page">
    <h2 style="color: whitesmoke;">{{ $t('contact_me') }}</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <Input :label="$t('name')" v-model="form.name" />
      </div>

      <div class="form-group">
        <Input label="E-mail" v-model="form.email" />
      </div>

      <div class="form-group">
        <Input :label="$t('message')" v-model="form.message" />
      </div>

      <Button :label="$t('submit')" type="Submit" :loading="isSending"></Button>
    </form>

    <div class="whatsapp">
      <a
        :href="`https://wa.me/${phone}?text=${form.message}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MdiIcon icon="mdiWhatsapp" />
        {{ $t('contact_me_wpp') }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const phone = '+5541984759815'
const isSending = ref(false)

const submitForm = () => {
  isSending.value = true
  setTimeout(() => {
    isSending.value = false
    alert(t('error_contact'))
  }, 2000)
}
</script>

<style scoped>
.contact-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.whatsapp {
  position: fixed;
  bottom: 60px;
  right: 60px;
}

.whatsapp a {
  color: #25d366;
  font-weight: bold;
  text-decoration: none;
}

.whatsapp a:hover {
  text-decoration: underline;
}
</style>
