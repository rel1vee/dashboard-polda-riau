"use client";

import { Polsek } from "@/types";
import { Building2, Home, Target, Map } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Label,
  Tooltip,
  Cell,
} from "recharts";

interface PolsekDetailProps {
  polsek: Polsek | null;
  isOpen: boolean;
  onClose: () => void;
}

const PolsekDetail: React.FC<PolsekDetailProps> = ({
  polsek,
  isOpen,
  onClose,
}) => {
  if (!polsek) return null;

  const totalTarget =
    polsek.villages?.reduce(
      (total, village) => total + (village.target || 0),
      0
    ) || 0;

  const totalAchievement =
    polsek.villages?.reduce(
      (total, village) => total + (village.achievement || 0),
      0
    ) || 0;

  const pieChartData = [
    { name: "Total Capaian", value: totalAchievement },
    {
      name: "Target Belum Tercapai",
      value: Math.max(0, totalTarget - totalAchievement),
    },
  ];

  const COLORS = ["#4caf50", "#f5f5f5"];

  const achievementPercentage =
    totalTarget > 0 ? Math.round((totalAchievement / totalTarget) * 100) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-5xl max-h-[95%] w-[95%] overflow-y-auto p-0 rounded-lg border-0 shadow-lg">
        <DialogHeader className="bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-medium flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              {polsek.name}
            </DialogTitle>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 hover:bg-gray-100 transition-colors"
            ></button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="villages">Daftar Desa</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="p-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="items-center">
                  <CardTitle className="text-sm font-medium">
                    Capaian Polsek
                  </CardTitle>
                  <CardDescription>Target dan Capaian Total</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      {payload[0].name}
                                    </span>
                                    <span className="font-bold text-muted-foreground">
                                      {(
                                        Number(payload[0]?.value) ?? 0
                                      ).toLocaleString("id-ID", {
                                        maximumFractionDigits: 2,
                                      })}{" "}
                                      Ha
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Pie
                          data={pieChartData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={75}
                          outerRadius={100}
                          strokeWidth={5}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-3xl font-bold"
                                    >
                                      {achievementPercentage}%
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground text-sm"
                                    >
                                      Capaian
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  {/* Legend Section */}
                  <div className="w-full grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: COLORS[0] }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Total Capaian
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {totalAchievement.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: COLORS[1] }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Target Belum Tercapai
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {Math.max(
                          0,
                          totalTarget - totalAchievement
                        ).toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                  </div>
                  {/* Summary Section */}
                  <div className="w-full grid grid-cols-1 gap-2 pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          Total
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {totalAchievement.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        dari{" "}
                        {totalTarget.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Map className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          Persentase Capaian
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {achievementPercentage}%
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Villages Tab */}
          <TabsContent value="villages" className="p-6">
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="p-4 border-b bg-blue-50 flex justify-between items-center">
                <h3 className="text-blue-700 font-medium">
                  Daftar Desa di Wilayah {polsek.name}
                </h3>
                <span className="text-sm text-gray-500">
                  Total: {polsek.villages?.length || 0} Desa
                </span>
              </div>

              {polsek.villages && polsek.villages.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-medium text-">
                          Nama Desa
                        </TableHead>
                        <TableHead className="font-medium text-center">
                          Target (Ha)
                        </TableHead>
                        <TableHead className="font-medium text-center">
                          Capaian (Ha)
                        </TableHead>
                        <TableHead className="font-medium text-center">
                          Persentase
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {polsek.villages.map((village, index) => {
                        // Calculate percentage of achievement vs target
                        const achievementPercentage =
                          village.target && village.achievement
                            ? Math.round(
                                (village.achievement / village.target) * 100
                              )
                            : 0;

                        return (
                          <TableRow key={village.id || index}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Home className="h-3.5 w-3.5 text-gray-400" />
                                {village.name}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-center">
                              {village.target
                                ? village.target.toLocaleString("id-ID")
                                : "-"}
                            </TableCell>
                            <TableCell className="text-sm text-center">
                              {village.achievement
                                ? village.achievement.toLocaleString("id-ID")
                                : "-"}
                            </TableCell>
                            <TableCell className="text-sm text-center">
                              {village.target && village.achievement ? (
                                <div className="flex items-center justify-center gap-1">
                                  <span
                                    className={`
                            ${
                              achievementPercentage >= 80
                                ? "text-green-600"
                                : achievementPercentage >= 50
                                ? "text-amber-600"
                                : "text-red-600"
                            }
                            font-medium
                          `}
                                  >
                                    {achievementPercentage}%
                                  </span>
                                </div>
                              ) : (
                                "-"
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400">
                  <Home className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>Belum Ada Data Desa...</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PolsekDetail;
