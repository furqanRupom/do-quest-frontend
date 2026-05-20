import { ITimeSeriesAmount } from "@/types/dashboard.types"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { DarkTooltip } from "./charts/DarkToolTip"

interface Props {
  data: ITimeSeriesAmount[]
}

const EarningsLineChart = ({ data }: Props) => {
  const formatted = data.map((d) => ({
    date: d.date,
    earnings: d.amount,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings</CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatted}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={DarkTooltip} />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#22c55e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default EarningsLineChart
