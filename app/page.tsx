"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Building2, Target, Map, MapPin, TargetIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { City, Company } from "@/types";
import { riauCity } from "@/data/RiauCity";
import { ScrollArea } from "@/components/ui/scroll-area";
import CompanyDetailsModal from "@/components/CompanyDetail";

const MapMarker = dynamic(() => import("@/components/MapMarker"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center bg-gray-100">
      <p>Loading...</p>
    </div>
  ),
});

const DashboardRiauPage = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTotalStats = () => {
    return riauCity.reduce(
      (acc, polres) => ({
        totalArea: acc.totalArea + polres.totalArea,
        monokulturTarget: acc.monokulturTarget + polres.monokulturTarget,
        tumpangSariTarget: acc.tumpangSariTarget + polres.tumpangSariTarget,
        totalTarget: acc.totalTarget + polres.totalTarget,
      }),
      {
        totalArea: 0,
        monokulturTarget: 0,
        tumpangSariTarget: 0,
        totalTarget: 0,
      }
    );
  };

  const stats = getTotalStats();

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Wilayah Riau
          </h1>
          <p className="text-gray-500 mt-1">
            Overview Statistik dan Data Perusahaan di Wilayah Riau
          </p>
        </div>
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Luas Keseluruhan Lahan
              </CardTitle>
              <MapPin className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {stats.totalArea.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <p className="text-xs text-gray-500">
                Total lahan diseluruh wilayah
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Target Monokultur
              </CardTitle>
              <Target className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {stats.monokulturTarget.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <p className="text-xs text-gray-500">
                2% dari total lahan diseluruh wilayah
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Target Tumpang Sari
              </CardTitle>
              <Target className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {stats.tumpangSariTarget.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <p className="text-xs text-gray-500">
                7% dari total lahan diseluruh wilayah
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Target
              </CardTitle>
              <TargetIcon className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {stats.totalTarget.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <p className="text-xs text-gray-500">
                2% monokultur + 7% tumpang sari
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {/* Map and Table Section */}
          <div className="col-span-12 lg:col-span-7">
            {/* Map Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-blue-500" />
                  Peta Sebaran Kota di Wilayah Riau
                </CardTitle>
                <CardDescription>
                  Pilih wilayah untuk melihat list dan detail perusahaan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MapMarker cities={riauCity} onCityClick={setSelectedCity} />
                {selectedCity && <h2>Kota Terpilih: {selectedCity.nama}</h2>}
              </CardContent>
            </Card>
          </div>
          {/* Company Table Section */}
          <div className="col-span-12 lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  {selectedCity
                    ? `Perusahaan di ${selectedCity.nama}`
                    : "Daftar Perusahaan"}
                </CardTitle>
                {selectedCity && (
                  <CardDescription>
                    Total {selectedCity.companies.length} Perusahaan. Pilih
                    perusahaan untuk melihat detail.
                  </CardDescription>
                )}
              </CardHeader>
              <ScrollArea className="h-[550px]">
                <CardContent>
                  {selectedCity ? (
                    <div>
                      {selectedCity.companies.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nama Perusahaan</TableHead>
                              <TableHead>Luas Lahan</TableHead>
                              <TableHead className="text-right">
                                Target 2%
                              </TableHead>
                              <TableHead className="text-right">
                                Target 7%
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedCity.companies.map((company) => (
                              <TableRow
                                key={company.id}
                                className={`hover:bg-gray-50 cursor-pointer ${
                                  selectedCompany?.id === company.id
                                    ? "bg-blue-50"
                                    : ""
                                }`}
                                onClick={() => handleCompanyClick(company)}
                              >
                                <TableCell className="font-medium">
                                  {company.name}
                                </TableCell>
                                <TableCell>
                                  {company.area.toLocaleString("id-ID", {
                                    maximumFractionDigits: 2,
                                  })}
                                </TableCell>
                                <TableCell className="text-right">
                                  {company.target2Percent.toLocaleString(
                                    "id-ID",
                                    { maximumFractionDigits: 4 }
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  {company.target7Percent.toLocaleString(
                                    "id-ID",
                                    { maximumFractionDigits: 4 }
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                          <Building2 className="w-12 h-12 mb-4 opacity-50" />
                          <p>Belum ada data perusahaan...</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                      <Map className="w-12 h-12 mb-4 opacity-50" />
                      <p>Pilih wilayah pada peta...</p>
                    </div>
                  )}
                </CardContent>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </div>
      {selectedCompany && (
        <CompanyDetailsModal
          company={selectedCompany}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DashboardRiauPage;
