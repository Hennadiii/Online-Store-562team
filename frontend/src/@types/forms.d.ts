export interface IloginFormInputs {
  email: string;
  password: string;
}

export interface iRegisterFormInputs extends IloginFormInputs {
  first_name: string;
  second_name: string;
  passwordConfirm: string;
}
