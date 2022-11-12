<template>
  <v-textarea v-model="inputValue" />
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

type PropsType = {
  value: string
}

export default defineComponent({
  props: {
    value: { type: String, required: true },
  },
  setup(props: PropsType, context) {
    const inputValue = computed({
      get: () => props.value,
      set: (value) => context.emit('input', value),
    })

    return {
      inputValue,
    }
  },
})
</script>