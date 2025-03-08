import { riauCity } from "../../data/RiauCity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, BarChart4, Table as TableIcon, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const formatNumber = (num: number) => {
  return num.toLocaleString("id-ID", {
    maximumFractionDigits: 2,
  });
};

const prepareTableData = () => {
  const rankedCities = riauCity.map((city) => {
    const allCompanies = [...city.companies, ...(city.otherCompanies || [])];

    let polsekAchievement = 0;

    city.polsek.forEach((polsek) => {
      polsek.villages?.forEach((village) => {
        polsekAchievement += village.achievement;
      });
    });

    const monokulturAchievements = {
      i: allCompanies.reduce(
        (sum, company) => sum + (company.monokulturAchievements?.I || 0),
        0
      ),
      ii: allCompanies.reduce(
        (sum, company) => sum + (company.monokulturAchievements?.II || 0),
        0
      ),
      iii: allCompanies.reduce(
        (sum, company) => sum + (company.monokulturAchievements?.III || 0),
        0
      ),
      iv: allCompanies.reduce(
        (sum, company) => sum + (company.monokulturAchievements?.IV || 0),
        0
      ),
    };

    const tumpangSariAchievements = {
      i: allCompanies.reduce(
        (sum, company) => sum + (company.tumpangSariAchievements?.I || 0),
        0
      ),
      ii: allCompanies.reduce(
        (sum, company) => sum + (company.tumpangSariAchievements?.II || 0),
        0
      ),
      iii: allCompanies.reduce(
        (sum, company) => sum + (company.tumpangSariAchievements?.III || 0),
        0
      ),
      iv: allCompanies.reduce(
        (sum, company) => sum + (company.tumpangSariAchievements?.IV || 0),
        0
      ),
    };

    const csrAchievements = {
      i: allCompanies.reduce(
        (sum, company) => sum + (company.csrAchievements?.I || 0),
        0
      ),
      ii: allCompanies.reduce(
        (sum, company) => sum + (company.csrAchievements?.II || 0),
        0
      ),
      iii: allCompanies.reduce(
        (sum, company) => sum + (company.csrAchievements?.III || 0),
        0
      ),
      iv: allCompanies.reduce(
        (sum, company) => sum + (company.csrAchievements?.IV || 0),
        0
      ),
    };

    const totalAchievements =
      monokulturAchievements.iv +
      tumpangSariAchievements.iv +
      csrAchievements.iv;

    return {
      no: city.id,
      nama: city.nama,
      totalTarget: city.monokulturTarget + city.tumpangSariTarget,
      capaianMonokultur: monokulturAchievements,
      capaianTumpangSari: tumpangSariAchievements,
      capaianCSR: csrAchievements,
      polsekAchievement,
      TAHAP_I: totalAchievements + polsekAchievement,
      TAHAP_II: 0,
      TAHAP_III: 0,
      TAHAP_IV: 0,
    };
  });

  rankedCities.sort((a, b) => b.TAHAP_I - a.TAHAP_I);
  return rankedCities;
};

const prepareTablePolsekData = () => {
  const rankedPolsek = riauCity.map((city) => {
    let totalAchievement = 0;
    let totalTarget = 0;

    city.polsek.forEach((polsek) => {
      polsek.villages?.forEach((village) => {
        totalAchievement += village.achievement;
        totalTarget += village.target;
      });
    });

    return {
      name: city.nama,
      totalAchievement,
      totalTarget,
      percentage:
        totalTarget > 0
          ? ((totalAchievement / totalTarget) * 100).toLocaleString("id-ID", {
              maximumFractionDigits: 2,
            }) + "%"
          : "0%",
    };
  });

  rankedPolsek.sort((a, b) => b.totalAchievement - a.totalAchievement);
  return rankedPolsek;
};

const getTotalPolsekData = (
  data: { totalAchievement: number; totalTarget: number }[]
) => {
  const totalAchievement = data.reduce(
    (sum, city) => sum + city.totalAchievement,
    0
  );

  const totalTarget = data.reduce((sum, city) => sum + city.totalTarget, 0);

  const percentage =
    totalTarget > 0
      ? ((totalAchievement / totalTarget) * 100).toLocaleString("id-ID", {
          maximumFractionDigits: 2,
        }) + "%"
      : "0%";

  return {
    name: "TOTAL",
    totalAchievement,
    totalTarget,
    percentage,
  };
};

