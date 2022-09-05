
/**
 * メールアドレスバリデーション
 */
export const email = (value: string) => {
  return !value || /.+@.+/.test(value) || `@を入れて再度入力し直してください。`
}