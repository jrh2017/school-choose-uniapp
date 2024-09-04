export type RoleType = '' | '*' | 'user';
export interface UserState {
  activeCode?: string
  nickname?: string
  avatar?: string
  code?: string,
  id?: number,
  mobile?: string,
  openid?: string,
  registerTime?: string,
  status?: number,
}

export type providerType =
  | 'weixin'
  | 'qq'
  | 'sinaweibo'
  | 'xiaomi'
  | 'apple'
  | 'univerify'
  | undefined;
