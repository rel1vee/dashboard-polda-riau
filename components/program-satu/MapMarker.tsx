"use client";

import L from "leaflet";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import { Badge } from "../ui/badge";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const pinIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>`;

const customIcon = L.divIcon({
  className: "custom-marker",
  html: `<div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-colors">
    ${pinIconSvg}
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapProps {
  cities: {
    id: number;
    nama: string;
    coordinates: [number, number];
    jumlahDesa: number;
    jumlahKecamatan: number;
    jumlahPolisiPenggerak: number;
    jumlahTitikVI: number;
    desaPercontohan: number;
    desaNonPercontohan: number;
    luasLahanVI: number;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCityClick: (city: any) => void;
}

const ProgramSatuMapMarker: React.FC<MapProps> = ({ cities, onCityClick }) => {
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});

  return (
    <div className="h-[500px] overflow-hidden">
      <MapContainer
        center={[0.5070677, 101.5401725]}
        zoom={8}
        className="w-full h-full z-0"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='<a href="https://www.openstreetmap.org/copyright"></a>'
        />

        {cities.map((city) => {
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
                  onCityClick(city);
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
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        {city.jumlahDesa} Desa/Kelurahan
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        {city.jumlahKecamatan} Kecamatan
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">
                        Polisi Penggerak:
                      </span>
                      <span className="text-gray-900">
                        {city.jumlahPolisiPenggerak}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">
                        Desa Percontohan:
                      </span>
                      <span className="font-medium text-gray-900">
                        {city.desaPercontohan}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">
                        Desa Non Percontohan:
                      </span>
                      <span className="font-medium text-gray-900">
                        {city.desaNonPercontohan}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">
                        Jumlah Titik Pekarangan:
                      </span>
                      <span className="font-medium text-gray-900">
                        {city.jumlahTitikVI}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">
                        Jumlah Luas Lahan:
                      </span>
                      <span className="font-medium text-gray-900">
                        {city.luasLahanVI.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}
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

export default ProgramSatuMapMarker;
