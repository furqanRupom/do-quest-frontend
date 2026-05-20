import { ITimeSeriesAmount } from "@/types/dashboard.types"
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
  earningsData: ITimeSeriesAmount[] | null
  spendingData: ITimeSeriesAmount[] | null
}

const EarningsVsSpendingChart = ({ earningsData, spendingData }: Props) => {
  // Merge the two datasets by date
  const mergedData = new Map<string, { date: string; earnings?: number; spending?: number }>()

  earningsData?.forEach((item) => {
    mergedData.set(item.date, {
      date: item.date,
      earnings: item.amount,
    })
  })

  spendingData?.forEach((item) => {
    const existing = mergedData.get(item.date) || { date: item.date }
    mergedData.set(item.date, {
      ...existing,
      spending: item.amount,
    })
  })

  const formatted = Array.from(mergedData.values())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings vs Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={DarkTooltip} />
            <Legend />
            <Bar yAxisId="left" dataKey="earnings" fill="#22c55e" name="Earnings" />
            <Bar yAxisId="left" dataKey="spending" fill="#ef4444" name="Spending" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default EarningsVsSpendingChart
