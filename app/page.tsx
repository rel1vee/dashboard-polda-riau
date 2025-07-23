"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { programDua } from "@/data/ProgramDua";
import { programSatu } from "@/data/ProgramSatu";
import ProgramDuaRanking from "@/components/program-dua/Ranking";
import ProgramSatuRanking from "@/components/program-satu/Ranking";
import PolsekDetailModal from "@/components/program-dua/PolsekDetail";
import CompanyDetailsModal from "@/components/program-dua/CompanyDetail";
import PolsekDesaOverviewModal from "@/components/program-satu/PolsekDesaModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OtherCompanyDetailsModal from "@/components/program-dua/OtherCompanyDetail";
import {
  ProgramDua,
  Company,
  Polsek,
  Progress,
  ProgramSatu,
  Pekarangan,
} from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const ProgramDuaMapMarker = dynamic(
  () => import("@/components/program-dua/MapMarker"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] flex items-center justify-center bg-gray-100">
        <p className="text-black">Loading...</p>
      </div>
    ),
  }
);

const ProgramSatuMapMarker = dynamic(
  () => import("@/components/program-satu/MapMarker"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] flex items-center justify-center bg-gray-100">
        <p className="text-black">Loading...</p>
      </div>
    ),
  }
);

const MotionCard = motion.create(Card);

const DashboardPoldaRiauPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCity, setSelectedCity] = useState<ProgramDua | null>(null);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [company1Data, setCompany1Data] = useState<Company | null>(null);
  const [company2Data, setCompany2Data] = useState<Company | null>(null);
  const [company3Data, setCompany3Data] = useState<Company | null>(null);

  const [selectedOtherCompany, setSelectedOtherCompany] =
    useState<Company | null>(null);
  const [otherCompany1Data, setOtherCompany1Data] = useState<Company | null>(
    null
  );
  const [otherCompany2Data, setOtherCompany2Data] = useState<Company | null>(
    null
  );
  const [otherCompany3Data, setOtherCompany3Data] = useState<Company | null>(
    null
  );

  const [selectedCompanyProgress, setSelectedCompanyProgress] =
    useState<Progress | null>(null);
  const [selectedOtherCompanyProgress, setSelectedOtherCompanyProgress] =
    useState<Progress | null>(null);

  const [selectedPolsek, setSelectedPolsek] = useState<Polsek | null>(null);

  const [selectedProgramSatuCity, setSelectedProgramSatuCity] =
    useState<ProgramSatu | null>(null);
  const [selectedPolsekDesa, setSelectedPolsekDesa] =
    useState<Pekarangan | null>(null);

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

  const getTotalTargets = () => {
    return programDua.reduce(
      (acc, polres) => {
        const polsekTarget = polres.polsek10.reduce(
          (total, polsek) =>
            total +
            (polsek.villages.reduce(
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
    return programDua.reduce(
      (acc, polres) => {
        const allCompanies = [
          ...polres.tahapIV.companies,
          ...(polres.tahapIV.otherCompanies || []),
        ];

        const monoAchievement = allCompanies.reduce((sum, company) => {
          if (company.monokulturAchievements.I) {
            return sum + company.monokulturAchievements.I;
          }
          return sum;
        }, 0);

        const tumpangSariAchievement = allCompanies.reduce((sum, company) => {
          if (company.tumpangSariAchievements.I) {
            return sum + company.tumpangSariAchievements.I;
          }
          return sum;
        }, 0);

        const csrAchievement = allCompanies.reduce((sum, company) => {
          if (company.csrAchievements.I) {
            return sum + company.csrAchievements.I;
          }
          return sum;
        }, 0);

        const polsekAchievement = polres.polsek10.reduce(
          (total, polsek) =>
            total +
            (polsek.villages.reduce(
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
      selectedCity?.progress.find((p) => p.id === company.id) || null;

    const company1 =
      selectedCity?.tahapI.companies.find((p) => p.id === company.id) || null;

    const company2 =
      selectedCity?.tahapII.companies.find((p) => p.id === company.id) || null;

    const company3 =
      selectedCity?.tahapIII.companies.find((p) => p.id === company.id) || null;

    setSelectedCompanyProgress(progressData);
    setCompany1Data(company1);
    setCompany2Data(company2);
    setCompany3Data(company3);
    setIsModalOpen(true);
  };

  const handlePolsekClick = (polsek: Polsek) => {
    setSelectedPolsek(polsek);
    setIsModalOpen(true);
  };

  const handleOtherCompanyClick = (company: Company) => {
    setSelectedOtherCompany(company);

    const otherProgressData =
      selectedCity?.otherProgress.find((p) => p.id === company.id) || null;

    const otherCompany1 =
      selectedCity?.tahapI.otherCompanies.find((p) => p.id === company.id) ||
      null;

    const otherCompany2 =
      selectedCity?.tahapII.otherCompanies.find((p) => p.id === company.id) ||
      null;

    const otherCompany3 =
      selectedCity?.tahapIII.otherCompanies.find((p) => p.id === company.id) ||
      null;

    setSelectedOtherCompanyProgress(otherProgressData);
    setOtherCompany1Data(otherCompany1);
    setOtherCompany2Data(otherCompany2);
    setOtherCompany3Data(otherCompany3);
    setIsModalOpen(true);
  };

  const handlePolsekDesaClick = (polsekDesa: Pekarangan) => {
    setSelectedPolsekDesa(polsekDesa);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
    setSelectedOtherCompany(null);
    setSelectedPolsek(null);
    setSelectedPolsekDesa(null);
  };

  const targets = getTotalTargets();
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
          {/* Tab Program */}
          <Tabs defaultValue="program-dua" className="w-full">
            <TabsList className="grid w-full bg-blue-100 h-auto grid-cols-1 md:grid-cols-3 gap-2 mb-4">
              <TabsTrigger value="program-satu">PROGRAM I</TabsTrigger>
              <TabsTrigger value="program-dua">PROGRAM II</TabsTrigger>
              <TabsTrigger value="tanam-panen-jagung">
                LAHAN TANAM & PANEN JAGUNG
              </TabsTrigger>
            </TabsList>
            {/* Program Satu*/}
            <TabsContent value="program-satu" className="flex flex-col gap-6">
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
                      Pilih POLRES/TA untuk Melihat Daftar dan Detail Pekarangan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ProgramSatuMapMarker
                      cities={programSatu}
                      onCityClick={setSelectedProgramSatuCity}
                    />
                  </CardContent>
                </Card>
              </motion.div>
              {/* Ranking Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ProgramSatuRanking />
              </motion.div>
              {/* POLRES dan POLSEK Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-none rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <CardHeader className="rounded-t-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="flex items-center text-xl gap-0 md:gap-3 text-blue-600">
                      <Building2 className="w-5 h-5 hidden md:block" />
                      {selectedProgramSatuCity
                        ? `POLRES 2 Kecamatan di ${selectedProgramSatuCity.nama}`
                        : "Daftar POLRES 2 Kecamatan"}
                    </CardTitle>
                    {selectedProgramSatuCity ? (
                      <CardDescription>
                        Total {selectedProgramSatuCity.polresKecamatan.length}{" "}
                        POLRES 2 Kecamatan.
                      </CardDescription>
                    ) : (
                      <CardDescription>
                        Pilih POLRES/TA untuk Melihat POLRES 2 Kecamatan
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="p-0 overflow-y-auto max-h-[500px]">
                    {selectedProgramSatuCity ? (
                      <div className="p-4">
                        {selectedProgramSatuCity.polresKecamatan.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-100">
                                <TableHead className="p-4 text-center font-bold uppercase">
                                  No
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Kecamatan
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Desa/Kelurahan
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Pemilik
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Polisi
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Pangkat
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Jabatan
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Percontohan
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Jenis Pekarangan
                                </TableHead>
                                <TableHead className="uppercase px-8 font-bold text-center">
                                  Keterangan
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedProgramSatuCity.polresKecamatan.map(
                                (pekarangan, index) => (
                                  <TableRow
                                    key={pekarangan.id}
                                    className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                                  >
                                    <motion.td
                                      className="p-4 text-center"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: index * 0.1 }}
                                    >
                                      {index + 1}
                                    </motion.td>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.kecamatan}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.desa}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.namaPemilik}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.namaPolisi}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.pangkat}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.jabatan}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.percontohan}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.jenisPekarangan}
                                    </TableCell>
                                    <TableCell className="px-8 text-center">
                                      {pekarangan.keterangan}
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
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
                            <p>Tidak Ada Data Polres 2 Kecamatan...</p>
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
                        <p>Pilih POLRES/TA...</p>
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
                      {selectedProgramSatuCity
                        ? `POLSEK 2 Desa di ${selectedProgramSatuCity.nama}`
                        : "Daftar POLSEK 2 Desa"}
                    </CardTitle>
                    {selectedProgramSatuCity ? (
                      <CardDescription>
                        Total {selectedProgramSatuCity.polsekDesa.length} POLSEK
                        2 Desa.
                      </CardDescription>
                    ) : (
                      <CardDescription>
                        Pilih POLRES/TA untuk Melihat POLSEK 2 Desa
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="p-0 overflow-y-auto max-h-[500px]">
                    {selectedProgramSatuCity ? (
                      <div className="p-4">
                        {selectedProgramSatuCity.polsekDesa.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-100">
                                <TableHead className="p-4 text-center font-bold uppercase">
                                  No
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Polsek
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Kecamatan
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Desa/Kelurahan
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Polisi
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Pangkat
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Jabatan
                                </TableHead>
                                <TableHead className="px-2 uppercase font-bold text-center">
                                  Nomor HP
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedProgramSatuCity.polsekDesa.map(
                                (pekarangan, index) => (
                                  <TableRow
                                    key={pekarangan.id}
                                    className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                                    onClick={() =>
                                      handlePolsekDesaClick(pekarangan)
                                    }
                                  >
                                    <motion.td
                                      className="p-4 text-center"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: index * 0.1 }}
                                    >
                                      {index + 1}
                                    </motion.td>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.polsek}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.kecamatan}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.desa}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.namaPolisi}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.pangkat}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.jabatan}
                                    </TableCell>
                                    <TableCell className="px-2 text-center">
                                      {pekarangan.nomorHP}
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
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
                            <p>Tida Ada Data POLSEK 2 DESA...</p>
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
                        <p>Pilih POLRES/TA...</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
              {/* Desa Section */}
              {/* <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-none rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <CardHeader className="rounded-t-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="flex items-center text-xl gap-0 md:gap-3 text-blue-600">
                      <Building2 className="w-5 h-5 hidden md:block" />
                      {selectedProgramSatuCity
                        ? `Pekarangan Pangan di ${selectedProgramSatuCity.nama}`
                        : "Daftar Pekarangan Pangan"}
                    </CardTitle>
                    {selectedProgramSatuCity ? (
                      <CardDescription>
                        Total {selectedProgramSatuCity.pekarangan.length}{" "}
                        Pekarangan Pangan.
                      </CardDescription>
                    ) : (
                      <CardDescription>
                        Pilih POLRES/TA untuk Melihat Pekarangan Pangan
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="p-0 overflow-y-auto max-h-[1000px]">
                    {selectedProgramSatuCity ? (
                      <div className="p-4">
                        {selectedProgramSatuCity.pekarangan.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-100">
                                <TableHead className="p-4 text-center uppercase">
                                  No
                                </TableHead>
                                <TableHead className="uppercase text-center">
                                  Kecamatan
                                </TableHead>
                                <TableHead className="uppercase text-center">
                                  Desa/Kelurahan
                                </TableHead>
                                <TableHead className="uppercase text-center">
                                  Polisi Penggerak
                                </TableHead>
                                <TableHead className="uppercase text-center">
                                  Pangkat
                                </TableHead>
                                <TableHead className="uppercase text-center">
                                  Jabatan
                                </TableHead>
                                <TableHead className="uppercase text-center">
                                  Percontohan
                                </TableHead>
                                <TableHead className="uppercase text-center">
                                  Keterangan
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedProgramSatuCity.pekarangan.map(
                                (pekarangan, index) => (
                                  <TableRow
                                    key={pekarangan.id}
                                    className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                                  >
                                    <motion.td
                                      className="p-4 text-center"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: index * 0.1 }}
                                    >
                                      {index + 1}
                                    </motion.td>
                                    <TableCell className="text-center">
                                      {pekarangan.kecamatan}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {pekarangan.desa}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {pekarangan.namaPolisi}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {pekarangan.pangkat}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {pekarangan.jabatan}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {pekarangan.percontohan}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {pekarangan.keterangan}
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
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
                            <p>Belum Ada Pekarangan Pangan...</p>
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
                        <p>Pilih POLRES/TA...</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div> */}
            </TabsContent>
            {/* Program Dua*/}
            <TabsContent value="program-dua" className="flex flex-col gap-6">
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
                    )} dari ${targets.monokulturTarget.toLocaleString("id-ID", {
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
                    )} dari ${targets.tumpangSariTarget.toLocaleString(
                      "id-ID",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}`,
                    description: "Capaian dari Target Tumpang Sari",
                    icon: Sprout,
                    gradient: "from-orange-400 to-pink-500",
                  },
                  {
                    title: "CSR",
                    value: `${achievements.csrAchievement.toLocaleString(
                      "id-ID",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}`,
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
                    )} dari ${targets.polsekTarget.toLocaleString("id-ID", {
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
                      targets.monokulturTarget +
                      targets.tumpangSariTarget +
                      targets.polsekTarget
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
                      <div className="text-2xl font-bold pr-6">
                        {stat.value}
                      </div>
                      <p className="text-xs opacity-80 mt-3">
                        {stat.description}
                      </p>
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
                    <ProgramDuaMapMarker
                      cities={programDua}
                      onCityClick={setSelectedCity}
                    />
                  </CardContent>
                </Card>
              </motion.div>
              {/* Ranking Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ProgramDuaRanking />
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
                          Total {selectedCity.tahapIV.companies.length}{" "}
                          Perusahaan Target. Pilih Perusahaan untuk Melihat
                          Detail.
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
                          {selectedCity.tahapIV.companies.length > 0 ? (
                            <Table>
                              <TableBody>
                                {selectedCity.tahapIV.companies
                                  .map((company) => ({
                                    ...company,
                                    totalAchievements:
                                      company.monokulturAchievements.I +
                                      company.tumpangSariAchievements.I +
                                      company.csrAchievements.I,
                                  }))
                                  .sort(
                                    (a, b) =>
                                      b.totalAchievements - a.totalAchievements
                                  )
                                  .map((company, index) => (
                                    <TableRow
                                      key={company.id}
                                      className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                                      onClick={() =>
                                        handleCompanyClick(company)
                                      }
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
                          Total {selectedCity.tahapIV.otherCompanies.length}{" "}
                          Perusahaan Lain. Pilih Perusahaan untuk Melihat
                          Detail.
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
                          {selectedCity.tahapIV.otherCompanies &&
                          selectedCity.tahapIV.otherCompanies.length > 0 ? (
                            <Table>
                              <TableBody>
                                {selectedCity.tahapIV.otherCompanies
                                  .map((company) => ({
                                    ...company,
                                    totalAchievements:
                                      company.monokulturAchievements.I +
                                      company.tumpangSariAchievements.I +
                                      company.csrAchievements.I,
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
                          Total {selectedCity.polsek10.length} POLSEK. Pilih
                          POLSEK untuk Melihat Detail.
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
                          {selectedCity.polsek10.length > 0 ? (
                            <Table>
                              <TableBody>
                                {selectedCity.polsek10
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
            </TabsContent>
            {/* Lahan Tanam & Panen Jagung */}
            <TabsContent
              value="tanam-panen-jagung"
              className="flex flex-col gap-6"
            >
              {/* Statistik Ringkas */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {[
                  {
                    label: "Lahan Milik POLRI",
                    value: "20,16",
                    color: "from-gray-700 to-gray-900",
                  },
                  {
                    label: "Poktan Binaan POLRI",
                    value: "317,53",
                    color: "from-sky-400 to-blue-500",
                  },
                  {
                    label: "Masy/Swasta Binaan POLRI",
                    value: "410,68",
                    color: "from-cyan-700 to-blue-400",
                  },
                  {
                    label: "Perkebunan Tumpang Sari",
                    value: "342,72",
                    color: "from-yellow-400 to-orange-400",
                  },
                  {
                    label: "Perhutanan Sosial",
                    value: "6",
                    color: "from-red-400 to-pink-500",
                  },
                  {
                    label: "Perhutani/Inhutani",
                    value: "0",
                    color: "from-gray-300 to-gray-400",
                  },
                  {
                    label: "Lahan Lainnya",
                    value: "0",
                    color: "from-green-600 to-emerald-500",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 rounded-xl shadow-md bg-gradient-to-br ${item.color} border-l-8 border-transparent hover:scale-[1.03] transition-transform duration-200`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-white/90 uppercase drop-shadow">
                        {item.label}
                      </div>
                      <div className="text-2xl font-bold text-white drop-shadow">
                        {item.value}{" "}
                        <span className="text-sm font-normal">Hektar</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
              {/* Tabel Rekapitulasi */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="rounded-xl shadow-lg border-none overflow-x-auto">
                  <CardHeader className="bg-gradient-to-r from-green-100 via-emerald-100 to-lime-100 rounded-t-xl">
                    <CardTitle className="text-xl bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 bg-clip-text text-transparent flex items-center gap-2">
                      <span className="font-bold">
                        Rekapitulasi Lahan Jagung Per Jenis Lahan
                      </span>
                    </CardTitle>
                    <CardDescription className="text-emerald-700">
                      Total luas lahan yang telah ditanam jagung per jenis lahan
                      di seluruh POLRES/TA.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-green-200 via-emerald-100 to-lime-100 text-xs">
                            <TableHead className="text-center font-bold text-emerald-800">
                              NO
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              POLDA
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              Lahan Milik POLRI
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              Poktan Binaan POLRI
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              Masy/Swasta Binaan POLRI
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              Perkebunan Tumpang Sari
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              Perhutanan Sosial
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              Perhutani/Inhutani
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              Lainnya
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              TOTAL
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            [
                              "1",
                              "POLRESTA PEKANBARU",
                              "0,00",
                              "5,47",
                              "31,50",
                              "0,00",
                              "0,00",
                              "0,00",
                              "0,00",
                              "36,97",
                            ],
                            [
                              "2",
                              "POLRES ROHIL",
                              "0,00",
                              "46,74",
                              "16,00",
                              "40,00",
                              "0,00",
                              "0,00",
                              "0,00",
                              "102,74",
                            ],
                            [
                              "3",
                              "POLRES SIAK",
                              "1,91",
                              "1,00",
                              "23,24",
                              "25,50",
                              "0,00",
                              "0,00",
                              "0,00",
                              "51,65",
                            ],
                            [
                              "4",
                              "POLRES KAMPAR",
                              "13,50",
                              "67,25",
                              "23,19",
                              "45,31",
                              "0,00",
                              "0,00",
                              "0,00",
                              "149,25",
                            ],
                            [
                              "5",
                              "POLRES INHU",
                              "0,00",
                              "33,38",
                              "51,00",
                              "15,00",
                              "0,00",
                              "0,00",
                              "0,00",
                              "99,38",
                            ],
                            [
                              "6",
                              "POLRES INHIL",
                              "0,00",
                              "100,65",
                              "18,50",
                              "32,00",
                              "0,00",
                              "0,00",
                              "0,00",
                              "151,15",
                            ],
                            [
                              "7",
                              "POLRES PELALAWAN",
                              "0,00",
                              "0,00",
                              "86,39",
                              "0,00",
                              "0,00",
                              "0,00",
                              "0,00",
                              "86,39",
                            ],
                            [
                              "8",
                              "POLRES BENGKALIS",
                              "2,75",
                              "21,54",
                              "10,46",
                              "60,00",
                              "1,00",
                              "0,00",
                              "0,00",
                              "95,75",
                            ],
                            [
                              "9",
                              "POLRES ROHUL",
                              "0,50",
                              "0,00",
                              "49,00",
                              "83,41",
                              "4,00",
                              "0,00",
                              "0,00",
                              "136,91",
                            ],
                            [
                              "10",
                              "POLRES KUANSING",
                              "0,00",
                              "0,00",
                              "63,90",
                              "39,50",
                              "0,00",
                              "0,00",
                              "0,00",
                              "103,40",
                            ],
                            [
                              "11",
                              "POLRES KEP. MERANTI",
                              "0,00",
                              "22,00",
                              "31,50",
                              "0,00",
                              "0,00",
                              "0,00",
                              "0,00",
                              "53,50",
                            ],
                            [
                              "12",
                              "POLRES DUMAI",
                              "1,50",
                              "19,50",
                              "6,00",
                              "2,00",
                              "1,00",
                              "0,00",
                              "0,00",
                              "30,00",
                            ],
                          ].map((row, idx) => (
                            <TableRow
                              key={idx}
                              className="hover:bg-gradient-to-r hover:from-green-50 hover:to-lime-50 text-xs transition-colors"
                            >
                              {row.map((cell, cidx) => (
                                <TableCell
                                  key={cidx}
                                  className={`text-center ${
                                    cidx === 1
                                      ? "font-semibold uppercase text-emerald-700"
                                      : "text-emerald-900"
                                  }`}
                                >
                                  {cell}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                          {/* Baris Jumlah */}
                          <TableRow className="bg-gradient-to-r from-green-300 via-emerald-200 to-lime-200 font-bold text-xs">
                            <TableCell
                              className="text-center text-emerald-900"
                              colSpan={2}
                            >
                              JUMLAH
                            </TableCell>
                            <TableCell className="text-center text-emerald-900">
                              20,16
                            </TableCell>
                            <TableCell className="text-center text-emerald-900">
                              317,53
                            </TableCell>
                            <TableCell className="text-center text-emerald-900">
                              410,68
                            </TableCell>
                            <TableCell className="text-center text-emerald-900">
                              342,72
                            </TableCell>
                            <TableCell className="text-center text-emerald-900">
                              6,00
                            </TableCell>
                            <TableCell className="text-center text-emerald-900">
                              0,00
                            </TableCell>
                            <TableCell className="text-center text-emerald-900">
                              0,00
                            </TableCell>
                            <TableCell className="text-center text-emerald-900">
                              1.097,09
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              {/* Statistik Ringkas */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {[
                  {
                    label: "TOTAL LUAS PEMBUKAAN LAHAN BARU",
                    value: "8.024,88",
                    satuan: "HEKTAR",
                    bg: "bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100",
                    border: "border-red-300",
                    text: "text-red-700",
                  },
                  {
                    label:
                      "TOTAL LUAS LAHAN YANG DITANAM JAGUNG DILAHAN YANG BARU DIBUKA",
                    value: "1.097,34",
                    satuan: "HEKTAR",
                    bg: "bg-gradient-to-br from-yellow-100 via-amber-100 to-lime-100",
                    border: "border-yellow-300",
                    text: "text-yellow-700",
                  },
                  {
                    label: "TOTAL LUAS LAHAN YANG DIPANEN",
                    value: "260,02",
                    satuan: "HEKTAR",
                    bg: "bg-gradient-to-br from-emerald-100 via-green-100 to-lime-100",
                    border: "border-emerald-400",
                    text: "text-emerald-700",
                  },
                  {
                    label:
                      "TOTAL LUAS LAHAN YANG DITANAM KEMBALI SETELAH PANEN",
                    value: "25,15",
                    satuan: "HEKTAR",
                    bg: "bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100",
                    border: "border-blue-400",
                    text: "text-blue-700",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-5 rounded-xl shadow-md border-2 ${item.border} ${item.bg} hover:scale-[1.03] transition-transform duration-200`}
                  >
                    <div>
                      <div className={`text-2xl font-bold ${item.text}`}>
                        {item.value}{" "}
                        <span className="text-base font-normal">
                          {item.satuan}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-gray-700 mt-1 uppercase">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
              {/* Statistik Per Bulan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="rounded-xl shadow-lg border-none overflow-x-auto">
                  <CardHeader className="bg-gradient-to-r from-green-100 via-emerald-100 to-lime-100 rounded-t-xl">
                    <CardTitle className="text-xl bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 bg-clip-text text-transparent flex items-center gap-2">
                      <span className="font-bold">
                        Rekapitulasi Total Luas Lahan Per Bulan (Nov 2024 - Jul
                        2025)
                      </span>
                    </CardTitle>
                    <CardDescription className="text-emerald-700">
                      Statistik bulanan lahan baru, lahan ditanam, lahan
                      dipanen, dan lahan ditanam kembali.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-green-200 via-emerald-100 to-lime-100 text-xs">
                            <TableHead className="text-center font-bold text-emerald-800">
                              BULAN
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              LAHAN BARU
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              LAHAN YANG DITANAM
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              LAHAN YANG DIPANEN
                            </TableHead>
                            <TableHead className="text-center font-bold text-emerald-800">
                              LAHAN YANG DITANAM KEMBALI
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            ["NOV 2024", "226,84", "24,18", "", ""],
                            ["DES 2024", "159,45", "12,00", "", ""],
                            ["JAN 2025", "1.080,48", "135,57", "2,12", "1,00"],
                            ["FEB 2025", "1.574,60", "240,63", "16,56", "0,50"],
                            ["MAR 2025", "1.999,10", "219,72", "19,00", "0,00"],
                            ["APR 2025", "1.254,31", "114,96", "21,91", "0,00"],
                            ["MEI 2025", "727,80", "150,83", "52,38", "5,00"],
                            ["JUN 2025", "417,12", "88,60", "92,30", "5,40"],
                            ["JUL 2025", "585,18", "110,85", "55,75", "13,25"],
                          ].map((row, idx) => (
                            <TableRow
                              key={idx}
                              className="hover:bg-gradient-to-r hover:from-green-50 hover:to-lime-50 text-xs transition-colors"
                            >
                              {row.map((cell, cidx) => (
                                <TableCell
                                  key={cidx}
                                  className={`text-center ${
                                    cidx === 0
                                      ? "font-semibold uppercase text-emerald-700"
                                      : "text-emerald-900"
                                  }`}
                                >
                                  {cell}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                          {/* Baris Jumlah */}
                          <TableRow className="bg-gradient-to-r from-green-300 via-emerald-200 to-lime-200 font-bold text-xs">
                            <TableCell className="text-center text-emerald-900">
                              JUMLAH
                            </TableCell>
                            <TableCell className="text-center text-emerald-900">
                              8.024,88
                            </TableCell>
                            <TableCell className="text-center text-emerald-900">
                              1.097,34
                            </TableCell>
                            <TableCell className="text-center text-emerald-900">
                              260,02
                            </TableCell>
                            <TableCell className="text-center text-emerald-900">
                              25,15
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              {/* TABEL DATA PER POLRES PER BULAN */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="rounded-xl shadow-lg border-none overflow-x-auto">
                  <CardHeader className="bg-gradient-to-r from-green-100 via-emerald-100 to-lime-100 rounded-t-xl">
                    <CardTitle className="text-lg md:text-xl bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 bg-clip-text text-transparent flex items-center gap-2">
                      <span className="font-bold">
                        Rekapitulasi Data Lahan Jagung Per POLRES & Bulan (Nov
                        2024 - Jul 2025)
                      </span>
                    </CardTitle>
                    <CardDescription className="text-emerald-700">
                      Data detail per POLRES, per bulan, untuk seluruh kategori
                      lahan.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-green-200 via-emerald-100 to-lime-100 text-xs">
                            <TableHead
                              className="text-center font-bold text-emerald-800"
                              rowSpan={2}
                            >
                              NO
                            </TableHead>
                            <TableHead
                              className="text-center font-bold text-emerald-800"
                              rowSpan={2}
                            >
                              POLRES
                            </TableHead>
                            {/* Bulan */}
                            <TableHead
                              className="text-center font-bold text-emerald-800"
                              colSpan={4}
                            >
                              NOV 2024
                            </TableHead>
                            <TableHead
                              className="text-center font-bold text-emerald-800"
                              colSpan={4}
                            >
                              DES 2024
                            </TableHead>
                            <TableHead
                              className="text-center font-bold text-emerald-800"
                              colSpan={4}
                            >
                              JAN 2025
                            </TableHead>
                            <TableHead
                              className="text-center font-bold text-emerald-800"
                              colSpan={4}
                            >
                              FEB 2025
                            </TableHead>
                            <TableHead
                              className="text-center font-bold text-emerald-800"
                              colSpan={4}
                            >
                              MAR 2025
                            </TableHead>
                            <TableHead
                              className="text-center font-bold text-emerald-800"
                              colSpan={4}
                            >
                              APR 2025
                            </TableHead>
                            <TableHead
                              className="text-center font-bold text-emerald-800"
                              colSpan={4}
                            >
                              MEI 2025
                            </TableHead>
                            <TableHead
                              className="text-center font-bold text-emerald-800"
                              colSpan={4}
                            >
                              JUN 2025
                            </TableHead>
                            <TableHead
                              className="text-center font-bold text-emerald-800"
                              colSpan={4}
                            >
                              JUL 2025
                            </TableHead>
                          </TableRow>
                          <TableRow className="bg-gradient-to-r from-green-100 via-emerald-50 to-lime-50 text-xs">
                            {Array.from({ length: 9 }, (_, i) => [
                              <TableHead
                                key={`bulan${i}-baru`}
                                className="text-center font-bold text-emerald-700"
                              >
                                Baru
                              </TableHead>,
                              <TableHead
                                key={`bulan${i}-tanam`}
                                className="text-center font-bold text-emerald-700"
                              >
                                Tanam
                              </TableHead>,
                              <TableHead
                                key={`bulan${i}-panen`}
                                className="text-center font-bold text-emerald-700"
                              >
                                Panen
                              </TableHead>,
                              <TableHead
                                key={`bulan${i}-ulang`}
                                className="text-center font-bold text-emerald-700"
                              >
                                Tanam Ulang
                              </TableHead>,
                            ])}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            [
                              "1",
                              "POLRESTA PEKANBARU",
                              "1,32",
                              "1,32",
                              "",
                              "",
                              "0",
                              "0",
                              "",
                              "",
                              "4,5",
                              "4,5",
                              "0,12",
                              "0",
                              "429,25",
                              "8,25",
                              "1,2",
                              "0",
                              "0,25",
                              "6,73",
                              "0",
                              "0",
                              "37",
                              "10",
                              "0,25",
                              "0",
                              "0,15",
                              "0,15",
                              "2,25",
                              "0",
                              "2",
                              "7",
                              "0",
                              "0",
                              "2,5",
                              "7,5",
                              "0",
                              "0",
                            ],
                            [
                              "2",
                              "POLRES ROHIL",
                              "0",
                              "0",
                              "",
                              "",
                              "0",
                              "36,2",
                              "",
                              "",
                              "48,4",
                              "11,72",
                              "0",
                              "0",
                              "113,3",
                              "39",
                              "0",
                              "0",
                              "200,4",
                              "32,52",
                              "0",
                              "0",
                              "36",
                              "1,5",
                              "0",
                              "0",
                              "78,4",
                              "1,3",
                              "3,52",
                              "0",
                              "84,12",
                              "1,5",
                              "20,12",
                              "0",
                              "78,34",
                              "8,5",
                              "9",
                              "0",
                            ],
                            [
                              "3",
                              "POLRES SIAK",
                              "0",
                              "0",
                              "",
                              "",
                              "0",
                              "0",
                              "",
                              "",
                              "0",
                              "0",
                              "0",
                              "0",
                              "120",
                              "11,5",
                              "0",
                              "0",
                              "121",
                              "36",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "120",
                              "1,5",
                              "1,5",
                              "0",
                              "34,1",
                              "1,5",
                              "9,5",
                              "0",
                            ],
                            [
                              "4",
                              "POLRES KAMPAR",
                              "141,11",
                              "15,25",
                              "",
                              "",
                              "0",
                              "0",
                              "",
                              "",
                              "133,74",
                              "91,01",
                              "0",
                              "0",
                              "82,5",
                              "20,21",
                              "3,25",
                              "0",
                              "227,9",
                              "36,7",
                              "12",
                              "0",
                              "397,8",
                              "33,5",
                              "2,7",
                              "0",
                              "1",
                              "13,5",
                              "4",
                              "0",
                              "20,8",
                              "13,24",
                              "3,1",
                              "2,9",
                              "30,5",
                              "15,7",
                              "9",
                              "0",
                            ],
                            [
                              "5",
                              "POLRES INHU",
                              "1,2",
                              "1,2",
                              "",
                              "",
                              "1,5",
                              "1,5",
                              "",
                              "",
                              "113,2",
                              "113,2",
                              "0",
                              "0",
                              "77,95",
                              "23,95",
                              "0",
                              "0",
                              "505,49",
                              "48,5",
                              "0",
                              "0",
                              "420,65",
                              "18,1",
                              "2,7",
                              "0",
                              "254,35",
                              "23,15",
                              "2,5",
                              "0",
                              "5",
                              "9,65",
                              "0",
                              "0",
                              "2,5",
                              "4",
                              "1",
                              "0",
                            ],
                            [
                              "6",
                              "POLRES INHIL",
                              "1,2",
                              "1,2",
                              "",
                              "",
                              "1,5",
                              "1,5",
                              "",
                              "",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "317,3",
                              "33,5",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "1",
                              "1",
                              "0",
                              "0",
                              "2,5",
                              "1,5",
                              "1",
                              "0",
                            ],
                            [
                              "7",
                              "POLRES PELALAWAN",
                              "64,6",
                              "13,6",
                              "",
                              "",
                              "0",
                              "0",
                              "",
                              "",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "64,6",
                              "13,6",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                            ],
                            [
                              "8",
                              "POLRES BENGKALIS",
                              "80,2",
                              "19,6",
                              "",
                              "",
                              "0",
                              "0",
                              "",
                              "",
                              "0",
                              "0",
                              "0",
                              "0",
                              "36,1",
                              "4",
                              "0,5",
                              "0",
                              "15",
                              "16,5",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0,257",
                              "0",
                              "0",
                              "0",
                              "3,01",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                            ],
                            [
                              "9",
                              "POLRES ROHUL",
                              "150",
                              "7",
                              "",
                              "",
                              "0",
                              "0",
                              "",
                              "",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "150",
                              "7",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "21,5",
                              "5,5",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                            ],
                            [
                              "10",
                              "POLRES KUANSING",
                              "223,72",
                              "7",
                              "",
                              "",
                              "0",
                              "0",
                              "",
                              "",
                              "0",
                              "0",
                              "0",
                              "0",
                              "224,32",
                              "4,1",
                              "0",
                              "0",
                              "14",
                              "7",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                            ],
                            [
                              "11",
                              "POLRES KEP. MERANTI",
                              "5,5",
                              "1,5",
                              "",
                              "",
                              "0",
                              "0",
                              "",
                              "",
                              "60,5",
                              "0,5",
                              "0",
                              "0",
                              "114,25",
                              "0,5",
                              "0",
                              "0",
                              "4",
                              "1,3",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "3",
                              "1,3",
                              "0",
                              "0",
                              "4,5",
                              "4,5",
                              "2",
                              "0",
                            ],
                            [
                              "12",
                              "POLRES DUMAI",
                              "95,25",
                              "1,9",
                              "",
                              "",
                              "31,1",
                              "1,25",
                              "",
                              "",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "2,5",
                              "1,9",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "0",
                              "2,5",
                              "1,9",
                              "0,25",
                              "0",
                              "2,5",
                              "1,9",
                              "0,25",
                              "0",
                            ],
                          ].map((row, idx) => (
                            <TableRow
                              key={idx}
                              className="hover:bg-gradient-to-r hover:from-green-50 hover:to-lime-50 text-xs transition-colors"
                            >
                              <TableCell className="text-center font-semibold text-emerald-700">
                                {row[0]}
                              </TableCell>
                              <TableCell className="text-center font-semibold uppercase text-emerald-700">
                                {row[1]}
                              </TableCell>
                              {row.slice(2).map((cell, cidx) => (
                                <TableCell
                                  key={cidx}
                                  className="text-center text-emerald-900"
                                >
                                  {cell}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                          <TableRow className="bg-gradient-to-r from-green-300 via-emerald-200 to-lime-200 font-bold text-xs">
                            <TableCell
                              className="text-center text-emerald-900"
                              colSpan={2}
                            >
                              JUMLAH
                            </TableCell>
                            {[
                              "226,84",
                              "24,18",
                              "",
                              "",
                              "169,45",
                              "12,00",
                              "",
                              "",
                              "1.080,48",
                              "135,57",
                              "2,12",
                              "1,00",
                              "1.574,60",
                              "240,63",
                              "16,56",
                              "0,50",
                              "1.999,10",
                              "219,72",
                              "19,00",
                              "0,00",
                              "1.254,31",
                              "114,96",
                              "21,91",
                              "0,00",
                              "727,80",
                              "150,83",
                              "52,38",
                              "5,00",
                              "417,12",
                              "88,60",
                              "92,30",
                              "5,40",
                              "585,18",
                              "110,85",
                              "55,75",
                              "13,25",
                            ].map((cell, idx) => (
                              <TableCell
                                key={idx}
                                className="text-center text-emerald-900"
                              >
                                {cell}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
      {selectedCompany && (
        <CompanyDetailsModal
          company2={company2Data}
          company1={company1Data}
          company3={company3Data}
          company4={selectedCompany}
          progress={selectedCompanyProgress}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
      {selectedOtherCompany && (
        <OtherCompanyDetailsModal
          company2={otherCompany2Data}
          company1={otherCompany1Data}
          company3={otherCompany3Data}
          company4={selectedOtherCompany}
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
      {selectedPolsekDesa && (
        <PolsekDesaOverviewModal
          polsek={selectedPolsekDesa}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DashboardPoldaRiauPage;
