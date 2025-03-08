import { ProgramDua } from "../types";
import { bengkalisCompanies } from "./program-dua/company/Bengkalis";
import { inhilCompanies } from "./program-dua/company/Inhil";
import { inhuCompanies } from "./program-dua/company/Inhu";
import { kamparCompanies } from "./program-dua/company/Kampar";
import { kuansingCompanies } from "./program-dua/company/Kuansing";
import { pekanbaruCompanies } from "./program-dua/company/Pekanbaru";
import { pelalawanCompanies } from "./program-dua/company/Pelalawan";
import { rohilCompanies } from "./program-dua/company/Rohil";
import { rohulCompanies } from "./program-dua/company/Rohul";
import { siakCompanies } from "./program-dua/company/Siak";
import { bengkalisOtherCompanies } from "./program-dua/other-company/Bengkalis";
import { dumaiOtherCompanies } from "./program-dua/other-company/Dumai";
import { inhilOtherCompanies } from "./program-dua/other-company/Inhil";
import { inhuOtherCompanies } from "./program-dua/other-company/Inhu";
import { kamparOtherCompanies } from "./program-dua/other-company/Kampar";
import { kuansingOtherCompanies } from "./program-dua/other-company/Kuansing";
import { merantiOtherCompanies } from "./program-dua/other-company/Meranti";
import { pekanbaruOtherCompanies } from "./program-dua/other-company/Pekanbaru";
import { pelalawanOtherCompanies } from "./program-dua/other-company/Pelalawan";
import { rohilOtherCompanies } from "./program-dua/other-company/Rohil";
import { rohulOtherCompanies } from "./program-dua/other-company/Rohul";
import { siakOtherCompanies } from "./program-dua/other-company/Siak";
import { bengkalisOtherProgress } from "./program-dua/other-progress/Bengkalis";
import { dumaiOtherProgress } from "./program-dua/other-progress/Dumai";
import { inhilOtherProgress } from "./program-dua/other-progress/Inhil";
import { inhuOtherProgress } from "./program-dua/other-progress/Inhu";
import { kamparOtherProgress } from "./program-dua/other-progress/Kampar";
import { kuansingOtherProgress } from "./program-dua/other-progress/Kuansing";
import { merantiOtherProgress } from "./program-dua/other-progress/Meranti";
import { pekanbaruOtherProgress } from "./program-dua/other-progress/Pekanbaru";
import { pelalawanOtherProgress } from "./program-dua/other-progress/Pelalawan";
import { rohilOtherProgress } from "./program-dua/other-progress/Rohil";
import { rohulOtherProgress } from "./program-dua/other-progress/Rohul";
import { siakOtherProgress } from "./program-dua/other-progress/Siak";
import { bengkalisPolsek } from "./program-dua/polsek/Bengkalis";
import { dumaiPolsek } from "./program-dua/polsek/Dumai";
import { inhilPolsek } from "./program-dua/polsek/Inhil";
import { inhuPolsek } from "./program-dua/polsek/Inhu";
import { kamparPolsek } from "./program-dua/polsek/Kampar";
import { kuansingPolsek } from "./program-dua/polsek/Kuansing";
import { merantiPolsek } from "./program-dua/polsek/Meranti";
import { pekanbaruPolsek } from "./program-dua/polsek/Pekanbaru";
import { pelalawanPolsek } from "./program-dua/polsek/Pelalawan";
import { rohilPolsek } from "./program-dua/polsek/Rohil";
import { rohulPolsek } from "./program-dua/polsek/Rohul";
import { siakPolsek } from "./program-dua/polsek/Siak";
import { bengkalisProgress } from "./program-dua/progress/Bengkalis";
import { inhilProgress } from "./program-dua/progress/Inhil";
import { inhuProgress } from "./program-dua/progress/Inhu";
import { kamparProgress } from "./program-dua/progress/Kampar";
import { kuansingProgress } from "./program-dua/progress/Kuansing";
import { pekanbaruProgress } from "./program-dua/progress/Pekanbaru";
import { pelalawanProgress } from "./program-dua/progress/Pelalawan";
import { rohilProgress } from "./program-dua/progress/Rohil";
import { rohulProgress } from "./program-dua/progress/Rohul";
import { siakProgress } from "./program-dua/progress/Siak";

