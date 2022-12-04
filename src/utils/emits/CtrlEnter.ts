import { SetupContext } from "@nuxtjs/composition-api";


/**
 * コマンドエンターを押したときに発火するイベント
 * @param e キーボードイベント
 */
export const handleCtrlEnter = (e: KeyboardEvent, context: SetupContext) => {
  if (!e.ctrlKey && !e.metaKey) return;
  context.emit('ctrl-enter')
}