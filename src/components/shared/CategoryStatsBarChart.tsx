import { ICategoryStatsGraphResponse } from "@/types/dashboard.types"
import {
  BarChart,
  Bar,
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
  data: ICategoryStatsGraphResponse | null
}

const CategoryStatsBarChart = ({ data }: Props) => {
  const formatted = data?.map((item) => ({
    category: item.category || "Unknown",
    count: item.count || 0,
  })) || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={formatted} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="category" 
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis />
            <Tooltip content={DarkTooltip} />
            <Legend />
            <Bar dataKey="tasks" fill="#3b82f6" name="Tasks" />
            <Bar dataKey="submissions" fill="#6366f1" name="Submissions" />
            <Bar dataKey="earnings" fill="#22c55e" name="Earnings" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default CategoryStatsBarChart
