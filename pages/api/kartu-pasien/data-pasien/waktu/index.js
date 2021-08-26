const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");

export default async function handler(req, res) {
  try {
    let querydata = await qryKartuPasien.query(
      `SELECT TOP 1 CONVERT(date, TglAuto) as TglAuto1,
      CONVERT(varchar, TglAuto , 108) as TimeAuto FROM tblDataPasien ORDER BY TglAuto DESC`
    );
    res.status(200).json({
      success: true,
      message: "Berhasil Mendapatkan Data",
      data: querydata[0].TglAuto1 + " " + querydata[0].TimeAuto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
      data: false,
    });
  }
}
