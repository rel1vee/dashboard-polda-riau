import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Target } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
  Legend,
  Label,
} from "recharts";
import { Company } from "@/types";

interface CompanyDetailProps {
  company: Company;
  isOpen: boolean;
  onClose: () => void;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({
  company,
  isOpen,
  onClose,
}) => {
  if (!company) return null;

  // Transform period data for charts
  const transformPeriodData = () => {
    return (["I", "II", "III", "IV"] as const).map((period) => ({
      periode: period,
      // Monokultur data
      monoTarget:
        company.monokulturTargets[
          period as keyof typeof company.monokulturTargets
        ],
      monoAchievement:
        company.monokulturAchievements[
          period as keyof typeof company.monokulturAchievements
        ],
      // Tumpang Sari data
      tsTarget:
        company.tumpangSariTargets[
          period as keyof typeof company.tumpangSariTargets
        ],
      tsAchievement:
        company.tumpangSariAchievements[
          period as keyof typeof company.tumpangSariAchievements
        ],
    }));
  };

  const periodData = transformPeriodData();

  // Data for pie chart
  const targetDistribution = [
    {
      name: "2% Monokultur",
      value: company.target2Percent,
      fill: "hsl(var(--chart-1))",
    },
    {
      name: "7% Tumpang Sari",
      value: company.target7Percent,
      fill: "hsl(var(--chart-2))",
    },
    {
      name: "Sisa Lahan",
      value: company.area - (company.target2Percent + company.target7Percent),
      fill: "hsl(var(--chart-3))",
    },
  ];

  const totalArea = company.area;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-6xl max-h-[95%] w-[95%] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="hidden md:block w-5 h-5 text-blue-500" />
            {company.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="Progress Monokultur">Monokultur</TabsTrigger>
            <TabsTrigger value="Progress Tumpang Sari">
              Tumpang Sari
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="items-center">
                  <CardTitle className="text-sm font-medium">
                    Total Lahan
                  </CardTitle>
                  <CardDescription>Distribusi Target Lahan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2">
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
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Pie
                          data={targetDistribution}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={75}
                          outerRadius={100}
                          strokeWidth={5}
                        >
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
                                      {totalArea.toLocaleString("id-ID", {
                                        maximumFractionDigits: 2,
                                      })}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground"
                                    >
                                      Total (Ha)
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
                  <div className="w-full grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-1))" }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Target 2% Monokultur
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.target2Percent.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-2))" }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Target 7% Tumpang Sari
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.target7Percent.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-3))" }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Sisa Lahan
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {(
                          company.area -
                          (company.target2Percent + company.target7Percent)
                        ).toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                  </div>
                  <div className="w-full pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          Total Lahan
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.area.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="items-center">
                  <CardTitle className="text-sm font-medium">
                    Target Monokultur dan Tumpang Sari
                  </CardTitle>
                  <CardDescription>Target per Periode</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={periodData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="periode"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                        />
                        <YAxis />
                        <Tooltip
                          cursor={false}
                          contentStyle={{
                            background: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            padding: "8px",
                          }}
                        />
                        <Legend />
                        <Bar
                          dataKey="monoTarget"
                          name="2% Monokultur"
                          fill="#22c55e"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="tsTarget"
                          name="7% Tumpang Sari"
                          fill="#8b5cf6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="w-full pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          Total Target
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {(
                          company.target2Percent + company.target7Percent
                        ).toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="Progress Monokultur">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  Capaian Monokultur per Periode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={periodData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="periode" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="monoAchievement"
                        name="Pencapaian"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="monoTarget"
                        name="Target"
                        stroke="#22c55e"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span className="text-sm text-muted-foreground">
                        Total Target Monokultur
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {company.target2Percent.toLocaleString("id-ID", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      Ha
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="Progress Tumpang Sari">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  Capaian Tumpang Sari per Periode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={periodData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="periode" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="tsAchievement"
                        name="Pencapaian"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="tsTarget"
                        name="Target"
                        stroke="#8b5cf6"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span className="text-sm text-muted-foreground">
                        Total Target Tumpang Sari
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {company.target7Percent.toLocaleString("id-ID", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      Ha
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDetail;
