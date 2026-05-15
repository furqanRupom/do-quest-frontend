"use server"

import { getActionErrorMessage } from "@/lib/errorMessage"
import { getBountyAndTaskById } from "@/services/bounty.service"

export const getBountyDetailsAction = async (id:string) => {
  if(!id) {
    return {
      success:false,
      message:"Invalid id format or id not found"
    }
  }
   try {
     return await getBountyAndTaskById(id)
   }
   catch(error){
     return {
       success:false,
       message: getActionErrorMessage(error,"Something went wrong")
     }
   }
}
