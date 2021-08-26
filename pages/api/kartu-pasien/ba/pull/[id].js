const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import moment from "moment";
import firebase from "../../../../../src/config/firebase";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const checkData = await qryKartuPasien.query(`
      SELECT TOP 100 *FROM tblBA WHERE flagPull NOT Like '%${req.query.id}%' ;
      `);
      if (checkData[0]) {
        let dataArray = "";
        checkData.forEach((items) => {
          dataArray += `(
                        '${items.IDBA}',
                        ${
                          items.NamaBA == null
                            ? null
                            : `'${items.NamaBA.replace(/'/g, "''")}'`
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
        SELECT Top 0 * INTO "#tmpBA" FROM "tblBA";
        INSERT INTO "#tmpBA"
                    ("IDBA", "NamaBA", "Status", "Exported" , "TglAuto" ) VALUES ${req.body.data};
        MERGE tblBA AS Target
        USING (SELECT * FROM #tmpBA) AS Source
            ON (Target.IDBA = Source.IDBA)
            WHEN MATCHED THEN
                 UPDATE SET Target.NamaBA = Source.NamaBA, 
                           Target.Status = Source.Status,
                           Target.Exported = Source.Exported, 
                           Target.TglAuto = Source.TglAuto,
                           Target.flagPull = Target.flagPull + '-' + '${req.query.id}' ;
      `);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblBA: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Post Flag Pull BA",
        data: req.body.data,
      });
    } else if (req.method === "PATCH") {
      const checkData = await qryKartuPasien.query(`
      SELECT TOP 1 IDBA FROM logBA WHERE flagPull NOT Like '%${req.query.id}%' ;
      `);
      if (checkData[0]) {
        let key = checkData[0].IDBA;
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
        SELECT Top 1 * INTO "#tmpBA" FROM "logBA" WHERE IDBA='${req.body.data}' ;
        MERGE logBA AS Target
        USING (SELECT * FROM #tmpBA) AS Source
            ON (Target.IDBA = Source.IDBA)
            WHEN MATCHED THEN
                 UPDATE SET Target.flagPull = Target.flagPull + '-' + '${req.query.id}' ;
      `);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblBA: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil PUT Flag Pull BA",
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
    console.log("Eror Pull BA", error);
    res.json("Eror Pull BA ", error);
  }
}
