import { Context } from "@nuxt/types";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { keyValueObject } from "../models/keyValue.model"; 

/**
 * APIの実行を行うクラス。axiosをラップし、正常時はデータを返却、異常時はerror.vueへ描画する
 */
export default class BaseUseCase {
  _axios: NuxtAxiosInstance
  _context: Context

  readonly basePath = 'https://sample.com/api/v1'

  constructor(axios: NuxtAxiosInstance, context: Context) {
    this._axios = axios
    this._context = context
  }

  /**
   * GETの処理を行う
   * @param endPoint APIのパス
   * @param params パラメータ
   */
  async get(endPoint: string, params: keyValueObject = {} ) {
    const response = await this._axios.get(this.basePath + endPoint, params)
      .catch((error) => {
        throw new Error(error);
      })
    return response
  }
}