import { Nullable } from "@/types"
import { reactive, readonly, toRefs } from "vue"

type SelectionType = {
  selectionStart: Nullable<number>
  selectionEnd: Nullable<number>
}

export const useSelections = () => {
  const state = reactive<SelectionType>({
    selectionStart: null,
    selectionEnd: null,
  })

  const updateStart = (start: Nullable<number>) => state.selectionStart = start
  const updateEnd = (end: Nullable<number>) => state.selectionEnd = end

  return {
    ...toRefs(state),
    updateStart,
    updateEnd,
  }
}