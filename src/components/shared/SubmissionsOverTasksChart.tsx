import { ITimeSeriesCount } from "@/types/dashboard.types"
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { DarkTooltip } from "./charts/DarkToolTip"

interface Props {
  submissionData: ITimeSeriesCount[] | null
  taskData: ITimeSeriesCount[] | null
}

const SubmissionsOverTasksChart = ({ submissionData, taskData }: Props) => {
  // Merge the two datasets by date
  const mergedData = new Map<string, { date: string; submissions?: number; tasks?: number }>()

  submissionData?.forEach((item) => {
    mergedData.set(item.date, {
      date: item.date,
      submissions: item.count,
    })
  })

  taskData?.forEach((item) => {
    const existing = mergedData.get(item.date) || { date: item.date }
    mergedData.set(item.date, {
      ...existing,
      tasks: item.count,
    })
  })

  const formatted = Array.from(mergedData.values())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submissions vs Tasks Created</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" label={{ value: "Submissions", angle: -90, position: "insideLeft" }} />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              label={{ value: "Tasks", angle: 90, position: "insideRight" }}
            />
            <Tooltip content={DarkTooltip} />
            <Legend />
            <Bar yAxisId="left" dataKey="submissions" fill="#6366f1" name="Submissions" />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="tasks" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Tasks Created"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default SubmissionsOverTasksChart
