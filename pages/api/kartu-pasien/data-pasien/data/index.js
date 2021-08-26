const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      let querydata = await qryKartuPasien.query(
        `SELECT NKP, flagPull as Flag , CONVERT(varchar, TglAuto,113) as Waktu FROM tblDataPasien ORDER BY TglAuto DESC`
      );
      res.status(200).json({
        success: true,
        message: "Berhasil Mendapatkan Data",
        data: querydata,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Anda Kehilangan Arah",
        data: false,
      });
    }
  } catch (error) {
    console.log("Eror Data-Pasien Data ", error);
    res.json("Eror Data-Pasien Data ", error);
  }
}
