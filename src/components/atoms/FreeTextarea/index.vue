<template>
  <div class="free-textarea">
    <v-textarea
      v-model="inputValue"
      ref="textarea"
      :disabled="$props.disabled"
      :append-icon="$props.appendIcon"
      :auto-grow="$props.autoGrow"
      :clearable="$props.clearable"
      :readonly="$props.readonly"
      @keydown="onKeydown"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import { handleCtrlEnter } from '@/utils/emits/CtrlEnter'
import { VTextarea } from 'vuetify/lib'
import { useSelections } from '@/composable/atoms/FreeTextarea/useSelections'

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
    const { selectionStart, selectionEnd, updateStart, updateEnd } =
      useSelections()
    const textarea = ref<InstanceType<typeof VTextarea>>()
    const inputValue = computed({
      get: () => props.value,
      set: (value) => {
        context.emit('input', value || '')
        const input = textarea.value?.$el.querySelector('textarea')
        if (input) {
          updateStart(input.selectionStart)
          updateEnd(input.selectionEnd)
        }
      }, // clearableを押すとnullが入るので空文字にキャストする
    })

    const onKeydown = (e: KeyboardEvent) => handleCtrlEnter(e, context)

    // 外部からテキストを挿入するための関数
    const insertTexts = (insertText: string) => {
      const beforeValue = `${inputValue.value.substring(
        0,
        selectionEnd.value!,
      )}`
      const afterValue = `${inputValue.value.substring(
        selectionEnd.value!,
        inputValue.value.length,
      )}`
      const newValue = `${beforeValue}${insertText}${afterValue}`
      inputValue.value = newValue
    }
    return {
      inputValue,
      onKeydown,
      textarea,
      selectionStart,
      selectionEnd,
      insertTexts,
    }
  },
})
</script>