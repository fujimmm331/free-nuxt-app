import { Context } from "@nuxt/types";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { keyValueObject } from "~/models/keyValue.model";

/**
 * APIの実行を行うクラス。axiosをラップし、正常時はデータを返却、異常時はerror.vueへ描画する
 */
export default class UseCase {
  _axios: NuxtAxiosInstance
  _context: Context

  constructor(axios: NuxtAxiosInstance, context: Context) {
    this._axios = axios
    this._context = context
  }

  /**
   * GETの処理を行う
   * @param path APIのパス
   * @param params パラメータ
   */
  async get(path: string, params: keyValueObject = {} ) {
    const response = await this._axios.get(path, params)
      .catch((error) => {
        this._context.error({
          statusCode: error.response.status,
          message: '失敗'
        })
      })
    return response
  }
}