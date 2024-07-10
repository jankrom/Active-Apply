import Chart from "./chart"

const UserCharts = () => {
  const data = {
    total_jobs: 100,
    dashboards: [
      { name: "Fall Season", amount: 50 },
      { name: "Spring Season", amount: 18 },
      { name: "Summer Season", amount: 24 },
    ],
  }

  return (
    <div className="w-full flex gap-4">
      <Chart data={data} time={false} />
      <Chart data={data} time={true} />
    </div>
  )
}
export default UserCharts
