"use server"

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
     console.log("Error while fetching bounty details :",error)
     throw error
   }
}
