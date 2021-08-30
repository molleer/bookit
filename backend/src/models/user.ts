export interface User {
  cid: string;
  phone?: string;
  is_admin: boolean;
  groups: string[];
  accessToken: string;
}
