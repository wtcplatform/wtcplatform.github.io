/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SjnLID15jwa
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import React from "react"
import { Package2Icon } from "@/components/ui/icons"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div key="1" className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
          <Package2Icon className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
          wtc所沢コート予約システム
        </Link>
      </header>
      { children }
    </div>
  )
}

