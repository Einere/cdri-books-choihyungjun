import { identity, isNonEmptyStr } from "@einere/common-utils";

export class AuthManager {
  static getAccessToken() {
    return import.meta.env.VITE_KAKAO_API_KEY;
  }

  static validateAccessToken(accessToken: string | null) {
    return isNonEmptyStr(accessToken);
  }

  // NOTE: refresh API 가 있다면 활용 가능
  static refreshAccessToken(refreshToken: string | null) {
    return identity(refreshToken);
  }
}
