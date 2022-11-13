<template>
  <v-textarea
    v-model="inputValue"
    :disabled="$props.disabled"
    :append-icon="$props.appendIcon"
    :auto-grow="$props.autoGrow"
    :clearable="$props.clearable"
    :readonly="$props.readonly"
    @keydown="onKeydown"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { handleCtrlEnter } from '@/utils/emits/CtrlEnter'

type PropsType = {
  value: string
  disabled: boolean
}

export default defineComponent({
  props: {
    value: { type: String, required: true },
    disabled: { type: Boolean, required: false, default: false },
    appendIcon: { type: String, required: false },
    autoGrow: { type: Boolean, required: false, default: false },
    clearable: { type: Boolean, required: false, default: true },
    readonly: { type: Boolean, required: false, default: false },
  },
  setup(props: PropsType, context) {
    const inputValue = computed({
      get: () => props.value,
      set: (value) => context.emit('input', value || ''), // clearableを押すとnullが入るので空文字にキャストする
    })

    const onKeydown = (e: KeyboardEvent) => handleCtrlEnter(e, context)

    return {
      inputValue,
      onKeydown,
    }
  },
})
</script>