<script setup lang="ts">
import Textbox from '@/components/atoms/Input/textbox.vue';
import Radio, { Radio as RadioType } from '../../components/atoms/Input/radio.vue';

const form = {
  email: '',
  name: '',
  sex: null,
}
const radioDatas: RadioType[] = [
  {
    name: 'sex',
    value: 1,
    label: '男'
  },
  {
    name: 'sex',
    value: 2,
    label: '女'
  },
  {
    name: 'sex',
    value: 3,
    label: 'その他'
  },
]

const onSubmit = () => {
  console.log('submit!')
}
</script>

<template>
  <div class="p-2">
    <p>forms page is running</p>
    <form @submit="onSubmit">
      <Textbox v-model="form.name" class="mb-1" :name='"name"' :label='"氏名"' />
      <Textbox v-model="form.email" class="mb-1" :name='"email"' :label='"メールアドレス"' />
      <Radio v-model="form.sex" :datas='radioDatas'/>
    </form>
  </div>
</template>