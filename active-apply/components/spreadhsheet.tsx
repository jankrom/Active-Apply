import { ExternalLink } from "lucide-react"
import Link from "next/link"
import Chart from "./chart"

interface Props {
  spreadsheet:
    | { id: string; userId: string; name: string; totalJobs: number }
    | null
    | undefined
}

const Spreadhsheet = ({ spreadsheet }: Props) => {
  const data = {
    total_jobs: spreadsheet?.totalJobs,
    dashboards: [spreadsheet],
  } as {
    total_jobs: number
    dashboards: {
      id: string
      userId: string
      name: string
      totalJobs: number
    }[]
  }

  return (
    <div className="mb-3">
      <section className="bg-gradient-to-tr from-[#0059bb] via-[#0c7acd] to-[#199cdf] text-white shadow-sm max-w-[42rem] border border-black/5 rounded-xl overflow-hidden sm:pr-8 relative  hover:bg-gray-200 transition">
        <div className="p-4 flex flex-col">
          <h3 className="text-2xl font-semibold flex gap-2">
            {spreadsheet?.name}{" "}
            <div className="flex gap-2">
              <Link
                className="text-gray-700 flex items-center gap-2 text-[1.2rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer dark:text-white/60"
                href={`/spreadsheet/${spreadsheet?.id}`}
                target="_blank"
              >
                <ExternalLink />
              </Link>
            </div>
          </h3>
          <div className="w-full flex gap-4">
            <Chart data={data} time={false} />
            <Chart data={data} time={true} />
          </div>
        </div>
      </section>
    </div>
  )
}
export default Spreadhsheet
