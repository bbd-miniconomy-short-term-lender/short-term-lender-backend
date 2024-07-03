export type DebitOrderPost = {
    amountInMibiBBDough: number,
    personaId: number,
    dayInMonth: number,
    endsAt: string,
    recepient: {
      bankId: number,
      accountId: string
    }
  }
  