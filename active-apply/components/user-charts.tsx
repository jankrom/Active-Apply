import Chart from "./chart"

interface Props {
  spreadsheets: {
    id: string
    userId: string
    name: string
    totalJobs: number
  }[]
}

const UserCharts = ({ spreadsheets }: Props) => {
  const totalJobs = spreadsheets.reduce(
    (sum, { totalJobs }) => sum + totalJobs,
    0
  )

  const data = {
    total_jobs: totalJobs,
    dashboards: spreadsheets,
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
    <div className="w-full flex gap-4">
      <Chart data={data} time={false} />
      <Chart data={data} time={true} />
    </div>
  )
}
export default UserCharts
