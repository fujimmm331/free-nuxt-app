<template>
  <div class="radio">
    <div class="mr-1" v-for="data in props.datas" :key="data.value">
      <label class="label" :for="data.value" v-text="data.label" />
      <input
        class="rounded bg-gray-200"
        type="radio"
        :name="data.name"
        :id="data.value"
        :value="data.value"
      >
    </div>
  </div>
</template>
<script setup lang="ts">
  export type Radio = {
    name: string
    label: string
    value: string | number
  }

  type RadioProps = {
    datas: Radio[]
  }


  const props = defineProps<RadioProps>()

</script>
<style>
  .label {
    display: block;
  }
  .radio {
    display: flex;
  }
</style>