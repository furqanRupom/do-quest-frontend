import { ITimeSeriesCount } from "@/types/dashboard.types"
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
  data: ITimeSeriesCount[]
}

const TaskLineChart = ({ data }: Props) => {
  const formatted = data.map((d) => ({
    date: d.date,
    tasks: d.count,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks Created</CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatted}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip content={DarkTooltip} />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default TaskLineChart
