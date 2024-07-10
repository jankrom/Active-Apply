import { SettingsIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">
        <div className="flex justify-between px-2 pt-4">
          <Link href="/dashboard" className="hover:scale-105 transition">
            <Image
              width={200}
              height={400}
              alt="Active Apply logo"
              src="/active-apply-icon.svg"
            />
          </Link>
          <Link
            href="/settings"
            className="text-gray-400 hover:scale-110 hover:text-white transition"
          >
            <SettingsIcon />
          </Link>
        </div>
        {children}
      </div>
    </main>
  )
}
export default DashboardLayout
