import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { AuthManager } from "../entity/AuthManager.ts";

type Method = "get" | "post" | "put" | "delete" | "patch";

export interface Endpoint {
  url: string;
  method: Method;
  params?: object;
  data?: object;
}

export interface Payload {
  endpoint: Endpoint;
  config?: AxiosRequestConfig;
}

export interface HttpClientResponse<T> {
  data: T;
  status: number;
}

export class HttpClient {
  #axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.#axiosInstance = axios.create({
      baseURL: baseURL,
    });
    this.#setupResponseInterceptor();
  }

  #setupResponseInterceptor() {
    this.#axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        /* 토큰이 유효하지 않은 경우 */
        if (error.status === 403) {
        }

        return Promise.reject(error);
      },
    );
  }

  async #getAuthorizationHeader() {
    const accessToken = AuthManager.getAccessToken();

    if (!AuthManager.validateAccessToken(accessToken)) {
      throw new Error("There is no Access Token");
    }

    return {
      headers: {
        Authorization: `KakaoAK ${accessToken}`,
      },
    };
  }

  async #request(
    payload: Payload,
    noAuth: boolean,
    signal?: AbortSignal,
  ): Promise<AxiosResponse> {
    const { endpoint, config } = payload;
    const { url, method } = endpoint;
    const headers = noAuth ? {} : await this.#getAuthorizationHeader();

    return this.#axiosInstance.request({
      url,
      method,
      data: endpoint.data,
      params: endpoint.params,
      ...config,
      ...headers,
      signal,
    });
  }

  async request<T>(
    payload: Payload,
    noAuth = false,
    signal?: AbortSignal,
  ): Promise<HttpClientResponse<T>> {
    const response = await this.#request(payload, noAuth, signal);

    return {
      data: response.data,
      status: response.status,
    };
  }
}
