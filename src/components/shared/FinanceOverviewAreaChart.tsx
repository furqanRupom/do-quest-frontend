import { IFinanceOverviewResponse } from "@/types/dashboard.types"
import {
  AreaChart,
  Area,
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
  earningsData: IFinanceOverviewResponse["earnings"] | null
  spendingData: IFinanceOverviewResponse["spending"] | null
}

const FinanceOverviewAreaChart = ({ earningsData, spendingData }: Props) => {
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
          <AreaChart data={formatted}>
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={DarkTooltip} />
            <Legend />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#colorEarnings)"
              name="Earnings"
            />
            <Area
              type="monotone"
              dataKey="spending"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorSpending)"
              name="Spending"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default FinanceOverviewAreaChart
