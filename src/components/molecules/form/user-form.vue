<script setup lang="ts">
import { reactive, ref } from 'vue';
import { email, required } from '@/utils/validations/index'
import { Nullable } from '@/types';

type VFormType = {
  validate: () => void
  reset: () => void
  resetValidation: () => void
}

const state = reactive({
  form: {
    email: null,
    name: null,
    sex: null,
  }
})

const forms = ref<Nullable<VFormType>>(null)

const onSubmit = () => {
  console.log('forms', forms.value)
  const validateResult = forms.value?.validate()
  if (!validateResult) return

  console.log('submit!', validateResult)
}
</script>
  
<template>
  <div>
    <v-form ref="forms" @submit.prevent="onSubmit">
      <v-text-field v-model="state.form.name" label="ユーザー名" :rules=[required] required />
      <v-text-field v-model="state.form.email" :rules="[email, required]" label="メールアドレス" />
      <v-radio-group v-model="state.form.sex">
        <v-radio label="男" :value=1 />
        <v-radio label="女" :value=2 />
        <v-radio label="その他" :value=3 />
      </v-radio-group>

      <v-btn v-text='"送信"' color="primary" elevation="2" @click="onSubmit" />
    </v-form>
  </div>
</template>