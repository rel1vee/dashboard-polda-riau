"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { riauCity } from "@/data/RiauCity";
import NewRanking from "@/components/NewRanking";
import { City, Company, Polsek, Progress } from "@/types";
import PolsekDetailModal from "@/components/PolsekDetail";
import CompanyDetailsModal from "@/components/CompanyDetail";
import { Table, TableBody, TableRow } from "@/components/ui/table";
import OtherCompanyDetailsModal from "@/components/OtherCompanyDetail";
import {
  Building2,
  Map,
  TargetIcon,
  Sprout,
  Leaf,
  HandHeart,
  LandPlot,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const MapMarker = dynamic(() => import("@/components/MapMarker"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center bg-gray-100">
      <p className="text-black">Loading...</p>
    </div>
  ),
});

const MotionCard = motion.create(Card);

const DashboardRiauPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedPolsek, setSelectedPolsek] = useState<Polsek | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedCompanyProgress, setSelectedCompanyProgress] =
    useState<Progress | null>(null);
  const [selectedOtherCompany, setSelectedOtherCompany] =
    useState<Company | null>(null);
  const [selectedOtherCompanyProgress, setSelectedOtherCompanyProgress] =
    useState<Progress | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const getTotalStats = () => {
    return riauCity.reduce(
      (acc, polres) => {
        const polsekTarget = polres.polsek.reduce(
          (total, polsek) =>
            total +
            (polsek.villages?.reduce(
              (target, village) => target + (village.target || 0),
              0
            ) || 0),
          0
        );

        return {
          monokulturTarget: acc.monokulturTarget + polres.monokulturTarget,
          tumpangSariTarget: acc.tumpangSariTarget + polres.tumpangSariTarget,
          polsekTarget: acc.polsekTarget + polsekTarget,
        };
      },
      {
        monokulturTarget: 0,
        tumpangSariTarget: 0,
        polsekTarget: 0,
      }
    );
  };

  const getTotalAchievements = () => {
    return riauCity.reduce(
      (acc, polres) => {
        const allCompanies = [
          ...polres.companies,
          ...(polres.otherCompanies || []),
        ];

        const monoAchievement = allCompanies.reduce((sum, company) => {
          if (company.monokulturAchievements?.IV) {
            return sum + company.monokulturAchievements.IV;
          }
          return sum;
        }, 0);

        const tumpangSariAchievement = allCompanies.reduce((sum, company) => {
          if (company.tumpangSariAchievements?.IV) {
            return sum + company.tumpangSariAchievements.IV;
          }
          return sum;
        }, 0);

        const csrAchievement = allCompanies.reduce((sum, company) => {
          if (company.csrAchievements?.IV) {
            return sum + company.csrAchievements.IV;
          }
          return sum;
        }, 0);

        const polsekAchievement = polres.polsek.reduce(
          (total, polsek) =>
            total +
            (polsek.villages?.reduce(
              (achievement, village) =>
                achievement + (village.achievement || 0),
              0
            ) || 0),
          0
        );

        return {
          monokulturAchievement: acc.monokulturAchievement + monoAchievement,
          tumpangSariAchievement:
            acc.tumpangSariAchievement + tumpangSariAchievement,
          csrAchievement: acc.csrAchievement + csrAchievement,
          polsekAchievement: acc.polsekAchievement + polsekAchievement,
        };
      },
      {
        monokulturAchievement: 0,
        tumpangSariAchievement: 0,
        csrAchievement: 0,
        polsekAchievement: 0,
      }
    );
  };

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);

    const progressData =
      selectedCity?.progress?.find((p) => p.id === company.id) || null;

    setSelectedCompanyProgress(progressData);
    setIsModalOpen(true);
  };

  const handlePolsekClick = (polsek: Polsek) => {
    setSelectedPolsek(polsek);
    setIsModalOpen(true);
  };

  const handleOtherCompanyClick = (company: Company) => {
    setSelectedOtherCompany(company);

    const otherProgressData =
      selectedCity?.otherProgress?.find((p) => p.id === company.id) || null;

    setSelectedOtherCompanyProgress(otherProgressData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
    setSelectedOtherCompany(null);
    setSelectedPolsek(null);
  };

  const stats = getTotalStats();
  const achievements = getTotalAchievements();

  return (
    <div className="bg-gradient-to-l from-emerald-50 to-emerald-200">
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-6">
          {/* Header Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center md:gap-5 gap-0">
              <div>
                <Image
                  src="/favicon.ico"
                  alt="Polda Riau Logo"
                  width={75}
                  height={75}
                  className="md:block hidden"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Dashboard Ketahanan Pangan Polda Riau
                </h1>
                <p className="text-gray-500 mt-1">
                  Overview Statistik dan Data Perusahaan Provinsi Riau
                </p>
              </div>
            </div>
          </motion.div>
          {/* Stats Summary */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                title: "Monokultur",
                value: `${achievements.monokulturAchievement.toLocaleString(
                  "id-ID",
                  {
                    maximumFractionDigits: 2,
                  }
                )} dari ${stats.monokulturTarget.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}`,
                description: "Capaian dari Target Monokultur",
                icon: Leaf,
                gradient: "from-blue-500 to-sky-400",
              },
              {
                title: "Tumpang Sari",
                value: `${achievements.tumpangSariAchievement.toLocaleString(
                  "id-ID",
                  {
                    maximumFractionDigits: 2,
                  }
                )} dari ${stats.tumpangSariTarget.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}`,
                description: "Capaian dari Target Tumpang Sari",
                icon: Sprout,
                gradient: "from-orange-400 to-pink-500",
              },
              {
                title: "CSR",
                value: `${achievements.csrAchievement.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}`,
                description: "Capaian CSR",
                icon: LandPlot,
                gradient: "from-purple-400 to-pink-500",
              },
              {
                title: "POLSEK",
                value: `${achievements.polsekAchievement.toLocaleString(
                  "id-ID",
                  {
                    maximumFractionDigits: 2,
                  }
                )} dari ${stats.polsekTarget.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}`,
                description: "Capaian dari Target POLSEK",
                icon: HandHeart,
                gradient: "from-sky-400 to-purple-600",
              },
              {
                title: "Total Capaian",
                value: `${(
                  achievements.monokulturAchievement +
                  achievements.tumpangSariAchievement +
                  achievements.csrAchievement +
                  achievements.polsekAchievement
                ).toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })} dari ${(
                  stats.monokulturTarget +
                  stats.tumpangSariTarget +
                  stats.polsekTarget
                ).toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}`,
                description: "Monokultur + TS + CSR + POLSEK",
                icon: TargetIcon,
                gradient: "from-green-400 to-emerald-500",
              },
            ].map((stat, index) => (
              <MotionCard
                key={index}
                variants={cardVariants}
                className={`bg-gradient-to-r ${stat.gradient} text-white border-none rounded-xl shadow-lg hover:shadow-xl transition-all`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-xl font-bold">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="w-6 h-6 text-white opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold pr-6">{stat.value}</div>
                  <p className="text-xs opacity-80 mt-3">{stat.description}</p>
                </CardContent>
              </MotionCard>
            ))}
          </motion.div>
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-none">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center md:gap-3 gap-0 text-xl text-blue-600">
                  <Map className="w-6 h-6 hidden md:block" />
                  Peta Sebaran di Provinsi Riau
                </CardTitle>
                <CardDescription>
                  Pilih Kabupaten/Kota untuk Melihat Daftar dan Detail
                  Perusahaan
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MapMarker cities={riauCity} onCityClick={setSelectedCity} />
              </CardContent>
            </Card>
          </motion.div>
          {/* Ranking Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NewRanking />
          </motion.div>
          {/* Company Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-none rounded-xl shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="rounded-t-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center text-xl gap-0 md:gap-3 text-blue-600">
                    <Building2 className="w-5 h-5 hidden md:block" />
                    {selectedCity
                      ? `Perusahaan Target di ${selectedCity.nama}`
                      : "Daftar Perusahaan Target"}
                  </CardTitle>
                  {selectedCity ? (
                    <CardDescription>
                      Total {selectedCity.companies.length} Perusahaan Target.
                      Pilih Perusahaan untuk Melihat Detail.
                    </CardDescription>
                  ) : (
                    <CardDescription>
                      Pilih Kabupaten/Kota untuk Melihat Perusahaan Target
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="p-0 overflow-y-auto max-h-[500px]">
                  {selectedCity ? (
                    <div className="p-4">
                      {selectedCity.companies.length > 0 ? (
                        <Table>
                          <TableBody>
                            {selectedCity.companies
                              .map((company) => ({
                                ...company,
                                totalAchievements:
                                  company.monokulturAchievements.IV +
                                  company.tumpangSariAchievements.IV +
                                  (company.csrAchievements?.IV || 0),
                              }))
                              .sort(
                                (a, b) =>
                                  b.totalAchievements - a.totalAchievements
                              )
                              .map((company, index) => (
                                <TableRow
                                  key={company.id}
                                  className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                                  onClick={() => handleCompanyClick(company)}
                                >
                                  <motion.td
                                    variants={tableRowVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 font-medium uppercase"
                                  >
                                    {company.name}
                                  </motion.td>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <motion.div
                          className="flex flex-col items-center justify-center py-16 text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Building2 className="w-12 h-12 mb-4 opacity-50" />
                          <p>Tidak Ada Perusahaan Target...</p>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center py-16 text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Map className="w-12 h-12 mb-4 opacity-50" />
                      <p>Pilih Kabupaten/Kota...</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-none rounded-xl shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="rounded-t-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center text-xl gap-0 md:gap-3 text-blue-600">
                    <Building2 className="w-5 h-5 hidden md:block" />
                    {selectedCity
                      ? `Perusahaan Lain di ${selectedCity.nama}`
                      : "Daftar Perusahaan Lain"}
                  </CardTitle>
                  {selectedCity ? (
                    <CardDescription>
                      Total {selectedCity.otherCompanies?.length} Perusahaan
                      Lain. Pilih Perusahaan untuk Melihat Detail.
                    </CardDescription>
                  ) : (
                    <CardDescription>
                      Pilih Kabupaten/Kota untuk Melihat Perusahaan Lain
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="p-0 overflow-y-auto max-h-[500px]">
                  {selectedCity ? (
                    <div className="p-4">
                      {selectedCity.otherCompanies &&
                      selectedCity.otherCompanies.length > 0 ? (
                        <Table>
                          <TableBody>
                            {selectedCity.otherCompanies
                              .map((company) => ({
                                ...company,
                                totalAchievements:
                                  company.monokulturAchievements.IV +
                                  company.tumpangSariAchievements.IV +
                                  (company.csrAchievements?.IV || 0),
                              }))
                              .sort(
                                (a, b) =>
                                  b.totalAchievements - a.totalAchievements
                              )
                              .map((poktan, index) => (
                                <TableRow
                                  key={poktan.id}
                                  className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                                  onClick={() =>
                                    handleOtherCompanyClick(poktan)
                                  }
                                >
                                  <motion.td
                                    variants={tableRowVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 font-medium uppercase"
                                  >
                                    {poktan.name}
                                  </motion.td>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <motion.div
                          className="flex flex-col items-center justify-center py-16 text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Building2 className="w-12 h-12 mb-4 opacity-50" />
                          <p>Tidak Ada Perusahaan Lain</p>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center py-16 text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Map className="w-12 h-12 mb-4 opacity-50" />
                      <p>Pilih Kabupaten/Kota...</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-none rounded-xl shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="rounded-t-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center text-xl gap-0 md:gap-3 text-blue-600">
                    <Building2 className="w-5 h-5 hidden md:block" />
                    {selectedCity
                      ? `POLSEK di ${selectedCity.nama}`
                      : "Daftar POLSEK"}
                  </CardTitle>
                  {selectedCity ? (
                    <CardDescription>
                      Total {selectedCity.polsek.length} POLSEK. Pilih POLSEK
                      untuk Melihat Detail.
                    </CardDescription>
                  ) : (
                    <CardDescription>
                      Pilih Kabupaten/Kota untuk Melihat POLSEK
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="p-0 overflow-y-auto max-h-[500px]">
                  {selectedCity ? (
                    <div className="p-4">
                      {selectedCity.polsek.length > 0 ? (
                        <Table>
                          <TableBody>
                            {selectedCity.polsek
                              .map((polsek) => ({
                                ...polsek,
                                totalAchievements: polsek.villages
                                  ? polsek.villages.reduce(
                                      (total, village) =>
                                        total + village.achievement,
                                      0
                                    )
                                  : 0,
                              }))
                              .sort(
                                (a, b) =>
                                  b.totalAchievements - a.totalAchievements
                              )
                              .map((polsek, index) => (
                                <TableRow
                                  key={polsek.id}
                                  className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                                  onClick={() => handlePolsekClick(polsek)}
                                >
                                  <motion.td
                                    variants={tableRowVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 font-medium uppercase"
                                  >
                                    {polsek.name}
                                  </motion.td>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <motion.div
                          className="flex flex-col items-center justify-center py-16 text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Building2 className="w-12 h-12 mb-4 opacity-50" />
                          <p>Belum Ada Data POLSEK...</p>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center py-16 text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Map className="w-12 h-12 mb-4 opacity-50" />
                      <p>Pilih Kabupaten/Kota...</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        {selectedCompany && (
          <CompanyDetailsModal
            company={selectedCompany}
            progress={selectedCompanyProgress}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
        {selectedOtherCompany && (
          <OtherCompanyDetailsModal
            company={selectedOtherCompany}
            progress={selectedOtherCompanyProgress}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
        {selectedPolsek && (
          <PolsekDetailModal
            polsek={selectedPolsek}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </motion.div>
    </div>
  );
};

export default DashboardRiauPage;
