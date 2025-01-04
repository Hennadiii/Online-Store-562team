export interface IloginFormInputs {
  email: string;
  password: string;
}

export interface IregisterFormInputs extends IloginFormInputs {
  first_name: string;
  second_name: string;
  passwordConfirm: string;
}

export type IrestorePasswordInputs = Pick<IloginFormInputs, "email">;
