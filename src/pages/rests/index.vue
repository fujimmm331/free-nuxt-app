<template>
  <div>rests is running</div>
</template>

<script lang="ts">
import Vue from 'vue'
import UseCase from '@/usecases/usecase'

export default Vue.extend({
  name: 'Rests',
  async asyncData(context) {
    console.log('start')
    const usecase = new UseCase(context.$axios, context)
    console.log('created usecase instance')
    const hoge = await usecase.get('/products')
    console.log('hoge', hoge)
  }
})
</script>
