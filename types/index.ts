export interface City {
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
  id: string | number;
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
      luas: number | string;
      persentase?: number | string;
    };
    waktuTanam: string | number;
    progresTanam: {
      luas: number | string;
      persentase?: number | string;
    };
    belumTanam: {
      luas: number | string;
      persentase?: number | string;
    };
    panen: {
      luas: number | string;
      persentase?: number | string;
    };
    keterangan: string | number;
  };
  tumpangSari: {
    targetTanam: {
      luas: number | string;
      persentase?: number | string;
    };
    waktuTanam: string | number;
    progresTanam: {
      luas: number | string;
      persentase?: number | string;
    };
    belumTanam: {
      luas: number | string;
      persentase?: number | string;
    };
    panen: {
      luas: number | string;
      persentase?: number | string;
    };
    keterangan: string | number;
  };
  csr: {
    targetTanam: {
      luas: number | string;
      persentase?: number | string;
    };
    waktuTanam: string | number;
    progresTanam: {
      luas: number | string;
      persentase?: number | string;
    };
    belumTanam: {
      luas: number | string;
      persentase?: number | string;
    };
    panen: {
      luas: number | string;
      persentase?: number | string;
    };
    keterangan: string | number;
  };
}
