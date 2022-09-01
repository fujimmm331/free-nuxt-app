<template>
  <div>{{fuga}}</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const hoge = reactive({
  text: 'ほげ',
})

const fuga = ref(0)


</script>
