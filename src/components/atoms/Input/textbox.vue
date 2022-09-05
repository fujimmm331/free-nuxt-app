<template>
  <div>
    <label class="label" :for="props.name" v-text="props.label" />
    <input class="rounded bg-gray-200" type="text" :name="props.name" :id="props.name">
  </div>
</template>
<script setup lang="ts">
  type TextBoxProps = {
    name: string
    label: string
  }

  const props = defineProps<TextBoxProps>()

</script>
<style>
  .label {
    display: block;
  }
</style>