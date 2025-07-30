import type { AxiosError } from "axios";

export class HttpClientError extends Error {
  #status: number;

  constructor(e: AxiosError) {
    super(e.message);
    this.#status = e.status ?? 418;
  }

  get status() {
    return this.#status;
  }
}
