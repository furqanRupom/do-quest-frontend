import { ITimeSeriesCount } from "@/types/dashboard.types"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { DarkTooltip } from "./charts/DarkToolTip"

interface Props {
  data: ITimeSeriesCount[]
}

const SubmissionsBarChart = ({ data }: Props) => {
  const formatted = data.map((d) => ({
    date: d.date,
    submissions: d.count,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submissions</CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip content={DarkTooltip}/>
            <Bar dataKey="submissions" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default SubmissionsBarChart
