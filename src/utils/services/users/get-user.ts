import AxiosClient from "../axios-client";

export default class UserClient extends AxiosClient {
  async getUser(id: number) {
    return await this.get<User>(`/user/${id}`)
  }
}