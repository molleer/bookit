export interface User {
  cid: string;
  phone?: string;
  authorities: string[];
  groups: string[];
  accessToken: string;
}
