import { Company, Progress } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Building2,
  Calendar,
  Database,
  Phone,
  Target,
  User,
  Warehouse,
} from "lucide-react";
import {
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CompanyDetailProps {
  company: Company;
  progress: Progress | null;
  isOpen: boolean;
  onClose: () => void;
}

const OtherCompanyDetail: React.FC<CompanyDetailProps> = ({
  company,
  progress,
  isOpen,
  onClose,
}) => {
  if (!company) return null;

  const transformPeriodData = () => {
    return (["I", "II", "III", "IV"] as const).map((period) => ({
      periode: period,

      monoAchievement:
        company.monokulturAchievements[
          period as keyof typeof company.monokulturAchievements
        ],

      tsAchievement:
        company.tumpangSariAchievements[
          period as keyof typeof company.tumpangSariAchievements
        ],
      csrAchievement: (company.csrAchievements ?? {})[
        period as keyof typeof company.csrAchievements
      ],
    }));
  };

  const targetDistribution = [
    {
      name: "Total Capaian Monokultur",
      value: company.monokulturAchievements.IV,
      fill: "hsl(var(--chart-2))",
    },
    {
      name: "Total Capaian Tumpang Sari",
      value: company.tumpangSariAchievements.IV,
      fill: "hsl(var(--chart-3))",
    },
    {
      name: "Total Capaian CSR",
      value: company.csrAchievements?.IV,
      fill: "hsl(var(--chart-4))",
    },
    {
      name: "Sisa Lahan",
      value:
        company.area -
        (company.monokulturAchievements.IV +
          company.tumpangSariAchievements.IV +
          (company.csrAchievements?.IV ?? 0)),
      fill: "hsl(var(--chart-1))",
    },
  ];

  const renderProgressSection = (
    title: string,
    data: {
      waktuTanam: string;
      targetTanam: { luas: number };
      progresTanam: { luas: number };
      belumTanam: { luas: number };
      panen: { luas: number };
      keterangan: string;
    }
  ) => {
    const progressData = [
      {
        name: "Sudah Tanam",
        value:
          data.targetTanam.luas === 0
            ? 0
            : (data.progresTanam.luas / data.targetTanam.luas) * 100,
        luas: data.progresTanam.luas,
        fill: "#22c55e",
      },
      {
        name: "Belum Tanam",
        value:
          data.targetTanam.luas === 0
            ? 0
            : (data.belumTanam.luas / data.targetTanam.luas) * 100,
        luas: data.belumTanam.luas,
        fill: "#ef4444",
      },
      {
        name: "Panen",
        value:
          data.targetTanam.luas === 0
            ? 0
            : (data.panen.luas / data.targetTanam.luas) * 100,
        luas: data.panen.luas,
        fill: "#eab308",
      },
    ];

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Progress {title}
          </CardTitle>
          <CardDescription>
            Target Tanam:{" "}
            {data.targetTanam.luas.toLocaleString("id-ID", {
              maximumFractionDigits: 2,
            })}{" "}
            Ha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    dataKey="luas"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={100}
                    label
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  {data.name}
                                </span>
                                <span className="font-bold">
                                  {data.value.toLocaleString("id-ID", {
                                    maximumFractionDigits: 2,
                                  })}
                                  % (
                                  {data.luas.toLocaleString("id-ID", {
                                    maximumFractionDigits: 2,
                                  })}{" "}
                                  Ha)
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Waktu Tanam: {data.waktuTanam}</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sudah Tanam</span>
                  <span className="font-medium">
                    {data.progresTanam.luas.toLocaleString("id-ID", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    Ha (
                    {(data.targetTanam.luas === 0
                      ? 0
                      : (data.progresTanam.luas / data.targetTanam.luas) * 100
                    ).toLocaleString("id-ID", { maximumFractionDigits: 2 })}
                    %)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Belum Tanam</span>
                  <span className="font-medium">
                    {data.belumTanam.luas.toLocaleString("id-ID", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    Ha (
                    {(data.targetTanam.luas === 0
                      ? 0
                      : (data.belumTanam.luas / data.targetTanam.luas) * 100
                    ).toLocaleString("id-ID", { maximumFractionDigits: 2 })}
                    %)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Panen</span>
                  <span className="font-medium">
                    {data.panen.luas.toLocaleString("id-ID", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    Ha (
                    {(data.targetTanam.luas === 0
                      ? 0
                      : (data.panen.luas / data.targetTanam.luas) * 100
                    ).toLocaleString("id-ID", { maximumFractionDigits: 2 })}
                    %)
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Keterangan:</h4>
                <p className="text-sm text-muted-foreground">
                  {data.keterangan}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const periodData = transformPeriodData();
  const totalArea = company.area;

  // Fungsi untuk memformat tanggal dalam format "DD-MM-YYYY"
  const formatToIndonesianDate = (date: Date): string => {
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Pemetaan nama bulan dalam berbagai bahasa
  const monthMap: { [key: string]: number } = {
    januari: 0,
    january: 0,
    jan: 0,
    februari: 1,
    february: 1,
    feb: 1,
    maret: 2,
    march: 2,
    mar: 2,
    april: 3,
    apr: 3,
    mei: 4,
    may: 4,
    juni: 5,
    june: 5,
    jun: 5,
    juli: 6,
    july: 6,
    jul: 6,
    agustus: 7,
    august: 7,
    aug: 7,
    september: 8,
    sep: 8,
    oktober: 9,
    october: 9,
    oct: 9,
    november: 10,
    nov: 10,
    desember: 11,
    december: 11,
    dec: 11,
  };

  // Fungsi parsing untuk format "DD-MM-YYYY" dan "DD/MM/YYYY"
  const parseDDMMYYYY = (dateStr: string): Date | null => {
    const parts = dateStr.split(/[-/]/);
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  };

  // Fungsi parsing untuk format "YYYY-MM-DD" dan "YYYY/MM/DD"
  const parseYYYYMMDD = (dateStr: string): Date | null => {
    const parts = dateStr.split(/[-/]/);
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  };

  // Fungsi parsing untuk format "DD MMMM YYYY" atau "DD MMM YYYY"
  const parseDDMMMMYYYY = (dateStr: string): Date | null => {
    const parts = dateStr.split(" ");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const monthStr = parts[1].toLowerCase().trim();
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(year) && monthMap[monthStr] !== undefined) {
        return new Date(year, monthMap[monthStr], day);
      }
    }
    return null;
  };

  // Fungsi parsing untuk format "MMMM YYYY"
  const parseMMMMYYYY = (dateStr: string): Date | null => {
    const parts = dateStr.split(" ");
    if (parts.length === 2) {
      const monthStr = parts[0].toLowerCase().trim();
      const year = parseInt(parts[1], 10);
      if (!isNaN(year) && monthMap[monthStr] !== undefined) {
        return new Date(year, monthMap[monthStr], 1);
      }
    }
    return null;
  };

  // Fungsi utama untuk menambahkan 4 bulan
  const calculateHarvestTime = (waktuTanam: string): string => {
    if (!waktuTanam || waktuTanam.trim() === "") return " ";

    try {
      let parsedDate: Date | null = null;

      // Cek berbagai format tanggal
      parsedDate =
        parseDDMMYYYY(waktuTanam) ||
        parseYYYYMMDD(waktuTanam) ||
        parseDDMMMMYYYY(waktuTanam) ||
        parseMMMMYYYY(waktuTanam);

      if (parsedDate) {
        parsedDate.setMonth(parsedDate.getMonth() + 4);
        return formatToIndonesianDate(parsedDate);
      }
      return waktuTanam; // Jika format tidak dikenali, kembalikan apa adanya
    } catch (error) {
      console.error(`Error menambahkan 4 bulan ke: ${waktuTanam}`, error);
      return waktuTanam;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-6xl max-h-[95%] w-[95%] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-0 md:gap-3 uppercase">
            <Building2 className="hidden md:block w-5 h-5 text-blue-500" />
            {company.name}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full h-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-blue-100 gap-2 mb-4 mt-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">
              Monokultur & Tumpang Sari
            </TabsTrigger>
            <TabsTrigger value="csr">CSR</TabsTrigger>
            <TabsTrigger value="prosesProduksi">Proses Produksi</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader className="items-center">
                  <CardTitle className="text-sm font-medium">
                    Total Lahan
                  </CardTitle>
                  <CardDescription>Distribusi Lahan</CardDescription>
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
                          style={{ backgroundColor: "hsl(var(--chart-2))" }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Total Capaian Monokultur
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.monokulturAchievements.IV.toLocaleString(
                          "id-ID",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}{" "}
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
                          Total Capaian Tumpang Sari
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.tumpangSariAchievements.IV.toLocaleString(
                          "id-ID",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}{" "}
                        Ha
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-4))" }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Total Capaian CSR
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.csrAchievements?.IV.toLocaleString("id-ID", {
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
            </div>
          </TabsContent>
          <TabsContent value="progress">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          Total Capaian Monokultur
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.monokulturAchievements.IV.toLocaleString(
                          "id-ID",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}{" "}
                        Ha
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
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
                          Total Capaian Tumpang Sari
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.tumpangSariAchievements.IV.toLocaleString(
                          "id-ID",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}{" "}
                        Ha
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="csr">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  Capaian CSR per Periode
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
                        dataKey="csrAchievement"
                        name="Pencapaian"
                        stroke="#3b82f6"
                        strokeWidth={2}
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
                        Total Capaian CSR
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {company.csrAchievements?.IV.toLocaleString("id-ID", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      Ha
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="prosesProduksi">
            <div className="space-y-4">
              {progress ? (
                <>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Informasi Penanggung Jawab
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500 " />
                          <span className="text-sm">
                            Nama: {progress.namaPJ}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            No. Telp: {progress.nomorTelp}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Progress Tanam</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Rencana Tanam Table */}
                        <Card className="w-full">
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-green-600" />
                              <CardTitle className="text-lg font-semibold text-green-600">
                                Rencana Tanam
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader className="bg-green-50">
                                <TableRow>
                                  <TableHead className="font-bold">
                                    Parameter
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Waktu Tanam
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Monokultur
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {progress.monokultur.waktuTanam || ""}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Tumpang Sari
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {progress.tumpangSari.waktuTanam || ""}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    CSR
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {progress.csr.waktuTanam || ""}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                        {/* Rencana Panen Table */}
                        <Card className="w-full">
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                              <Warehouse className="h-5 w-5 text-blue-600" />
                              <CardTitle className="text-lg font-semibold text-blue-600">
                                Rencana Panen
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader className="bg-blue-50">
                                <TableRow>
                                  <TableHead className="font-bold">
                                    Parameter
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Waktu Panen
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Monokultur
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {calculateHarvestTime(
                                      String(progress.monokultur.waktuTanam)
                                    )}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Tumpang Sari
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {calculateHarvestTime(
                                      String(progress.tumpangSari.waktuTanam)
                                    )}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    CSR
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {calculateHarvestTime(
                                      String(progress.csr.waktuTanam)
                                    )}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  {progress.monokultur &&
                    renderProgressSection("Monokultur", {
                      ...progress.monokultur,
                      targetTanam: {
                        luas: Number(progress.monokultur.targetTanam.luas) ?? 0,
                      },
                      waktuTanam: String(progress.monokultur.waktuTanam) ?? "",
                      progresTanam: {
                        luas:
                          Number(progress.monokultur.progresTanam.luas) ?? 0,
                      },
                      belumTanam: {
                        luas: Number(progress.monokultur.belumTanam.luas) ?? 0,
                      },
                      panen: {
                        luas: Number(progress.monokultur.panen.luas) ?? 0,
                      },
                      keterangan: String(progress.monokultur.keterangan) ?? "",
                    })}

                  {progress.tumpangSari &&
                    renderProgressSection("Tumpang Sari", {
                      ...progress.tumpangSari,
                      targetTanam: {
                        luas:
                          Number(progress.tumpangSari.targetTanam.luas) ?? 0,
                      },
                      waktuTanam: String(progress.tumpangSari.waktuTanam) ?? "",
                      progresTanam: {
                        luas:
                          Number(progress.tumpangSari.progresTanam.luas) ?? 0,
                      },
                      belumTanam: {
                        luas: Number(progress.tumpangSari.belumTanam.luas) ?? 0,
                      },
                      panen: {
                        luas: Number(progress.tumpangSari.panen.luas) ?? 0,
                      },
                      keterangan: String(progress.tumpangSari.keterangan) ?? "",
                    })}

                  {progress.csr &&
                    renderProgressSection("CSR", {
                      ...progress.csr,
                      targetTanam: {
                        luas: Number(progress.csr.targetTanam.luas) ?? 0,
                      },
                      waktuTanam: String(progress.csr.waktuTanam) ?? "",
                      progresTanam: {
                        luas: Number(progress.csr.progresTanam.luas) ?? 0,
                      },
                      belumTanam: {
                        luas: Number(progress.csr.belumTanam.luas) ?? 0,
                      },
                      panen: {
                        luas: Number(progress.csr.panen.luas) ?? 0,
                      },
                      keterangan: String(progress.csr.keterangan) ?? "",
                    })}
                </>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-center flex-col gap-2">
                  <Database className="h-10 w-10 text-emerald-800" />
                  <span className="text-emerald-800 text-xl text-center">
                    Belum Ada Data Proses Produksi...
                  </span>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default OtherCompanyDetail;
