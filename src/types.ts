export interface CountryName {
  common: string;
  official: string;
  nativeName?: unknown;
}
export interface UserObj {
  username: string;
  email: string;
  password: string;
}
export interface UserRegistrationObj extends UserObj {
  repeatPassword: string;
}
export interface UserLoginObj {
  username: string;
  password: string;
}