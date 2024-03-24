import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// extend data of Firestore
// 
// 1. #rights 2.expire_at 3.penalty(optional)
// probably this is fine  

