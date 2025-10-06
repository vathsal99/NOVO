"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ErrorBar,
} from "recharts";
import { TrendingUp, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ---------------------- Types ----------------------
interface ProgressData {
  date: string;
  overall: number;
  percentChange?: number; // % change vs baseline or previous
  error?: number;
}

// ---------------------- Utils ----------------------
const computeProgressData = (
  data: ProgressData[],
  compareMode: "previous" | "first" = "previous"
): ProgressData[] => {
  return data.map((point, index) => {
    if (index === 0) {
      return { ...point, percentChange: 0, error: 0 };
    }
    const ref =
      compareMode === "previous" ? data[index - 1].overall : data[0].overall;
    // Calculate percentage points change (absolute difference)
    const change = point.overall - ref;
    return {
      ...point,
      percentChange: Number(change.toFixed(1)),
      error: Math.abs(change) * 0.1,
    };
  });
};

// Risk Levels
function getRiskLevel(score: number): "Low" | "Moderate" | "High" {
  if (score >= 70) return "High";
  if (score >= 40) return "Moderate";
  return "Low";
}

// Map risk to Tailwind colors
function getRiskColor(level: "Low" | "Moderate" | "High"): string {
  switch (level) {
    case "Low":
      return "text-green-600";
    case "Moderate":
      return "text-yellow-600";
    case "High":
      return "text-red-600";
  }
}

// ---------------------- Mock Data ----------------------
const rawData: ProgressData[] = [
  { date: "8/18/2025", overall: 48 },
  { date: "8/19/2025", overall: 38 },
  { date: "8/21/2025", overall: 48 },
  { date: "8/25/2025", overall: 55 },
  { date: "8/29/2025", overall: 51 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { overall, percentChange } = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow text-sm">
        <p>
          <strong>{label}</strong>
        </p>
        <p>Overall: {overall} %</p>
        {percentChange !== undefined && (
          <p
            className={
              percentChange >= 0 ? "text-green-600" : "text-red-600"
            }
          >
            Change: {percentChange > 0 ? "+" : ""}
            {percentChange.toFixed(1)} %
          </p>
        )}
      </div>
    );
  }
  return null;
};

// ---------------------- Main Component ----------------------
interface PersonalProgressChartProps {
  progressData?: { date: string; overall: number; }[];
}

export const PersonalProgressChart = ({ progressData: externalData }: PersonalProgressChartProps) => {
  const [selectedPoint, setSelectedPoint] = useState<ProgressData | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Use external data if provided, otherwise use mock data
  const rawDataToUse = externalData?.length ? 
    externalData.map(item => ({ date: item.date, overall: item.overall })) : 
    rawData;
  
  const progressData = computeProgressData(rawDataToUse, "previous");

  const handlePointClick = (index: number) => {
    setSelectedPoint(progressData[index]);
    setShowDetails(true);
  };

  const CustomDot = (props: any) => {
    const { cx, cy, index } = props;
    return (
      <g>
        {/* Invisible larger circle for better click area */}
        <circle
          cx={cx}
          cy={cy}
          r={15}
          fill="transparent"
          style={{ cursor: "pointer" }}
          onClick={() => handlePointClick(index)}
        />
        {/* Visible dot */}
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="#6366f1"
          stroke="#fff"
          strokeWidth={1.5}
          style={{ cursor: "pointer" }}
          onClick={() => handlePointClick(index)}
        />
      </g>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          My Progress Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        {progressData.length > 0 ? (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={progressData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="overall"
                  stroke="#6366f1"
                  strokeWidth={2}
                  name="Overall"
                  dot={<CustomDot />}
                >
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-96 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="mb-4">No assessment data available yet.</p>
              <Button
                className="bg-teal-500 hover:bg-teal-600"
                onClick={() => (window.location.href = "/assessment")}
              >
                Take Your First Assessment
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      {/* ------------------ Details Dialog ------------------ */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          {selectedPoint && (
            <>
              <div className="p-6">
                <DialogHeader className="mb-4">
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <Info className="w-5 h-5 text-blue-500" />
                    Assessment Details
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{selectedPoint.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Score %</p>
                  <p className="font-semibold">{selectedPoint.overall}</p>
                </div>
                {selectedPoint.percentChange !== undefined &&
                  selectedPoint.percentChange !== 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Change
                      </p>
                      <p
                        className={
                          selectedPoint.percentChange >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {selectedPoint.percentChange > 0 ? "+" : ""}
                        {selectedPoint.percentChange} %
                      </p>
                    </div>
                  )}
              </div>

              {/* Show history till this point */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Progress History:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {progressData
                    .filter((p) => p.date <= selectedPoint.date)
                    .map((p, idx) => {
                      const risk = getRiskLevel(p.overall);
                      return (
                        <li key={p.date}>
                          {p.date}:{" "}
                          <span className="font-semibold">{p.overall}</span>
                          {idx > 0 && (
                            <span
                              className={
                                p.percentChange! >= 0
                                  ? "ml-2 text-blue-600"
                                  : "ml-2 text-gray-500"
                              }
                            >
                               ({p.percentChange! > 0 ? "+" : ""}
                               {p.percentChange})
                            </span>
                          )}
                          <span
                            className={`ml-2 font-medium ${getRiskColor(
                              risk
                            )}`}
                          >
                            [{risk}]
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>

              {/* Risk note for this assessment */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Assessment Notes:</h4>
                <p
                  className={`text-sm font-semibold ${getRiskColor(
                    getRiskLevel(selectedPoint.overall)
                  )}`}
                >
                  Risk Level:{" "}
                  {getRiskLevel(selectedPoint.overall)}
                </p>
              </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDetails(false)}
                  className="border-gray-300"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

// ---------------------- Usage Example ----------------------
// <PersonalProgressChart />
