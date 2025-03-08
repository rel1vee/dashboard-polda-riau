export interface ProgramSatu {
  id: number;
  nama: string;
  coordinates?: [number, number];
  jumlahDesa: number;
  jumlahKecamatan: number;
  jumlahPolisiPenggerak: number;
  jumlahTitikPekarangan: number;
  desaPercontohan: number;
  desaNonPercontohan: number;
  perikanan: number;
  peternakan: number;
  holtikultura: number;
  luasLahanII: number;
  luasLahanIII: number;
  luasLahanIV: number;
  pertambahanTitik: number;
  pertambahanLuas: number;
  pekarangan?: Pekarangan[];
}

export interface Pekarangan {
  id: number;
  kecamatan: string;
  desa: string;
  namaPolisi: string;
  pangkat: string;
  jabatan: string;
  percontohan: string;
  keterangan: string;
}

export interface ProgramDua {
  id: number;
  nama: string;
  coordinates: [number, number];
  totalArea: number;
  otherTotalArea: number;
  monokulturTarget: number;
  tumpangSariTarget: number;
  companies: Company[];
  otherCompanies: Company[];
  progress: Progress[];
  otherProgress: Progress[];
  polsek: Polsek[];
}

export interface Polsek {
  id: number;
  name: string;
  polres?: string;
  villages: Village[];
}

export interface Village {
  id: number;
  name: string;
  target: number;
  waktuTanam: string;
  achievement: number;
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
    V?: number;
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
    V?: number;
  };
  csrAchievements: {
    I: number;
    II: number;
    III: number;
    IV: number;
    V?: number;
  };
}

export interface Progress {
  id: number;
  namaPJ: string;
  nomorTelp: string | number;
  area: number;
  monokultur: {
    targetTanam: {
      luas: number;
      persentase?: number;
    };
    waktuTanam: string;
    progresTanam: {
      luas: number;
      persentase?: number;
    };
    belumTanam: {
      luas: number;
      persentase?: number;
    };
    panen: {
      luas: number;
      persentase?: number;
    };
    keterangan: string;
  };
  tumpangSari: {
    targetTanam: {
      luas: number;
      persentase?: number;
    };
    waktuTanam: string;
    progresTanam: {
      luas: number;
      persentase?: number;
    };
    belumTanam: {
      luas: number;
      persentase?: number;
    };
    panen: {
      luas: number;
      persentase?: number;
    };
    keterangan: string;
  };
  csr: {
    targetTanam: {
      luas: number;
      persentase?: number;
    };
    waktuTanam: string;
    progresTanam: {
      luas: number;
      persentase?: number;
    };
    belumTanam: {
      luas: number;
      persentase?: number;
    };
    panen: {
      luas: number;
      persentase?: number;
    };
    keterangan: string;
  };
}