export const programDua: ProgramDua[] = [
  {
    id: 1,
    nama: "INDRAGIRI HULU",
    coordinates: [-0.5062587626567405, 102.22070185428481],
    totalArea: 156157.69,
    otherTotalArea: 4142.06,
    monokulturTarget: 3123.15,
    tumpangSariTarget: 10931.04,
    companies: inhuCompanies,
    otherCompanies: inhuOtherCompanies,
    polsek: inhuPolsek,
    progress: inhuProgress,
    otherProgress: inhuOtherProgress,
  },
  {
    id: 2,
    nama: "KAMPAR",
    coordinates: [0.4068, 101.2181],
    totalArea: 142487.29,
    otherTotalArea: 13573.34,
    monokulturTarget: 2849.75,
    tumpangSariTarget: 9974.11,
    companies: kamparCompanies,
    otherCompanies: kamparOtherCompanies,
    polsek: kamparPolsek,
    progress: kamparProgress,
    otherProgress: kamparOtherProgress,
  },
  {
    id: 3,
    nama: "INDRAGIRI HILIR",
    coordinates: [-0.3432, 103.0304],
    totalArea: 360823.78,
    otherTotalArea: 81.7,
    monokulturTarget: 7216.48,
    tumpangSariTarget: 25257.66,
    companies: inhilCompanies,
    otherCompanies: inhilOtherCompanies,
    polsek: inhilPolsek,
    progress: inhilProgress,
    otherProgress: inhilOtherProgress,
  },
  {
    id: 4,
    nama: "PEKANBARU",
    coordinates: [0.5333, 101.45],
    totalArea: 132368.11,
    otherTotalArea: 4.07,
    monokulturTarget: 2647.36,
    tumpangSariTarget: 9265.77,
    companies: pekanbaruCompanies,
    otherCompanies: pekanbaruOtherCompanies,
    polsek: pekanbaruPolsek,
    progress: pekanbaruProgress,
    otherProgress: pekanbaruOtherProgress,
  },
  {
    id: 5,
    nama: "BENGKALIS",
    coordinates: [1.4804, 102.1335],
    totalArea: 74903.62,
    otherTotalArea: 15.99,
    monokulturTarget: 1498.07,
    tumpangSariTarget: 5243.25,
    companies: bengkalisCompanies,
    otherCompanies: bengkalisOtherCompanies,
    polsek: bengkalisPolsek,
    progress: bengkalisProgress,
    otherProgress: bengkalisOtherProgress,
  },
  {
    id: 6,
    nama: "PELALAWAN",
    coordinates: [0.1952, 102.1654],
    totalArea: 173114.47,
    otherTotalArea: 37837.79,
    monokulturTarget: 3462.29,
    tumpangSariTarget: 12118.01,
    companies: pelalawanCompanies,
    otherCompanies: pelalawanOtherCompanies,
    polsek: pelalawanPolsek,
    progress: pelalawanProgress,
    otherProgress: pelalawanOtherProgress,
  },
  {
    id: 7,
    nama: "ROKAN HILIR",
    coordinates: [1.8648793362231944, 100.69519367611285],
    totalArea: 83209.98,
    otherTotalArea: 39958,
    monokulturTarget: 1664.2,
    tumpangSariTarget: 5824.7,
    companies: rohilCompanies,
    otherCompanies: rohilOtherCompanies,
    polsek: rohilPolsek,
    progress: rohilProgress,
    otherProgress: rohilOtherProgress,
  },
  {
    id: 8,
    nama: "SIAK",
    coordinates: [0.8691723690456171, 101.81940175928257],
    totalArea: 102105.66,
    otherTotalArea: 11322,
    monokulturTarget: 2042.11,
    tumpangSariTarget: 7147.4,
    companies: siakCompanies,
    otherCompanies: siakOtherCompanies,
    polsek: siakPolsek,
    progress: siakProgress,
    otherProgress: siakOtherProgress,
  },
  {
    id: 9,
    nama: "KUANTAN SINGINGI",
    coordinates: [-0.524020536122323, 101.50946758486292],
    totalArea: 74304.86,
    otherTotalArea: 8368.17,
    monokulturTarget: 1486.1,
    tumpangSariTarget: 5201.34,
    companies: kuansingCompanies,
    otherCompanies: kuansingOtherCompanies,
    polsek: kuansingPolsek,
    progress: kuansingProgress,
    otherProgress: kuansingOtherProgress,
  },
  {
    id: 10,
    nama: "ROKAN HULU",
    coordinates: [1.0717023015292773, 100.49848745055259],
    totalArea: 166485.98,
    otherTotalArea: 42.58,
    monokulturTarget: 3329.72,
    tumpangSariTarget: 11654.02,
    companies: rohulCompanies,
    otherCompanies: rohulOtherCompanies,
    polsek: rohulPolsek,
    progress: rohulProgress,
    otherProgress: rohulOtherProgress,
  },
  {
    id: 11,
    nama: "KEPULAUAN MERANTI",
    coordinates: [0.885, 102.65],
    totalArea: 0,
    otherTotalArea: 655.25,
    monokulturTarget: 721.11,
    tumpangSariTarget: 2523.89,
    companies: [],
    otherCompanies: merantiOtherCompanies,
    polsek: merantiPolsek,
    progress: [],
    otherProgress: merantiOtherProgress,
  },
  {
    id: 12,
    nama: "DUMAI",
    coordinates: [1.6627197743147384, 101.39805017115371],
    totalArea: 0,
    otherTotalArea: 169.37,
    monokulturTarget: 63.89,
    tumpangSariTarget: 223.61,
    companies: [],
    otherCompanies: dumaiOtherCompanies,
    polsek: dumaiPolsek,
    progress: [],
    otherProgress: dumaiOtherProgress,
  },
];
