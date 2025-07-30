import { identity, isNonEmptyStr } from "@einere/common-utils";

export class AuthManager {
  static getAccessToken() {
    return import.meta.env.VITE_KAKAO_API_KEY;
  }

  // NOTE: 클라이언트에서 별도로 검증할 것이 없음
  static validateAccessToken(accessToken: string | null) {
    return isNonEmptyStr(accessToken);
  }

  // NOTE: refresh API 가 있다면 활용 가능
  static refreshAccessToken(refreshToken: string | null) {
    return identity(refreshToken);
  }
}
