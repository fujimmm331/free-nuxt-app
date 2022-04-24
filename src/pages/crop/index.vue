<template>
  <div>
    {{ text }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'crop',
  data: () => ({
    text: 'crop page is running',
  })
})
</script>
