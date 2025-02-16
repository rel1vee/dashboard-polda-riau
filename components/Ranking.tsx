"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { Trophy } from "lucide-react";
import { City } from "@/types";

interface CityWithScore extends City {
  finalScore: number;
}

const calculateRanking = (cities: City[]): CityWithScore[] => {
  // Cari Target Maksimum
  const maxMonokulturTarget = Math.max(
    ...cities.map((city) => city.monokulturTarget)
  );
  const maxTumpangSariTarget = Math.max(
    ...cities.map((city) => city.tumpangSariTarget)
  );

  // Hitung Skor untuk Setiap Kota
  const rankedCities = cities.map((city) => {
    // Hitung Total Capaian
    const totalMonokulturAchievements = city.companies.reduce(
      (sum, company) =>
        sum +
        company.monokulturAchievements.I +
        company.monokulturAchievements.II +
        company.monokulturAchievements.III +
        company.monokulturAchievements.IV,
      0
    );

    const totalTumpangSariAchievements = city.companies.reduce(
      (sum, company) =>
        sum +
        company.tumpangSariAchievements.I +
        company.tumpangSariAchievements.II +
        company.tumpangSariAchievements.III +
        company.tumpangSariAchievements.IV,
      0
    );

    // Hitung Persentase Capaian
    const monokulturPercentage = city.monokulturTarget
      ? (totalMonokulturAchievements / city.monokulturTarget) * 100
      : 0;
    const tumpangSariPercentage = city.tumpangSariTarget
      ? (totalTumpangSariAchievements / city.tumpangSariTarget) * 100
      : 0;

    // Hitung Bobot Target
    const monokulturTargetWeight = maxMonokulturTarget
      ? city.monokulturTarget / maxMonokulturTarget
      : 0;
    const tumpangSariTargetWeight = maxTumpangSariTarget
      ? city.tumpangSariTarget / maxTumpangSariTarget
      : 0;

    // Hitung Skor Final
    const finalScore =
      (0.7 * monokulturPercentage +
        0.3 * monokulturTargetWeight * 100 +
        0.7 * tumpangSariPercentage +
        0.3 * tumpangSariTargetWeight * 100) /
      2;

    return {
      ...city,
      finalScore,
    };
  });

  // Urutkan Berdasarkan Final Score
  rankedCities.sort((a, b) => b.finalScore - a.finalScore);

  return rankedCities;
};

const RankingComponent: React.FC<{ cities: City[] }> = ({ cities }) => {
  const [rankedCities, setRankedCities] = useState<CityWithScore[]>([]);

  useEffect(() => {
    // Kalkulasi Ranking dan Set State
    const ranking = calculateRanking(cities);
    setRankedCities(ranking);
  }, [cities]);

  return (
    <Card className="border-none rounded-xl shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="rounded-t-xl bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center text-xl gap-2 text-blue-600">
          <Trophy className="w-5 h-5 hidden md:block" />
          Perankingan Kab/Kota
        </CardTitle>
        <CardDescription>
          Hasil perankingan (<span className="italic">fairness method</span>)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-y-auto max-h-[500px]">
        <div className="py-2 px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="text-center font-semibold">No</TableCell>
                <TableCell className="p-4 font-semibold">Kab/Kota</TableCell>
                <TableCell className="p-4 text-center font-semibold">
                  Skor
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankedCities.map((city, index) => (
                <TableRow
                  key={city.id}
                  className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                >
                  <TableCell className="text-center font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell className="p-4">{city.nama}</TableCell>
                  <TableCell className="p-4 text-center">
                    {city.finalScore.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankingComponent;
