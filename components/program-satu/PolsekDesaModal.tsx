import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Fish, HandHeart, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pekarangan } from "@/types";

interface PolsekDesaModalProps {
  polsek: Pekarangan;
  isOpen: boolean;
  onClose: () => void;
}

const PolsekDesaOverviewModal: React.FC<PolsekDesaModalProps> = ({
  polsek,
  isOpen,
  onClose,
}) => {
  if (!polsek) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-4xl max-h-[95%] w-[95%] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3 uppercase">
            <Building2 className="w-5 h-5 text-blue-500" />
            Overview Polsek 2 Desa
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Holtikultura */}
          <Card className="overflow-hidden border-2 border-green-500 shadow-md">
            <CardHeader className="bg-green-500 text-white py-4">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Leaf className="w-5 h-5" /> HOLTIKULTURA
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <p className="font-semibold">{polsek.holtikultura}</p>
              </div>
            </CardContent>
          </Card>

          {/* Perikanan */}
          <Card className="overflow-hidden border-2 border-blue-500 shadow-md">
            <CardHeader className="bg-blue-500 text-white py-4">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Fish className="w-5 h-5" /> PERIKANAN
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-center p-2 bg-blue-50 rounded-lg">
                <p className="font-semibold">{polsek.perikanan}</p>
              </div>
            </CardContent>
          </Card>

          {/* Peternakan */}
          <Card className="overflow-hidden border-2 border-amber-500 shadow-md">
            <CardHeader className="bg-amber-500 text-white py-4">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <HandHeart className="w-5 h-5" /> PETERNAKAN
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-center p-2 bg-amber-50 rounded-lg">
                <p className="font-semibold">{polsek.peternakan}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Detail Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="overflow-hidden border-2 border-indigo-500 shadow-md col-span-1">
            <CardHeader className="bg-indigo-500 text-white py-4">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                JUMLAH (POHON, EKOR TERNAK/HEWAN, DAN LUAS LAHAN)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <p className="font-semibold">{polsek.jumlah}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-emerald-500 shadow-md col-span-1">
            <CardHeader className="bg-emerald-500 text-white py-4">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                LUAS KANDANG, LUAS KOLAM, DAN LUAS LAHAN
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="p-3 bg-emerald-50 rounded-lg text-center">
                <p className="font-semibold">{polsek.luas}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-rose-500 shadow-md col-span-1">
            <CardHeader className="bg-rose-500 text-white py-4">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                WAKTU BIBIT, WAKTU PENANAMAN, DAN WAKTU PANEN
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="p-3 bg-rose-50 rounded-lg">
                <div>
                  <p className="font-semibold">{polsek.waktu}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PolsekDesaOverviewModal;
