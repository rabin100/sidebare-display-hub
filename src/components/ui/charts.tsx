
import * as React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "./chart";

interface ChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number | string) => string;
  yAxisWidth?: number;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#f97316", "#8b5cf6", "#06b6d4"],
  valueFormatter = (value: number | string) => value.toString(),
  yAxisWidth = 40,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showGrid = true,
}: ChartProps) {
  const config = React.useMemo(() => {
    return categories.reduce(
      (acc, category, i) => ({
        ...acc,
        [category]: {
          label: category,
          color: colors[i % colors.length],
        },
      }),
      {}
    );
  }, [categories, colors]);

  return (
    <ChartContainer config={config}>
      <RechartsBarChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        {showXAxis && <XAxis dataKey={index} />}
        {showYAxis && (
          <YAxis
            width={yAxisWidth}
            tickFormatter={(value) => valueFormatter(value)}
          />
        )}
        {showTooltip && (
          <Tooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                formatter={(value) => valueFormatter(value)}
              />
            )}
          />
        )}
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#f97316", "#8b5cf6", "#06b6d4"],
  valueFormatter = (value: number | string) => value.toString(),
  yAxisWidth = 40,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showGrid = true,
}: ChartProps) {
  const config = React.useMemo(() => {
    return categories.reduce(
      (acc, category, i) => ({
        ...acc,
        [category]: {
          label: category,
          color: colors[i % colors.length],
        },
      }),
      {}
    );
  }, [categories, colors]);

  return (
    <ChartContainer config={config}>
      <RechartsLineChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        {showXAxis && <XAxis dataKey={index} />}
        {showYAxis && (
          <YAxis
            width={yAxisWidth}
            tickFormatter={(value) => valueFormatter(value)}
          />
        )}
        {showTooltip && (
          <Tooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                formatter={(value) => valueFormatter(value)}
              />
            )}
          />
        )}
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            activeDot={{ r: 8 }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}

export function PieChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#f97316", "#8b5cf6", "#06b6d4"],
  valueFormatter = (value: number | string) => value.toString(),
  showLegend = true,
  showTooltip = true,
}: Omit<ChartProps, "yAxisWidth" | "showXAxis" | "showYAxis" | "showGrid">) {
  const config = React.useMemo(() => {
    return data.reduce(
      (acc, item, i) => ({
        ...acc,
        [item[index]]: {
          label: item[index],
          color: colors[i % colors.length],
        },
      }),
      {}
    );
  }, [data, index, colors]);

  return (
    <ChartContainer config={config}>
      <RechartsPieChart>
        {showTooltip && (
          <Tooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                formatter={(value) => valueFormatter(value)}
              />
            )}
          />
        )}
        {showLegend && <Legend />}
        <Pie
          data={data}
          nameKey={index}
          dataKey={categories[0]}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  );
}
