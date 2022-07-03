export interface User {
  id: string;
  username: string;
  email: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface LoginUser {
  user: User;
  access_token: string;
}
