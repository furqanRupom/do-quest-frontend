import { ISubmissionStatusGraphResponse } from "@/types/dashboard.types"
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { DarkTooltip } from "./charts/DarkToolTip"

interface Props {
  data: ISubmissionStatusGraphResponse | null
}

const SubmissionStatusPieChart = ({ data }: Props) => {
  const COLORS: Record<string, string> = {
    PENDING: "#f59e0b",
    APPROVED: "#10b981",
    REJECTED: "#ef4444",
    REVISION_REQUESTED: "#3b82f6",
    EXPIRED: "#6b7280",
  }

  const formatted = data?.map((item) => ({
    name: item._id || "Unknown",
    value: item.count || 0,
  })) || []

  const getColor = (name: string) => {
    return COLORS[name] || "#6366f1"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submission Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={formatted}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {formatted.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
              ))}
            </Pie>
            <Tooltip content={DarkTooltip} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default SubmissionStatusPieChart
