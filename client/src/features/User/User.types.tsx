export interface AccountType {
  email: string,
  id: number,
  name: string,
}
export interface SignupType {
  needsVerification: boolean
  id: number,
  email?: string,
  name?: string,
}
export interface ForgotType {
  email: string
}

export interface DepositWithdrawType {
  amount: number,
}

export interface LoginInputType {
  email: string,
  password: string,
}

export interface SignupInputType {
  name: string,
  email: string,
  password: string,
  skipVerification: boolean,
}

export interface ResetInputType {
  token: string,
  password: string,
  confirmPassword: string,
}