const getTotalAchievements = () => {
  return riauCity.reduce(
    (acc, polres) => {
      const allCompanies = [
        ...polres.companies,
        ...(polres.otherCompanies || []),
      ];

      const monoAchievementI = allCompanies.reduce((sum, company) => {
        if (company.monokulturAchievements?.I) {
          return sum + company.monokulturAchievements.I;
        }
        return sum;
      }, 0);

      const tumpangSariAchievementI = allCompanies.reduce((sum, company) => {
        if (company.tumpangSariAchievements?.I) {
          return sum + company.tumpangSariAchievements.I;
        }
        return sum;
      }, 0);

      const csrAchievementI = allCompanies.reduce((sum, company) => {
        if (company.csrAchievements?.I) {
          return sum + company.csrAchievements.I;
        }
        return sum;
      }, 0);

      const monoAchievementII = allCompanies.reduce((sum, company) => {
        if (company.monokulturAchievements?.II) {
          return sum + company.monokulturAchievements.II;
        }
        return sum;
      }, 0);

      const tumpangSariAchievementII = allCompanies.reduce((sum, company) => {
        if (company.tumpangSariAchievements?.II) {
          return sum + company.tumpangSariAchievements.II;
        }
        return sum;
      }, 0);

      const csrAchievementII = allCompanies.reduce((sum, company) => {
        if (company.csrAchievements?.II) {
          return sum + company.csrAchievements.II;
        }
        return sum;
      }, 0);

      const monoAchievementIII = allCompanies.reduce((sum, company) => {
        if (company.monokulturAchievements?.III) {
          return sum + company.monokulturAchievements.III;
        }
        return sum;
      }, 0);

      const tumpangSariAchievementIII = allCompanies.reduce((sum, company) => {
        if (company.tumpangSariAchievements?.III) {
          return sum + company.tumpangSariAchievements.III;
        }
        return sum;
      }, 0);

      const csrAchievementIII = allCompanies.reduce((sum, company) => {
        if (company.csrAchievements?.III) {
          return sum + company.csrAchievements.III;
        }
        return sum;
      }, 0);

      const monoAchievementIV = allCompanies.reduce((sum, company) => {
        if (company.monokulturAchievements?.IV) {
          return sum + company.monokulturAchievements.IV;
        }
        return sum;
      }, 0);

      const tumpangSariAchievementIV = allCompanies.reduce((sum, company) => {
        if (company.tumpangSariAchievements?.IV) {
          return sum + company.tumpangSariAchievements.IV;
        }
        return sum;
      }, 0);

      const csrAchievementIV = allCompanies.reduce((sum, company) => {
        if (company.csrAchievements?.IV) {
          return sum + company.csrAchievements.IV;
        }
        return sum;
      }, 0);

      const polsekAchievement = polres.polsek.reduce(
        (total, polsek) =>
          total +
          (polsek.villages?.reduce(
            (achievement, village) => achievement + (village.achievement || 0),
            0
          ) || 0),
        0
      );

      return {
        monokulturTarget: acc.monokulturTarget + polres.monokulturTarget,
        tumpangSariTarget: acc.tumpangSariTarget + polres.tumpangSariTarget,
        monokulturAchievementI: acc.monokulturAchievementI + monoAchievementI,
        tumpangSariAchievementI:
          acc.tumpangSariAchievementI + tumpangSariAchievementI,
        csrAchievementI: acc.csrAchievementI + csrAchievementI,
        monokulturAchievementII:
          acc.monokulturAchievementII + monoAchievementII,
        tumpangSariAchievementII:
          acc.tumpangSariAchievementII + tumpangSariAchievementII,
        csrAchievementII: acc.csrAchievementII + csrAchievementII,
        monokulturAchievementIII:
          acc.monokulturAchievementIII + monoAchievementIII,
        tumpangSariAchievementIII:
          acc.tumpangSariAchievementIII + tumpangSariAchievementIII,
        csrAchievementIII: acc.csrAchievementIII + csrAchievementIII,
        monokulturAchievementIV:
          acc.monokulturAchievementIV + monoAchievementIV,
        tumpangSariAchievementIV:
          acc.tumpangSariAchievementIV + tumpangSariAchievementIV,
        csrAchievementIV: acc.csrAchievementIV + csrAchievementIV,
        polsekAchievement: acc.polsekAchievement + polsekAchievement,
      };
    },
    {
      monokulturTarget: 0,
      tumpangSariTarget: 0,
      monokulturAchievementI: 0,
      tumpangSariAchievementI: 0,
      csrAchievementI: 0,
      monokulturAchievementII: 0,
      tumpangSariAchievementII: 0,
      csrAchievementII: 0,
      monokulturAchievementIII: 0,
      tumpangSariAchievementIII: 0,
      csrAchievementIII: 0,
      monokulturAchievementIV: 0,
      tumpangSariAchievementIV: 0,
      csrAchievementIV: 0,
      polsekAchievement: 0,
    }
  );
};

