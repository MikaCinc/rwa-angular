import { UserTypeEnum } from "../enums";
import { Pitanje } from "./pitanje";

export interface User {
  id: string;
  username: string;
  email: string;
  type: UserTypeEnum;
  favourites: Pitanje[];
  dateCreated: string;
  dateUpdated: string;
}

export interface LoginUser {
  user: User;
  access_token: string;
}
