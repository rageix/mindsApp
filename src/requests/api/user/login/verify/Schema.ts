export interface ILoginVerifyRequest {
  key: string;
  code: string;
}

export interface ILoginVerifyResponse {
  accessToken: string;
}