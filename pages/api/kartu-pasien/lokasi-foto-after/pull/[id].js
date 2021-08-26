const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import moment from "moment";
import firebase from "../../../../../src/config/firebase";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const checkData = await qryKartuPasien.query(`
      SELECT TOP 100 *FROM tblPerawatanLokasiFotoAfter WHERE flagPull NOT Like '%${req.query.id}%' ;
      `);
      if (checkData[0]) {
        let dataArray = "";
        checkData.forEach((items) => {
          dataArray += `(
                '${items.NoAuto}',
                ${
                  items.NoAutoPerawatan == null
                    ? null
                    : `'${items.NoAutoPerawatan}'`
                },
                ${
                  items.Keterangan == null
                    ? null
                    : `'${items.Keterangan.replace(/'/g, "''")}'`
                },
                ${
                  items.UserEntry == null
                    ? null
                    : `'${items.UserEntry.replace(/'/g, "''")}'`
                },
                ${
                  items.LoginComp == null
                    ? null
                    : `'${items.LoginComp.replace("\x00", "")}'`
                },
                ${
                  items.CompName == null
                    ? null
                    : `'${items.CompName.replace("\x00", "")}'`
                },
                ${
                  items.TglActivitas == null
                    ? null
                    : `'${moment(items.TglActivitas).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}'`
                },
                ${
                  items.JamActivitas == null
                    ? null
                    : `'${moment(items.JamActivitas).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}'`
                },
                ${
                  items.LokasiFotoAfter == null
                    ? null
                    : `'${items.LokasiFotoAfter.replace(/'/g, "''")}'`
                },
                '${moment(items.TglAuto).format("YYYY-MM-DD HH:mm:ss")}'),`;
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
      SELECT Top 0 * INTO "#tmpPerawatanLokasiFotoAfter" FROM "tblPerawatanLokasiFotoAfter";
      INSERT INTO "#tmpPerawatanLokasiFotoAfter"
      ("NoAuto", "NoAutoPerawatan", "Keterangan", "UserEntry", "LoginComp", "CompName", "TglActivitas", "JamActivitas", "LokasiFotoAfter", "TglAuto")  VALUES ${req.body.data};
        MERGE tblPerawatanLokasiFotoAfter AS Target
        USING (SELECT * FROM #tmpPerawatanLokasiFotoAfter) AS Source
            ON (Target.NoAuto= Source.NoAuto)
            WHEN MATCHED THEN
            UPDATE SET
            Target.NoAuto = Source.NoAuto,
            Target.NoAutoPerawatan = Source.NoAutoPerawatan,
            Target.Keterangan = Source.Keterangan, 
            Target.UserEntry = Source.UserEntry,
            Target.LoginComp = Source.LoginComp,
            Target.CompName = Source.CompName,
            Target.TglActivitas = Source.TglActivitas,
            Target.JamActivitas = Source.JamActivitas,
            Target.LokasiFotoAfter = Source.LokasiFotoAfter,
            Target.TglAuto = Source.TglAuto,
            Target.flagPull = Target.flagPull + '-' + '${req.query.id}' ;
      `);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblPerawatanLokasiFotoAfter: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Post Flag Pull",
        data: req.body.data,
      });
    } else if (req.method === "PATCH") {
      const checkData = await qryKartuPasien.query(`
      SELECT TOP 1 NoAuto FROM logPerawatanLokasiFotoAfter WHERE flagPull NOT Like '%${req.query.id}%' ;
      `);
      if (checkData[0]) {
        let key = checkData[0].NoAuto;
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
        SELECT Top 1 * INTO "#tmpPerawatanLokasiFotoAfter" FROM "logPerawatanLokasiFotoAfter" WHERE NoAuto='${req.body.data}' ;
        MERGE logPerawatanLokasiFotoAfter AS Target
        USING (SELECT * FROM #tmpPerawatanLokasiFotoAfter) AS Source
            ON (Target.NoAuto = Source.NoAuto)
            WHEN MATCHED THEN
                 UPDATE SET Target.flagPull = Target.flagPull + '-' + '${req.query.id}' ;
      `);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblPerawatanLokasiFotoAfter: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil PUT Flag Pull PerawatanLokasiFotoAfter",
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
    console.log("Eror Pull Lokasi Foto After ", error);
    res.json("Eror Pull Lokasi Foto After ", error);
  }
}
