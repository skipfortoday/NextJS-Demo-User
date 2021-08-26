const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      try {
        let querydata = await qryKartuPasien.query(
          `SELECT IDDokter, flagPull as Flag ,CONVERT(varchar, TglAuto,113) as Waktu
        FROM tblDokter ORDER BY TglAuto DESC`
        );
        res.status(200).json({
          success: true,
          message: "Berhasil Mendapatkan Data",
          data: querydata,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error,
          data: false,
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Anda Kehilangan Arah",
        data: false,
      });
    }
  } catch (error) {
    console.log("Eror dokter data", error);
    res.json("Eror dokter data", error);
  }
}
