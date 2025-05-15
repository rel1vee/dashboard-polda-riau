import { Trophy } from "lucide-react";
import { programSatu } from "@/data/ProgramSatu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formatNumber = (num: number) => {
  return num.toLocaleString("id-ID", {
    maximumFractionDigits: 2,
  });
};

const ProgramSatuRanking = () => {
  const totalRow = programSatu.reduce(
    (acc, curr) => {
      acc.jumlahDesa += curr.jumlahDesa;
      acc.jumlahKecamatan += curr.jumlahKecamatan;
      acc.jumlahPolisiPenggerak += curr.jumlahPolisiPenggerak;
      acc.desaPercontohan += curr.desaPercontohan;
      acc.desaNonPercontohan += curr.desaNonPercontohan;
      acc.jumlahTitikI += curr.jumlahTitikI;
      acc.jumlahTitikII += curr.jumlahTitikII;
      acc.jumlahTitikIII += curr.jumlahTitikIII;
      acc.jumlahTitikIV += curr.jumlahTitikIV;
      acc.jumlahTitikV += curr.jumlahTitikV;
      acc.jumlahTitikVI += curr.jumlahTitikVI;
      acc.jumlahTitikVII += curr.jumlahTitikVII;
      acc.jumlahTitikVIII += curr.jumlahTitikVIII;
      acc.jumlahTitikIX += curr.jumlahTitikIX;
      acc.jumlahTitikX += curr.jumlahTitikX;
      acc.jumlahTitikXI += curr.jumlahTitikXI;
      acc.jumlahTitikXII += curr.jumlahTitikXII;
      acc.perikanan += curr.perikanan;
      acc.peternakan += curr.peternakan;
      acc.holtikultura += curr.holtikultura;
      // acc.luasLahanI += curr.luasLahanI;
      // acc.luasLahanII += curr.luasLahanII;
      // acc.luasLahanIII += curr.luasLahanIII;
      // acc.luasLahanIV += curr.luasLahanIV;
      // acc.luasLahanV += curr.luasLahanV;
      // acc.luasLahanVI += curr.luasLahanVI;

      return acc;
    },
    {
      nama: "JUMLAH",
      jumlahDesa: 0,
      jumlahKecamatan: 0,
      jumlahPolisiPenggerak: 0,
      desaPercontohan: 0,
      desaNonPercontohan: 0,
      jumlahTitikI: 0,
      jumlahTitikII: 0,
      jumlahTitikIII: 0,
      jumlahTitikIV: 0,
      jumlahTitikV: 0,
      jumlahTitikVI: 0,
      jumlahTitikVII: 0,
      jumlahTitikVIII: 0,
      jumlahTitikIX: 0,
      jumlahTitikX: 0,
      jumlahTitikXI: 0,
      jumlahTitikXII: 0,
      perikanan: 0,
      peternakan: 0,
      holtikultura: 0,
      // luasLahanI: 0,
      // luasLahanII: 0,
      // luasLahanIII: 0,
      // luasLahanIV: 0,
      // luasLahanV: 0,
      // luasLahanVI: 0,
    }
  );

  return (
    <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-none">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center md:gap-3 gap-0 text-blue-600 text-2xl font-bold">
          <Trophy className="w-8 h-8 hidden md:block" />
          Perankingan POLRES/TA
        </CardTitle>
        <CardDescription>
          Tabel POLRES/TA Program I Pekarangan Pangan Bergizi
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                rowSpan={2}
                className="text-center border uppercase px-4 py-2 border-gray-200 font-bold text-gray-800 bg-gray-300"
              >
                NO
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-center border uppercase px-16 py-2 border-gray-200 font-bold text-gray-800 bg-gray-300"
              >
                POLRES/TA
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-center border uppercase px-4 py-2 border-purple-200 font-bold text-gray-800 bg-purple-300"
              >
                Jumlah Desa
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-center border uppercase px-4 py-2 border-blue-200 font-bold text-gray-800 bg-blue-300"
              >
                Jumlah Kecamatan
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-center border uppercase px-4 py-2 border-orange-200 font-bold text-gray-800 bg-orange-300"
              >
                Jumlah Polisi
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-center border uppercase px-4 py-2 border-green-200 font-bold text-gray-800 bg-green-300"
              >
                Desa Percontohan
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-center border uppercase px-4 py-2 border-green-200 font-bold text-gray-800 bg-green-300"
              >
                Desa Non Percontohan
              </TableHead>
              <TableHead
                colSpan={10}
                className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300"
              >
                Jumlah Titik Pekarangan
              </TableHead>
              {/* <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300">
                Jumlah Titik Pekarangan (13-19 FEB 2025)
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300">
                Jumlah Titik Pekarangan (20-26 FEB 2025)
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300">
                Jumlah Titik Pekarangan (27 FEB - 5 MAR 2025)
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300">
                Jumlah Titik Pekarangan (6-12 MAR 2025)
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300">
                Jumlah Titik Pekarangan (13-19 MAR 2025)
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300">
                Jumlah Titik Pekarangan (3-9 APR 2025)
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300">
                Jumlah Titik Pekarangan (10-16 APR 2025)
              </TableHead> */}
              <TableHead
                rowSpan={2}
                className="text-center border uppercase px-4 py-2 border-indigo-200 font-bold text-gray-800 bg-indigo-300"
              >
                Pertambahan Titik
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-center border uppercase px-4 py-2 border-amber-200 font-bold text-gray-800 bg-amber-300"
              >
                Perikanan
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-center border uppercase px-4 py-2 border-amber-200 font-bold text-gray-800 bg-amber-300"
              >
                Peternakan
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-center border uppercase px-4 py-2 border-amber-200 font-bold text-gray-800 bg-amber-300"
              >
                Holtikultura
              </TableHead>
              {/* <TableHead className="text-center border uppercase px-4 py-2 border-indigo-200 font-bold text-gray-800 bg-indigo-300">
                Jumlah Luas Lahan (13-19 FEB 2025)
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-indigo-200 font-bold text-gray-800 bg-indigo-300">
                Jumlah Luas Lahan (20-26 FEB 2025)
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-indigo-200 font-bold text-gray-800 bg-indigo-300">
                Jumlah Luas Lahan (27 FEB - 5 MAR 2025)
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-indigo-200 font-bold text-gray-800 bg-indigo-300">
                Jumlah Luas Lahan (6-12 MAR 2025)
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-indigo-200 font-bold text-gray-800 bg-indigo-300">
                Pertambahan Luas
              </TableHead> */}
            </TableRow>
            <TableRow>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300 whitespace-nowrap">
                13-19 FEB
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300 whitespace-nowrap">
                20-26 FEB
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300 whitespace-nowrap">
                27 FEB - 5 MAR
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300 whitespace-nowrap">
                6-12 MAR
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300 whitespace-nowrap">
                13-19 MAR
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300 whitespace-nowrap">
                3-9 APR
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300 whitespace-nowrap">
                10-16 APR
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300 whitespace-nowrap">
                17-23 APR
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300 whitespace-nowrap">
                24-30 APR
              </TableHead>
              <TableHead className="text-center border uppercase px-4 py-2 border-red-200 font-bold text-gray-800 bg-red-300 whitespace-nowrap">
                1-6 MEI
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...programSatu]
              .sort((a, b) => b.jumlahTitikXII - a.jumlahTitikXII)
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell className="text-center font-bold border">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-center font-bold whitespace-nowrap border">
                    {row.nama}
                  </TableCell>
                  <TableCell className="text-center border bg-purple-50">
                    {row.jumlahDesa}
                  </TableCell>
                  <TableCell className="text-center border bg-blue-50">
                    {row.jumlahKecamatan}
                  </TableCell>
                  <TableCell className="text-center border bg-orange-50">
                    {row.jumlahPolisiPenggerak}
                  </TableCell>
                  <TableCell className="text-center border bg-green-50">
                    {row.desaPercontohan}
                  </TableCell>
                  <TableCell className="text-center border bg-green-50">
                    {row.desaNonPercontohan}
                  </TableCell>
                  <TableCell className="text-center border bg-red-50">
                    {row.jumlahTitikIII}
                  </TableCell>
                  <TableCell className="text-center border bg-red-50">
                    {row.jumlahTitikIV}
                  </TableCell>
                  <TableCell className="text-center border bg-red-50">
                    {row.jumlahTitikV}
                  </TableCell>
                  <TableCell className="text-center border bg-red-50">
                    {row.jumlahTitikVI}
                  </TableCell>
                  <TableCell className="text-center border bg-red-50">
                    {row.jumlahTitikVII}
                  </TableCell>
                  <TableCell className="text-center border bg-red-50">
                    {row.jumlahTitikVIII}
                  </TableCell>
                  <TableCell className="text-center border bg-red-50">
                    {row.jumlahTitikIX}
                  </TableCell>
                  <TableCell className="text-center border bg-red-50">
                    {row.jumlahTitikX}
                  </TableCell>
                  <TableCell className="text-center border font-bold bg-red-50">
                    {row.jumlahTitikXI}
                  </TableCell>
                  <TableCell className="text-center border font-bold bg-red-50">
                    {row.jumlahTitikXII}
                  </TableCell>
                  <TableCell className="text-center border font-bold bg-indigo-50">
                    {row.jumlahTitikXII - row.jumlahTitikXI}
                  </TableCell>
                  <TableCell className="text-center border bg-amber-50">
                    {row.perikanan}
                  </TableCell>
                  <TableCell className="text-center border bg-amber-50">
                    {row.peternakan}
                  </TableCell>
                  <TableCell className="text-center border bg-amber-50">
                    {row.holtikultura}
                  </TableCell>
                  {/* <TableCell className="text-center border bg-indigo-50">
                    {formatNumber(row.luasLahanIII)}
                  </TableCell>
                  <TableCell className="text-center border bg-indigo-50">
                    {formatNumber(row.luasLahanIV)}
                  </TableCell>
                  <TableCell className="text-center border font-bold bg-indigo-50">
                    {formatNumber(row.luasLahanV)}
                  </TableCell>
                  <TableCell className="text-center border font-bold bg-indigo-50">
                    {formatNumber(row.luasLahanVI)}
                  </TableCell>
                  <TableCell className="text-center border font-bold bg-indigo-50">
                    {formatNumber(row.luasLahanVI - row.luasLahanV)}
                  </TableCell> */}
                </TableRow>
              ))}
            <TableRow>
              <TableCell className="text-center border"></TableCell>
              <TableCell className="text-center border font-bold">
                {totalRow.nama}
              </TableCell>
              <TableCell className="text-center border font-bold bg-purple-50">
                {formatNumber(totalRow.jumlahDesa)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-blue-50">
                {formatNumber(totalRow.jumlahKecamatan)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-orange-50">
                {formatNumber(totalRow.jumlahPolisiPenggerak)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-green-50">
                {formatNumber(totalRow.desaPercontohan)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-green-50">
                {formatNumber(totalRow.desaNonPercontohan)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-red-50">
                {formatNumber(totalRow.jumlahTitikIII)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-red-50">
                {formatNumber(totalRow.jumlahTitikIV)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-red-50">
                {formatNumber(totalRow.jumlahTitikV)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-red-50">
                {formatNumber(totalRow.jumlahTitikVI)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-red-50">
                {formatNumber(totalRow.jumlahTitikVII)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-red-50">
                {formatNumber(totalRow.jumlahTitikVIII)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-red-50">
                {formatNumber(totalRow.jumlahTitikIX)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-red-50">
                {formatNumber(totalRow.jumlahTitikX)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-red-50">
                {formatNumber(totalRow.jumlahTitikXI)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-red-50">
                {formatNumber(totalRow.jumlahTitikXII)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-indigo-50">
                {formatNumber(totalRow.jumlahTitikXII - totalRow.jumlahTitikXI)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-amber-50">
                {formatNumber(totalRow.perikanan)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-amber-50">
                {formatNumber(totalRow.peternakan)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-amber-50">
                {formatNumber(totalRow.holtikultura)}
              </TableCell>
              {/* <TableCell className="text-center border font-bold bg-indigo-50">
                {formatNumber(totalRow.luasLahanIII)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-indigo-50">
                {formatNumber(totalRow.luasLahanIV)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-indigo-50">
                {formatNumber(totalRow.luasLahanV)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-indigo-50">
                {formatNumber(totalRow.luasLahanVI)}
              </TableCell>
              <TableCell className="text-center border font-bold bg-indigo-50">
                {formatNumber(totalRow.luasLahanVI - totalRow.luasLahanV)}
              </TableCell> */}
            </TableRow>
          </TableBody>
          <TableCaption className="mt-4 text-sm text-gray-600 bg-blue-50 p-2 rounded">
            Tabel POLRES/TA Program I Pekarangan Pangan Bergizi
          </TableCaption>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProgramSatuRanking;
