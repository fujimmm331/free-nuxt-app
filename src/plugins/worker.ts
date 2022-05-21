import { worker } from "~/mocks/browser"
/**
 * MSWを起動させる定義ファイル
 */
export default () => {
  if (process.env.NODE_ENV === 'development') {
    worker.start()
  }
}