import { City } from "../types";
import { bengkalisCompanies } from "./company/Bengkalis";
import { dumaiCompanies } from "./company/Dumai";
import { inhilCompanies } from "./company/Inhil";
import { inhuCompanies } from "./company/Inhu";
import { KamparCompanies } from "./company/Kampar";
import { kuansingCompanies } from "./company/Kuansing";
import { merantiCompanies } from "./company/Meranti";
import { pekanbaruCompanies } from "./company/Pekanbaru";
import { PelalawanCompanies } from "./company/Pelalawan";
import { rohilCompanies } from "./company/Rohil";
import { rohulCompanies } from "./company/Rohul";
import { siakCompanies } from "./company/Siak";

export const riauCity: City[] = [
  {
    id: 1,
    nama: "INDRAGIRI HULU",
    coordinates: [-0.5062587626567405, 102.22070185428481],
    totalArea: 156157.69,
    monokulturTarget: 3123.15,
    tumpangSariTarget: 10931.04,
    totalTarget: 14054.19,
    companies: inhuCompanies,
  },
  {
    id: 2,
    nama: "KAMPAR",
    coordinates: [0.4068, 101.2181],
    totalArea: 142487.29,
    monokulturTarget: 2849.75,
    tumpangSariTarget: 9974.11,
    totalTarget: 12823.86,
    companies: KamparCompanies,
  },
  {
    id: 3,
    nama: "INDRAGIRI HILIR",
    coordinates: [-0.3432, 103.0304],
    totalArea: 360823.78,
    monokulturTarget: 7216.48,
    tumpangSariTarget: 25257.66,
    totalTarget: 32474.14,
    companies: inhilCompanies,
  },
  {
    id: 4,
    nama: "PEKANBARU",
    coordinates: [0.5333, 101.45],
    totalArea: 132368.11,
    monokulturTarget: 2647.36,
    tumpangSariTarget: 9265.77,
    totalTarget: 11913.13,
    companies: pekanbaruCompanies,
  },
  {
    id: 5,
    nama: "BENGKALIS",
    coordinates: [1.4804, 102.1335],
    totalArea: 74903.62,
    monokulturTarget: 1498.07,
    tumpangSariTarget: 5243.25,
    totalTarget: 6741.33,
    companies: bengkalisCompanies,
  },
  {
    id: 6,
    nama: "PELALAWAN",
    coordinates: [0.1952, 102.1654],
    totalArea: 173114.47,
    monokulturTarget: 3462.29,
    tumpangSariTarget: 12118.01,
    totalTarget: 15580.3,
    companies: PelalawanCompanies,
  },
  {
    id: 7,
    nama: "ROKAN HILIR",
    coordinates: [1.8648793362231944, 100.69519367611285],
    totalArea: 83209.98,
    monokulturTarget: 1664.2,
    tumpangSariTarget: 5824.7,
    totalTarget: 7488.9,
    companies: rohilCompanies,
  },
  {
    id: 8,
    nama: "SIAK",
    coordinates: [0.8691723690456171, 101.81940175928257],
    totalArea: 102105.66,
    monokulturTarget: 2042.11,
    tumpangSariTarget: 7147.4,
    totalTarget: 9189.51,
    companies: siakCompanies,
  },
  {
    id: 9,
    nama: "KUANTAN SINGINGI",
    coordinates: [-0.524020536122323, 101.50946758486292],
    totalArea: 74304.86,
    monokulturTarget: 1486.1,
    tumpangSariTarget: 5201.34,
    totalTarget: 6687.44,
    companies: kuansingCompanies,
  },
  {
    id: 10,
    nama: "ROKAN HULU",
    coordinates: [1.0717023015292773, 100.49848745055259],
    totalArea: 166485.98,
    monokulturTarget: 3329.72,
    tumpangSariTarget: 11654.02,
    totalTarget: 14983.74,
    companies: rohulCompanies,
  },
  {
    id: 11,
    nama: "KEPULAUAN MERANTI",
    coordinates: [0.885, 102.65],
    totalArea: 0,
    monokulturTarget: 0,
    tumpangSariTarget: 0,
    totalTarget: 3245.0,
    companies: merantiCompanies,
  },
  {
    id: 12,
    nama: "DUMAI",
    coordinates: [1.6627197743147384, 101.39805017115371],
    totalArea: 0,
    monokulturTarget: 0,
    tumpangSariTarget: 0,
    totalTarget: 287.5,
    companies: dumaiCompanies,
  },
];
