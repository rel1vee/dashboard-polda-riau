{
  /* <div className="flex items-center justify-between">
  <div className="flex items-center gap-2">
    <div
      className="h-3 w-3 rounded-full"
      style={{ backgroundColor: "hsl(var(--chart-3))" }}
    ></div>
    <span className="text-sm text-muted-foreground">Capaian CSR</span>
  </div>
  <span className="text-sm font-medium">
    {Object.values(company.csrAchievements || {})
      .reduce((acc, val) => acc + val, 0)
      .toLocaleString("id-ID", {
        maximumFractionDigits: 2,
      })}{" "}
    Ha
  </span>
</div>; */
}

{
  /* <div className="flex items-center justify-between">
  <div className="flex items-center gap-2">
    <div
      className="h-3 w-3 rounded-full"
      style={{ backgroundColor: "hsl(var(--chart-3))" }}
    ></div>
    <span className="text-sm text-muted-foreground">Total Lahan</span>
  </div>
  <span className="text-sm font-medium">
    {company.area.toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    })}{" "}
    Ha
    {(
      company.area -
      (Object.values(company.monokulturAchievements || {}).reduce(
        (acc, val) => acc + val,
        0
      ) +
        Object.values(company.tumpangSariAchievements || {}).reduce(
          (acc, val) => acc + val,
          0
        ) +
        Object.values(company.csrAchievements || {}).reduce(
          (acc, val) => acc + val,
          0
        ))
    ).toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    })}{" "}
    Ha
  </span>
</div>; */
}

// const prepareTablePolsekData = () => {
//   const rankedPolsek = riauCity.flatMap((city) => {
//     return city.polsek.map((polsek) => {
//       const totalTarget =
//         polsek.villages?.reduce((sum, village) => sum + village.target, 0) || 0;

//       const totalAchievement =
//         polsek.villages?.reduce(
//           (sum, village) => sum + village.achievement,
//           0
//         ) || 0;

//       const percentage =
//         totalTarget > 0
//           ? ((totalAchievement / totalTarget) * 100).toLocaleString("id-ID", {
//               maximumFractionDigits: 2,
//             })
//           : "0";

//       return {
//         name: polsek.name,
//         polres: polsek.polres || "-",
//         totalAchievement,
//         totalTarget,
//         percentage: `${percentage}%`,
//       };
//     });
//   });

//   rankedPolsek.sort((a, b) => b.totalAchievement - a.totalAchievement);
//   return rankedPolsek;
// };

// const prepareChartWeekData = () => {
//   const rankedCities = riauCity.map((city) => {
//     const allCompanies = [...city.companies, ...(city.otherCompanies || [])];

//     const monokulturAchievements = {
//       i: allCompanies.reduce(
//         (sum, company) => sum + (company.monokulturAchievements?.I || 0),
//         0
//       ),
//       ii: allCompanies.reduce(
//         (sum, company) => sum + (company.monokulturAchievements?.II || 0),
//         0
//       ),
//       iii: allCompanies.reduce(
//         (sum, company) => sum + (company.monokulturAchievements?.III || 0),
//         0
//       ),
//       iv: allCompanies.reduce(
//         (sum, company) => sum + (company.monokulturAchievements?.IV || 0),
//         0
//       ),
//     };

//     const tumpangSariAchievements = {
//       i: allCompanies.reduce(
//         (sum, company) => sum + (company.tumpangSariAchievements?.I || 0),
//         0
//       ),
//       ii: allCompanies.reduce(
//         (sum, company) => sum + (company.tumpangSariAchievements?.II || 0),
//         0
//       ),
//       iii: allCompanies.reduce(
//         (sum, company) => sum + (company.tumpangSariAchievements?.III || 0),
//         0
//       ),
//       iv: allCompanies.reduce(
//         (sum, company) => sum + (company.tumpangSariAchievements?.IV || 0),
//         0
//       ),
//     };

//     const csrAchievements = {
//       i: allCompanies.reduce(
//         (sum, company) => sum + (company.csrAchievements?.I || 0),
//         0
//       ),
//       ii: allCompanies.reduce(
//         (sum, company) => sum + (company.csrAchievements?.II || 0),
//         0
//       ),
//       iii: allCompanies.reduce(
//         (sum, company) => sum + (company.csrAchievements?.III || 0),
//         0
//       ),
//       iv: allCompanies.reduce(
//         (sum, company) => sum + (company.csrAchievements?.IV || 0),
//         0
//       ),
//     };

//     const totalAchievements =
//       monokulturAchievements.iii +
//       tumpangSariAchievements.iii +
//       csrAchievements.iii;

//     return {
//       name: city.nama,
//       I:
//         monokulturAchievements.i +
//         tumpangSariAchievements.i +
//         csrAchievements.i,
//       II:
//         monokulturAchievements.ii +
//         tumpangSariAchievements.ii +
//         csrAchievements.ii -
//         (monokulturAchievements.i +
//           tumpangSariAchievements.i +
//           csrAchievements.i),
//       III:
//         monokulturAchievements.iii +
//         tumpangSariAchievements.iii +
//         csrAchievements.iii -
//         (monokulturAchievements.ii +
//           tumpangSariAchievements.ii +
//           csrAchievements.ii),
//       IV: 0,
//       totalAchievements,
//     };
//   });

//   rankedCities.sort((a, b) => b.totalAchievements - a.totalAchievements);
//   return rankedCities;
// };
