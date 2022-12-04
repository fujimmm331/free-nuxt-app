<template>
  <div class="free-textarea">
    <v-textarea
      v-model="inputValue"
      ref="vTextarea"
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
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'
import { handleCtrlEnter } from '@/utils/emits/CtrlEnter'
import { VTextarea } from 'vuetify/lib'
import { useSelections } from '@/composable/atoms/FreeTextarea/useSelections'
import { Nullable } from '@/types/utils/nullable'

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
    const {
      selectionsState,
      updateStart,
      updateEnd,
      setElement,
      setSelectionRange,
      focus,
    } = useSelections()
    const vTextarea = ref<InstanceType<typeof VTextarea>>()
    const inputValue = computed({
      get: () => props.value,
      set: (value) => {
        context.emit('input', value || '')
      }, // clearableを押すとnullが入るので空文字にキャストする
    })

    // functions
    /**
     * selectionStart, endを更新する関数
     */
    const updateSelections = (selectionStart: number, selectionEnd: number) => {
      updateStart(selectionStart)
      updateEnd(selectionEnd)
    }

    /**
     * コントロールエンターで発火させるための関数
     */
    const onKeydown = (e: KeyboardEvent) => handleCtrlEnter(e, context)

    // expose functions
    /**
     * カーソル位置にテキストを挿入するための関数
     */
    const insertTexts = (insertText: string) => {
      if (!selectionsState.element) return
      
      const currentSelectionStart = selectionsState.element.selectionStart!
      const currentSelectionEnd = selectionsState.element.selectionEnd!

      // マウスなどでカーソルを変更したときに追えない可能性があるため、insert前に保存する
      updateSelections(currentSelectionStart, currentSelectionEnd)

      const beforeValue = `${inputValue.value.substring(
        0,
        selectionsState.selectionEnd!,
      )}`
      const afterValue = `${inputValue.value.substring(
        selectionsState.selectionEnd!,
        inputValue.value.length,
      )}`
      const newValue = `${beforeValue}${insertText}${afterValue}`
      inputValue.value = newValue

      focus()
      nextTick(() => {
        updateSelections(
          currentSelectionStart + insertText.length,
          currentSelectionEnd + insertText.length,
        )
        setSelectionRange()
      })
    }

    onMounted(() => {
      const element = vTextarea.value?.$el.querySelector('textarea')
      if (!element) return
      setElement(element)
    })

    return {
      inputValue,
      onKeydown,
      vTextarea,
      insertTexts,
    }
  },
})
</script>