const achievements = getTotalAchievements();

const NewRanking = () => {
  const tableData = prepareTableData();
  const tablePolsekData = prepareTablePolsekData();
  const totalRow = getTotalPolsekData(tablePolsekData);

  const calculateTotals = (data: {
    capaianMonokultur: { iv: number };
    capaianTumpangSari: { iv: number };
    capaianCSR: { iv: number };
    totalTarget: number;
    polsekAchievement: number;
  }) => {
    return {
      phase1: {
        total: (
          data.capaianMonokultur.iv +
          data.capaianTumpangSari.iv +
          data.capaianCSR.iv +
          data.polsekAchievement
        ).toLocaleString("id-ID", {
          maximumFractionDigits: 2,
        }),
        percentage: (
          ((data.capaianMonokultur.iv +
            data.capaianTumpangSari.iv +
            data.capaianCSR.iv +
            data.polsekAchievement) /
            (data.totalTarget / 4)) *
          100
        ).toLocaleString("id-ID", {
          maximumFractionDigits: 2,
        }),
      },
    };
  };

  return (
    <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-none">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center md:gap-3 gap-0 text-blue-600 text-2xl font-bold">
          <Trophy className="w-8 h-8 hidden md:block" />
          Perankingan Kabupaten/Kota
        </CardTitle>
        <CardDescription>
          Tabel dan Grafik Pencapaian Ketahanan Pangan
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full lg:max-w-5xl mx-auto grid-cols-2 md:grid-cols-4 mb-6 mt-2 bg-blue-100 h-auto">
            <TabsTrigger value="table" className="gap-2">
              <TableIcon className="h-4 w-4" />
              T1 POLRES
            </TabsTrigger>
            <TabsTrigger value="chart" className="gap-2">
              <BarChart4 className="h-4 w-4" />
              G1 POLRES
            </TabsTrigger>
            <TabsTrigger value="tablePolsek" className="gap-2">
              <TableIcon className="h-4 w-4" />
              T2 POLSEK
            </TabsTrigger>
            <TabsTrigger value="chartPolsek" className="gap-2">
              <BarChart4 className="h-4 w-4" />
              G2 POLSEK
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            <div className="rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        rowSpan={2}
                        className="text-center border border-gray-200 font-bold text-gray-800 bg-gray-300"
                      >
                        NO
                      </TableHead>
                      <TableHead
                        rowSpan={2}
                        className="text-center border border-gray-200 font-bold text-gray-800 bg-gray-300"
                      >
                        NAMA KABUPATEN/KOTA
                      </TableHead>
                      <TableHead
                        colSpan={6}
                        className="text-center border border-green-200 font-bold text-gray-800 bg-green-300"
                      >
                        <div className="flex justify-center items-center gap-3">
                          TAHAP I
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            25%
                          </Badge>
                        </div>
                      </TableHead>
                      <TableHead
                        colSpan={6}
                        className="text-center border border-blue-200 font-bold text-gray-800 bg-blue-300"
                      >
                        <div className="flex justify-center items-center gap-3">
                          TAHAP II
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            25%
                          </Badge>
                        </div>
                      </TableHead>
                      <TableHead
                        colSpan={6}
                        className="text-center border border-purple-200 font-bold text-gray-800 bg-purple-300"
                      >
                        <div className="flex justify-center items-center gap-3">
                          TAHAP III
                          <Badge
                            variant="outline"
                            className="bg-purple-50 text-purple-700 border-purple-200"
                          >
                            25%
                          </Badge>
                        </div>
                      </TableHead>
                      <TableHead
                        colSpan={6}
                        className="text-center border border-red-200 font-bold text-gray-800 bg-red-300"
                      >
                        <div className="flex justify-center items-center gap-3">
                          TAHAP IV
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200"
                          >
                            25%
                          </Badge>
                        </div>
                      </TableHead>
                    </TableRow>
                    <TableRow>
                      {/* TAHAP I - Green theme */}
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 p-2 bg-green-300">
                        I
                      </TableHead>
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 p-2 bg-green-300">
                        II
                      </TableHead>
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 p-2 bg-green-300">
                        III
                      </TableHead>
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 p-2 bg-green-300">
                        IV
                      </TableHead>
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 p-2 bg-green-300">
                        Total
                      </TableHead>
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 p-2 bg-green-300">
                        %
                      </TableHead>
                      {/* TAHAP II - Blue theme */}
                      <TableHead className="text-center border border-blue-200 font-bold text-gray-800 p-2 bg-blue-300">
                        I
                      </TableHead>
                      <TableHead className="text-center border border-blue-200 font-bold text-gray-800 p-2 bg-blue-300">
                        II
                      </TableHead>
                      <TableHead className="text-center border border-blue-200 font-bold text-gray-800 p-2 bg-blue-300">
                        III
                      </TableHead>
                      <TableHead className="text-center border border-blue-200 font-bold text-gray-800 p-2 bg-blue-300">
                        IV
                      </TableHead>
                      <TableHead className="text-center border border-blue-200 font-bold text-gray-800 p-2 bg-blue-300">
                        Total
                      </TableHead>
                      <TableHead className="text-center border border-blue-200 font-bold text-gray-800 p-2 bg-blue-300">
                        %
                      </TableHead>
                      {/* TAHAP III - Purple theme */}
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 p-2 bg-purple-300">
                        I
                      </TableHead>
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 p-2 bg-purple-300">
                        II
                      </TableHead>
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 p-2 bg-purple-300">
                        III
                      </TableHead>
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 p-2 bg-purple-300">
                        IV
                      </TableHead>
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 p-2 bg-purple-300">
                        Total
                      </TableHead>
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 p-2 bg-purple-300">
                        %
                      </TableHead>
                      {/* TAHAP IV - Amber theme */}
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 p-2 bg-red-300">
                        I
                      </TableHead>
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 p-2 bg-red-300">
                        II
                      </TableHead>
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 p-2 bg-red-300">
                        III
                      </TableHead>
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 p-2 bg-red-300">
                        IV
                      </TableHead>
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 p-2 bg-red-300">
                        Total
                      </TableHead>
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 p-2 bg-red-300">
                        %
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row, index) => {
                      const totals = calculateTotals(row);

                      return (
                        <TableRow key={row.no}>
                          <TableCell className="text-center border">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-center border font-medium">
                            {row.nama}
                          </TableCell>
                          {/* TAHAP I */}
                          <TableCell className="text-center border bg-green-50">
                            {formatNumber(
                              row.capaianMonokultur.i +
                                row.capaianTumpangSari.i +
                                row.capaianCSR.i
                            )}
                          </TableCell>
                          <TableCell className="text-center border bg-green-50">
                            {formatNumber(
                              row.capaianMonokultur.ii +
                                row.capaianTumpangSari.ii +
                                row.capaianCSR.ii -
                                (row.capaianMonokultur.i +
                                  row.capaianTumpangSari.i +
                                  row.capaianCSR.i)
                            )}
                          </TableCell>
                          <TableCell className="text-center border bg-green-50">
                            {formatNumber(
                              row.capaianMonokultur.iii +
                                row.capaianTumpangSari.iii +
                                row.capaianCSR.iii -
                                (row.capaianMonokultur.ii +
                                  row.capaianTumpangSari.ii +
                                  row.capaianCSR.ii)
                            )}
                          </TableCell>
                          <TableCell className="text-center border bg-green-50">
                            {formatNumber(
                              row.capaianMonokultur.iv +
                                row.capaianTumpangSari.iv +
                                row.capaianCSR.iv +
                                row.polsekAchievement -
                                (row.capaianMonokultur.iii +
                                  row.capaianTumpangSari.iii +
                                  row.capaianCSR.iii)
                            )}
                          </TableCell>
                          <TableCell className="text-center border font-bold bg-green-50">
                            {totals.phase1.total}
                          </TableCell>
                          <TableCell className="text-center border font-bold bg-green-50">
                            {totals.phase1.percentage}%
                          </TableCell>

                          {/* TAHAP II */}
                          <TableCell className="text-center border bg-blue-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-blue-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-blue-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-blue-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-blue-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-blue-50">
                            {formatNumber(0)}%
                          </TableCell>

                          {/* TAHAP III */}
                          <TableCell className="text-center border bg-purple-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-purple-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-purple-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-purple-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-purple-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-purple-50">
                            {formatNumber(0)}%
                          </TableCell>

                          {/* TAHAP IV */}
                          <TableCell className="text-center border bg-red-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-red-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-red-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-red-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-red-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-red-50">
                            {formatNumber(0)}%
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell className="text-center border"></TableCell>
                      <TableCell className="text-center border font-bold">
                        TOTAL
                      </TableCell>
                      {/* TAHAP I */}
                      <TableCell className="text-center border font-bold bg-green-50">
                        {formatNumber(
                          achievements.monokulturAchievementI +
                            achievements.tumpangSariAchievementI +
                            achievements.csrAchievementI
                        )}
                      </TableCell>
                      <TableCell className="text-center border font-bold bg-green-50">
                        {formatNumber(
                          achievements.monokulturAchievementII +
                            achievements.tumpangSariAchievementII +
                            achievements.csrAchievementII -
                            (achievements.monokulturAchievementI +
                              achievements.tumpangSariAchievementI +
                              achievements.csrAchievementI)
                        )}
                      </TableCell>
                      <TableCell className="text-center border font-bold bg-green-50">
                        {formatNumber(
                          achievements.monokulturAchievementIII +
                            achievements.tumpangSariAchievementIII +
                            achievements.csrAchievementIII -
                            (achievements.monokulturAchievementII +
                              achievements.tumpangSariAchievementII +
                              achievements.csrAchievementII)
                        )}
                      </TableCell>
                      <TableCell className="text-center border font-bold bg-green-50">
                        {formatNumber(
                          achievements.monokulturAchievementIV +
                            achievements.tumpangSariAchievementIV +
                            achievements.csrAchievementIV +
                            achievements.polsekAchievement -
                            (achievements.monokulturAchievementIII +
                              achievements.tumpangSariAchievementIII +
                              achievements.csrAchievementIII)
                        )}
                      </TableCell>
                      <TableCell className="text-center border font-bold bg-green-50">
                        {formatNumber(
                          achievements.monokulturAchievementIV +
                            achievements.tumpangSariAchievementIV +
                            achievements.csrAchievementIV +
                            achievements.polsekAchievement
                        )}
                      </TableCell>
                      <TableCell className="text-center border font-bold bg-green-50">
                        {formatNumber(
                          ((achievements.monokulturAchievementIV +
                            achievements.tumpangSariAchievementIV +
                            achievements.csrAchievementIV +
                            achievements.polsekAchievement) /
                            (achievements.monokulturTarget +
                              achievements.tumpangSariTarget)) *
                            100
                        )}
                        %
                      </TableCell>

                      {/* TAHAP II */}
                      <TableCell className="text-center border bg-blue-50"></TableCell>
                      <TableCell className="text-center border bg-blue-50"></TableCell>
                      <TableCell className="text-center border bg-blue-50"></TableCell>
                      <TableCell className="text-center border bg-blue-50"></TableCell>
                      <TableCell className="text-center border bg-blue-50"></TableCell>
                      <TableCell className="text-center border bg-blue-50"></TableCell>

                      {/* TAHAP III */}
                      <TableCell className="text-center border bg-purple-50"></TableCell>
                      <TableCell className="text-center border bg-purple-50"></TableCell>
                      <TableCell className="text-center border bg-purple-50"></TableCell>
                      <TableCell className="text-center border bg-purple-50"></TableCell>
                      <TableCell className="text-center border bg-purple-50"></TableCell>
                      <TableCell className="text-center border bg-purple-50"></TableCell>

                      {/* TAHAP IV */}
                      <TableCell className="text-center border bg-red-50"></TableCell>
                      <TableCell className="text-center border bg-red-50"></TableCell>
                      <TableCell className="text-center border bg-red-50"></TableCell>
                      <TableCell className="text-center border bg-red-50"></TableCell>
                      <TableCell className="text-center border bg-red-50"></TableCell>
                      <TableCell className="text-center border bg-red-50"></TableCell>
                    </TableRow>
                  </TableBody>
                  <TableCaption className="mt-4 text-sm text-gray-600 bg-blue-50 p-2 rounded">
                    Tabel Capaian & Perangkingan Kabupaten/Kota
                  </TableCaption>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chart">
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-blue-800">
                    Visualisasi Capaian Kabupaten/Kota
                  </CardTitle>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Info</span>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">
                          Tentang Grafik
                        </h4>
                        <p className="text-sm">
                          Grafik ini menampilkan perbandingan capaian dari
                          setiap tahapan untuk semua kabupaten/kota.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="h-[30rem] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={tableData}
                      margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="nama"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                        tick={{ fill: "#78350f", fontSize: 11 }}
                      />
                      <YAxis tick={{ fill: "#78350f" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fffbeb",
                          borderColor: "#fbbf24",
                          borderRadius: "6px",
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: "8px" }} />
                      <Bar
                        dataKey="TAHAP_I"
                        fill="#4ade80"
                        name="TAHAP I"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="TAHAP_II"
                        fill="#60a5fa"
                        name="TAHAP II"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="TAHAP_III"
                        fill="#a78bfa"
                        name="TAHAP III"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="TAHAP_IV"
                        fill="#FCA5A5"
                        name="TAHAP IV"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tablePolsek">
            <div className="rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center border border-gray-200 font-bold text-gray-800 bg-gray-300">
                        NO
                      </TableHead>
                      <TableHead className="text-center border border-gray-200 font-bold text-gray-800 bg-gray-300">
                        NAMA POLRES
                      </TableHead>
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 bg-green-300">
                        TOTAL CAPAIAN
                      </TableHead>
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 bg-red-300">
                        TOTAL TARGET
                      </TableHead>
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 bg-purple-300">
                        %
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tablePolsekData.map((row, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="text-center border uppercase">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-center border font-medium uppercase">
                            {row.name}
                          </TableCell>
                          <TableCell className="text-center border bg-green-50">
                            {formatNumber(row.totalAchievement)}
                          </TableCell>
                          <TableCell className="text-center border bg-red-50">
                            {row.totalTarget}
                          </TableCell>
                          <TableCell className="text-center border font-bold bg-purple-50">
                            {row.percentage}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell className="text-center border uppercase"></TableCell>
                      <TableCell className="text-center border font-bold uppercase">
                        {totalRow.name}
                      </TableCell>
                      <TableCell className="text-center border font-bold bg-green-50">
                        {formatNumber(totalRow.totalAchievement)}
                      </TableCell>
                      <TableCell className="text-center border font-bold bg-red-50">
                        {formatNumber(totalRow.totalTarget)}
                      </TableCell>
                      <TableCell className="text-center border font-bold bg-purple-50">
                        {totalRow.percentage}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableCaption className="mt-4 text-sm text-gray-600 bg-blue-50 p-2 rounded">
                    Tabel Capaian & Perangkingan POLSEK
                  </TableCaption>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chartPolsek">
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-blue-800">
                    Visualisasi Capaian POLSEK
                  </CardTitle>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Info</span>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">
                          Tentang Grafik
                        </h4>
                        <p className="text-sm">
                          Grafik ini menampilkan perbandingan capaian dari
                          setiap tahapan untuk semua POLSEK.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </CardHeader>
              <CardContent className="pt-8 h-[44rem] overflow-x-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={tablePolsekData}
                    margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis
                      dataKey="name"
                      angle={-60}
                      textAnchor="end"
                      className="uppercase"
                      height={100}
                      interval={0}
                      tick={{ fill: "#78350f", fontSize: 11 }}
                    />
                    <YAxis tick={{ fill: "#78350f" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fffbeb",
                        borderColor: "#fbbf24",
                        borderRadius: "6px",
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: "8px" }} />
                    <Bar
                      dataKey="totalAchievement"
                      fill="#4ade80"
                      name="Total Capaian"
                      radius={[4, 4, 0, 0]}
                      barSize={35}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalTarget"
                      name="Total Target"
                      stroke="#FCA5A5"
                      strokeWidth={2}
                      dot={true}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NewRanking;
