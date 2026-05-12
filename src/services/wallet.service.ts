"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { IWallet } from "@/types/wallet.types"


export async function retrieveWalletTransactions(queryString:string){
  try {
    return await httpClient.get(
      queryString ? `/wallet/transactions${queryString}` : '/wallet/transactions'
    )
    
  }
  catch(error){
    console.log("Error while retrieving wallet transactions data", error)
    console.error(error)
  }
}
export async function getMyWallet(){
  try {
    return await httpClient.get<IWallet>('/wallet')
    
  }
  catch(error){
    console.log("Error while retrieving wallet data", error)
    console.error(error)
  }
}
