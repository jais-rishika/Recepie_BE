export interface RegisterUserDTO {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface LoginUserDTO {
  userId: string;
  password: string;
}
