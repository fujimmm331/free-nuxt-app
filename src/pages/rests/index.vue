<template>
  <div>rests is running</div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductsUseCase from '@/usecases/products.usecase'

export default Vue.extend({
  name: 'Rests',
  async asyncData(context) {
    const usecase = new ProductsUseCase(context.$axios, context)
    const hoge = await usecase.getProducts()
    console.log('hoge', hoge)
  }
})
</script>
