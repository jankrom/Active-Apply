import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"
import Image from "next/image"
import Feature from "@/components/feature"
import { Timer, Workflow } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { MdAutoFixHigh, MdMoneyOff, MdOutlineAttachMoney } from "react-icons/md"

export default async function Home() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isSignedIn = !user ? false : true

  return (
    <>
      <div className="mx-auto max-w-screen-xl w-full">
        <div className="flex justify-between px-2 pt-4">
          <Link href="/dashboard" className="hover:scale-105 transition">
            <Image
              width={200}
              height={400}
              alt="Active Apply logo"
              src="/active-apply-icon.svg"
            />
          </Link>
          <div className="flex items-center gap-x-2">
            <Link href={isSignedIn ? "/dashboard" : "/login"}>
              <Button variant="outline" className="rounded-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col h-full md:py-36 md:px-32 pt-11 pb-24 px-8
        w-full items-center text-center gap-12 bg-[#111827] text-gray-50"
      >
        <div className="flex flex-col gap-6 items-center">
          <Typography
            className="max-w-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#199cdf] to-[#26bef2]"
            variant="h1"
          >
            Apply Smarter, Not Harder
          </Typography>
          <Typography className="max-w-2xl" variant="h5">
            Make your job hunt more efficient and organized. Use a Chrome
            extension that tracks your applications with only 2 clicks.
          </Typography>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button size="tiny" variant="blue">
                {`Dashboard`}
              </Button>
            </Link>
            <a>
              <Button size="tiny" variant="secondary">
                {`Chrome Extension`}
              </Button>
            </a>
          </div>
          <video
            controls
            autoPlay
            muted
            className="w-full mt-8 rounded-lg border bg-black"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex flex-col md:pt-24 md:gap-36 gap-24 items-center">
          <div className="flex flex-col gap-12 items-center">
            <Typography className="max-w-2xl" variant="h1">
              Quickly apply, save time
            </Typography>
            <div className="flex md:flex-row flex-col gap-12">
              <Feature
                icon={<Timer size={24} />}
                headline="No more tab switching"
                description="Save 20-30 seconds per job application - no more tab switching to track jobs"
              />
              <Feature
                icon={<MdAutoFixHigh size={24} />}
                headline="Autofilling capabilities"
                description="Autofill job details in chrome extension with Pro. Track each application with only 2 clicks"
              />
              <Feature
                icon={<Workflow size={24} />}
                headline="Data security"
                description="We keep your data safe by taking top security measures."
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 max-w-2xl items-center">
            <Typography className="max-w-2xl" variant="h1">
              Pricing
            </Typography>
            <div className="flex md:flex-row flex-col gap-12">
              <div className="border border-gray-50 p-4 rounded-lg">
                <Feature
                  icon={<MdMoneyOff size={24} />}
                  headline="Free tier"
                  description="Save 20-30 seconds per job application - no more switching tabs to track jobs"
                />
              </div>
              <div className="bg-gradient-to-r from-[#0049bb] via-[#199cdf] to-[#26bef2] p-4 rounded-lg">
                <Feature
                  icon={<MdOutlineAttachMoney size={24} />}
                  headline="Pro tier - $3.99 / month"
                  description="Autofill job description and save an additional 20 seconds per job application. All it takes is 2 clicks to track a job"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 max-w-2xl items-center mb-16">
            <Typography className="max-w-2xl" variant="h1">
              Guide
            </Typography>
            <Typography className="max-w-2xl" variant="h5">
              1 - Login and make your first spreadsheet.
            </Typography>
            <Typography className="max-w-2xl" variant="h5">
              2 - Download the Active Apply{" "}
              <a href="" className="underline">
                chrome extension.
              </a>
            </Typography>
            <Typography className="max-w-2xl" variant="h5">
              3 - Open extension on a job application and fill in job details.
            </Typography>
            <Typography className="max-w-2xl" variant="h5">
              4 - Submit to your default spreadsheet.
            </Typography>
            <Typography className="max-w-2xl" variant="h5">
              5 - View your tracked jobs and keep applying!
            </Typography>
          </div>
        </div>
      </div>
    </>
  )
}
