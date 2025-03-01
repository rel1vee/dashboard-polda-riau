import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2 } from "lucide-react";
import { Polsek } from "@/types";

interface PolsekDetailProps {
  polsek: Polsek;
  isOpen: boolean;
  onClose: () => void;
}

const PolsekDetail: React.FC<PolsekDetailProps> = ({
  polsek,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-6xl max-h-[95%] w-[95%] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="hidden md:block w-5 h-5 text-blue-500" />
            {polsek.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full h-auto grid-cols-1 md:grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="daftarDesa">Daftar Desa</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"></TabsContent>
          <TabsContent value="daftarDesa"></TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PolsekDetail;
