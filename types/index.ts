export interface ProgramSatu {
  id: number;
  nama: string;
  coordinates: [number, number];
  jumlahDesa: number;
  jumlahKecamatan: number;
  jumlahPolisiPenggerak: number;
  jumlahTitikI: number;
  jumlahTitikII: number;
  jumlahTitikIII: number;
  jumlahTitikIV: number;
  jumlahTitikV: number;
  jumlahTitikVI: number;
  jumlahTitikVII: number;
  jumlahTitikVIII: number;
  jumlahTitikIX: number;
  jumlahTitikX: number;
  jumlahTitikXI: number;
  jumlahTitikXII: number;
  jumlahTitikXIII: number;
  jumlahTitikXIV: number;
  desaPercontohan: number;
  desaNonPercontohan: number;
  perikanan: number;
  peternakan: number;
  holtikultura: number;
  // luasLahanI: number;
  // luasLahanII: number;
  // luasLahanIII: number;
  // luasLahanIV: number;
  // luasLahanV: number;
  // luasLahanVI: number;
  pekarangan: Pekarangan[];
  polresKecamatan: Pekarangan[];
  polsekDesa: Pekarangan[];
}

export interface Pekarangan {
  id: number;
  polsek?: string;
  kecamatan: string;
  desa: string;
  namaPemilik?: string;
  namaPolisi: string;
  pangkat: string;
  jabatan: string;
  nomorHP?: string;
  percontohan: string;
  holtikultura?: string;
  perikanan?: string;
  peternakan?: string;
  pohon?: string;
  ikan?: string;
  ternak?: string;
  lahan?: string;
  kolam?: string;
  kandang?: string;
  waktuBibit?: string;
  jenisPekarangan?: string;
  keterangan?: string;
  titikKoordinat?: string;
}

export interface ProgramDua {
  id: number;
  nama: string;
  coordinates: [number, number];
  totalArea: number;
  otherTotalArea: number;
  monokulturTarget: number;
  tumpangSariTarget: number;
  polsek1: Polsek[];
  polsek2: Polsek[];
  polsek3: Polsek[];
  polsek4: Polsek[];
  polsek5: Polsek[];
  polsek6: Polsek[];
  polsek7: Polsek[];
  polsek8: Polsek[];
  polsek9: Polsek[];
  tahapI: {
    companies: Company[];
    otherCompanies: Company[];
  };
  tahapII: {
    companies: Company[];
    otherCompanies: Company[];
  };
  tahapIII: {
    companies: Company[];
    otherCompanies: Company[];
  };
  tahapIV: {
    companies: Company[];
    otherCompanies: Company[];
  };
  progress: Progress[];
  otherProgress: Progress[];
}

export interface Polsek {
  id: number;
  name: string;
  polres: string;
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
  csrAchievements: {
    I: number;
    II: number;
    III: number;
    IV: number;
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
