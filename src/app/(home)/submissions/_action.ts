"use server"

import { getActionErrorMessage } from "@/lib/errorMessage"

export const getMyBountyAction = async () => {
  try {
    
  }
  catch(error) {
    return {
      success:false,
     message: getActionErrorMessage(error,"Something went wrong")
    }
  }
}
