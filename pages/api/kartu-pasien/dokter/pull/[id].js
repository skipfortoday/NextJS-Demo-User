const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import moment from "moment";
import firebase from "../../../../../src/config/firebase";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const checkData = await qryKartuPasien.query(`
      SELECT TOP 100 *FROM tblDokter WHERE flagPull NOT Like '%${req.query.id}%' ;
      `);
      if (checkData[0]) {
        let dataArray = "";
        checkData.forEach((items) => {
          dataArray += `(
                        '${items.IDDokter}',
                        ${
                          items.NamaDokter == null
                            ? null
                            : `'${items.NamaDokter.replace(/'/g, "''")}'`
                        },
                        ${items.Status == null ? null : `'${items.Status}'`},
                        ${
                          items.Exported == null ? null : `'${items.Exported}'`
                        },
                        '${moment(items.TglAuto).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}'),`;
        });
        // Data Dipotong , Belakang
        let dataCut = dataArray.substring(0, dataArray.trim().length - 1);

        // Menghilangkan Spaci & Whitespace Agar Dikirim Lebih Ringkas
        let dataFinal = dataCut.replace(/\s+/g, " ").trim();

        res.status(200).json({
          success: true,
          message: "Berhasil Mendapatkan Data Pull",
          data: dataFinal,
        });
      } else {
        res.status(200).json({
          success: false,
          status: 204,
          message: "Belum ada data untuk Pull",
          data: false,
        });
      }
    } else if (req.method === "POST") {
      await qryKartuPasien.execute(`
        SELECT Top 0 * INTO "#tmpDokter" FROM "tblDokter";
        INSERT INTO "#tmpDokter"
                    ("IDDokter", "NamaDokter", "Status", "Exported" , "TglAuto" ) VALUES ${req.body.data};
        MERGE tblDokter AS Target
        USING (SELECT * FROM #tmpDokter) AS Source
            ON (Target.IDDokter = Source.IDDokter)
            WHEN MATCHED THEN
                 UPDATE SET Target.NamaDokter = Source.NamaDokter, 
                           Target.Status = Source.Status,
                           Target.Exported = Source.Exported, 
                           Target.TglAuto = Source.TglAuto,
                           Target.flagPull = Target.flagPull + '-' + '${req.query.id}' ;
      `);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblDokter: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Post Flag Pull",
        data: req.body.data,
      });
    } else if (req.method === "PATCH") {
      const checkData = await qryKartuPasien.query(`
      SELECT TOP 1 IDDokter FROM logDokter WHERE flagPull NOT Like '%${req.query.id}%' ;
      `);
      if (checkData[0]) {
        let key = checkData[0].IDDokter;
        res.status(200).json({
          success: true,
          message: "Berhasil Mendapatkan Data Pull",
          data: key,
        });
      } else {
        res.status(200).json({
          success: false,
          status: 204,
          message: "Belum ada data untuk Pull",
          data: false,
        });
      }
    } else if (req.method === "PUT") {
      await qryKartuPasien.execute(`
        SELECT Top 1 * INTO "#tmpDokter" FROM "logDokter" WHERE IDDokter='${req.body.data}' ;
        MERGE logDokter AS Target
        USING (SELECT * FROM #tmpDokter) AS Source
            ON (Target.IDDokter = Source.IDDokter)
            WHEN MATCHED THEN
                 UPDATE SET Target.flagPull = Target.flagPull + '-' + '${req.query.id}' ;
      `);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblDokter: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil PUT Flag Pull Dokter",
        data: req.body.data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Anda Kehilangan Arah",
        data: false,
      });
    }
  } catch (error) {
    console.log("Eror Pull Dokter ", error);
    res.json("Eror Pull Dokter ", error);
  }
}
