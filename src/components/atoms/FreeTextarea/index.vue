<template>
  <v-textarea v-model="inputValue" @keydown="onKeydown" />
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { handleCtrlEnter } from '@/utils/emits/CtrlEnter'

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

    const onKeydown = (e: KeyboardEvent) => handleCtrlEnter(e, context)

    return {
      inputValue,
      onKeydown,
    }
  },
})
</script>