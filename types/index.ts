export interface City {
  id: number;
  nama: string;
  coordinates: [number, number];
  totalArea: number;
  otherTotalArea: number;
  monokulturTarget: number;
  tumpangSariTarget: number;
  totalTarget: number;
  companies: Company[];
  otherCompanies?: Company[];
  polsek: Polsek[];
}

export interface Polsek {
  id: number;
  name: string;
  villages?: Village[];
}

export interface Village {
  id?: string | number;
  name: string;
  target?: number;
  percontohanStatus?: string;
  chief?: string;
  rank?: string;
  nrp?: string;
  position?: string;
  contact?: string;
  achievement?: number;
}

export interface Company {
  id: number;
  name: string;
  area: number;
  target2Percent?: number;
  target7Percent?: number;
  monokulturTargets?: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  monokulturAchievements: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  tumpangSariTargets?: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  tumpangSariAchievements: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  csrAchievements?: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  progress?: Progress[];
}

export interface Progress {
  id: number;
  namaPJ: string;
  nomorTelp: string;
  area: number;
  coordinates?: [number, number] | null;
  photo: string | null;
  monokultur: {
    targetTanam: {
      luas: number | null;
      persentase: number | null;
    };
    waktuTanam: string;
    progresTanam: {
      luas: number | null;
      persentase: number | null;
    };
    belumTanam: {
      luas: number | null;
      persentase: number | null;
    };
    panen: {
      luas: number | null;
      persentase: number | null;
    };
    keterangan: string | null;
    rencanaTanam?: {
      tanggalTanam?: string | null;
      luasTanam?: number | null;
    };
    rencanaPanen?: {
      tanggalPanen?: string | null;
      perkiraanPanen?: number | null;
    };
  };
  tumpangSari: {
    targetTanam: {
      luas: number | null;
      persentase: number | null;
    };
    waktuTanam: string;
    progresTanam: {
      luas: number | null;
      persentase: number | null;
    };
    belumTanam: {
      luas: number | null;
      persentase: number | null;
    };
    panen: {
      luas: number | null;
      persentase: number | null;
    };
    keterangan: string | null;
    rencanaTanam?: {
      tanggalTanam?: string | null;
      luasTanam?: number | null;
    };
    rencanaPanen?: {
      tanggalPanen?: string | null;
      perkiraanPanen?: number | null;
    };
  };
  csr: {
    targetTanam: {
      luas: number | null;
      persentase: number | null;
    };
    waktuTanam: string;
    progresTanam: {
      luas: number | null;
      persentase: number | null;
    };
    belumTanam: {
      luas: number | null;
      persentase: number | null;
    };
    panen: {
      luas: number | null;
      persentase: number | null;
    };
    keterangan: string | null;
    rencanaTanam?: {
      tanggalTanam?: string | null;
      luasTanam?: number | null;
    };
    rencanaPanen?: {
      tanggalPanen?: string | null;
      perkiraanPanen?: number | null;
    };
  };
}
