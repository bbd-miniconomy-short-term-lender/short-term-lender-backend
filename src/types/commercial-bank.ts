export type LoanApplication = {
  amount: number;
  accountName: string;
  type: string;
}

export type AccountBalanceResponse = {
  status: number,
  data: {
    accountName: string,
    accountBalance: number
  },
  message: string
}
