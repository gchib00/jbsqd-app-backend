export interface CountryName {
  common: string;
  official: string;
  nativeName?: unknown;
}
export interface UserObj {
  username: string;
  email: string;
  coins: number;
  password: string;
}
export interface UserRegistrationObj extends UserObj {
  repeatedPassword: string;
}
export interface UserLoginObj {
  username: string;
  password: string;
}