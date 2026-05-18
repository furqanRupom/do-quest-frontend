import {z} from "zod"


export const walletWithdrawSchema = z.object({
  amount:z.number()
})

export type IWalletWithdrawPayload = z.infer<typeof walletWithdrawSchema>
