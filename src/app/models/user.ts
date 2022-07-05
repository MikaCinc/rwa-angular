import { UserTypeEnum } from "../enums";

export interface User {
  id: string;
  username: string;
  email: string;
  type: UserTypeEnum;
  dateCreated: string;
  dateUpdated: string;
}

export interface LoginUser {
  user: User;
  access_token: string;
}
