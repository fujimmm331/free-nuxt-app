import { Nullable } from "@/types"
import { reactive, readonly, toRefs } from "vue"

type SelectionType = {
  element: Nullable<HTMLTextAreaElement | HTMLInputElement>
  selectionStart: Nullable<number>
  selectionEnd: Nullable<number>
}

export const useSelections = () => {
  const state = reactive<SelectionType>({
    element: null,
    selectionStart: null,
    selectionEnd: null,
  })


  /**
   * 対象のinput / textarea要素をセットする処理
   * @param element 対象の要素
   * @returns 
   */
  const setElement = (element: HTMLTextAreaElement | HTMLInputElement) => state.element = element

  /**
   * selectionStartの位置を更新する
   * @param start 開始位置
   * @returns 
   */
  const updateStart = (start: Nullable<number>) => state.selectionStart = start

  /**
   * selectionEndの位置を更新する
   * @param end 終了位置
   * @returns 
   */
  const updateEnd = (end: Nullable<number>) => state.selectionEnd = end

  /**
   * 要素のカーソル位置を設定する
   * @returns 
   */
  const setSelectionRange = () => state.element?.setSelectionRange(state.selectionStart, state.selectionEnd)

  const focus = () => state.element?.focus()

  return {
    selectionsState: readonly(state),
    updateStart,
    updateEnd,
    setElement,
    setSelectionRange,
    focus
  }
}