"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge } from "./ui/badge";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useRef } from "react";
import { Company } from "@/types";

// SVG untuk custom marker
const pinIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>`;

// Custom icon untuk marker
const customIcon = L.divIcon({
  className: "custom-marker",
  html: `<div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-colors">
    ${pinIconSvg}
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Komponen Map dengan parameter
interface MapProps {
  cities: {
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
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCityClick: (city: any) => void;
}

const calculateTotalAchievements = (
  companies: Company[],
  otherCompanies: Company[]
) => {
  const allCompanies = [...companies, ...otherCompanies];

  return allCompanies.reduce(
    (totals, company) => {
      const monoTotal = Object.values(company.monokulturAchievements).reduce(
        (sum, val) => sum + val,
        0
      );
      const tumpangSariTotal = Object.values(
        company.tumpangSariAchievements
      ).reduce((sum, val) => sum + val, 0);
      const csrTotal = company.csrAchievements
        ? Object.values(company.csrAchievements).reduce(
            (sum, val) => sum + val,
            0
          )
        : 0;

      return {
        monokultur: totals.monokultur + monoTotal,
        tumpangSari: totals.tumpangSari + tumpangSariTotal,
        csr: totals.csr + csrTotal,
      };
    },
    { monokultur: 0, tumpangSari: 0, csr: 0 }
  );
};

// Fungsi untuk menghitung total lahan
const calculateTotalArea = (
  companies: Company[],
  otherCompanies: Company[]
) => {
  const allCompanies = [...companies, ...otherCompanies];
  return allCompanies.reduce((total, company) => total + company.area, 0);
};

const MapMarker: React.FC<MapProps> = ({ cities, onCityClick }) => {
  // Create refs for each marker
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});

  return (
    <div className="h-[500px] overflow-hidden">
      <MapContainer
        center={[0.5070677, 101.5401725]} // Koordinat pusat peta
        zoom={8}
        className="w-full h-full z-0"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='<a href="https://www.openstreetmap.org/copyright"></a>'
        />
        {/* Render marker untuk setiap kota */}
        {cities.map((city) => {
          const achievements = calculateTotalAchievements(
            city.companies,
            city.otherCompanies || []
          );

          const totalArea = calculateTotalArea(
            city.companies,
            city.otherCompanies || []
          );

          return (
            <Marker
              key={city.id}
              position={city.coordinates}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  const marker = markerRefs.current[city.id];
                  if (marker) {
                    marker.openPopup();
                  }
                  onCityClick(city); // Panggil callback saat marker diklik
                },
                mouseover: () => {
                  const marker = markerRefs.current[city.id];
                  if (marker) {
                    marker.openPopup();
                  }
                },
              }}
              ref={(ref) => {
                if (ref) {
                  markerRefs.current[city.id] = ref;
                }
              }}
            >
              <Popup className="rounded-xl shadow-xl bg-white">
                <div>
                  {/* Header */}
                  <h3 className="font-bold text-lg mb-3 text-gray-800 hover:text-blue-600 transition-colors">
                    {city.nama}
                  </h3>
                  <div className="space-y-3">
                    {/* Companies Badge */}
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        {city.companies.length} Perusahaan Target
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        {city.otherCompanies?.length} Perusahaan Lain
                      </Badge>
                    </div>
                    {/* Area Info */}
                    <div className="flex items-center justify-between gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">
                        Total Luas Lahan:
                      </span>
                      <span className="font-bold text-gray-900">
                        {totalArea.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })} Ha
                      </span>
                    </div>
                    {/* Capaian Monokultur */}
                    <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">Monokultur:</span>
                      <span className="font-medium text-gray-900">
                        {achievements.monokultur.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        dari{" "}
                        {city.monokulturTarget.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                    {/* Capaian Tumpang Sari */}
                    <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">
                        Tumpang Sari:
                      </span>
                      <span className="font-medium text-gray-900">
                        {achievements.tumpangSari.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        dari{" "}
                        {city.tumpangSariTarget.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                    {/* Capaian CSR */}
                    <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">CSR:</span>
                      <span className="font-medium text-gray-900">
                        {achievements.csr.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        dari{" "}
                        {city.totalTarget.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapMarker;
