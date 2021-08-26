const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      await qryKartuPasien.execute(` 
          SELECT Top 0 * INTO "#tmpPerawatanLokasiFotoAfter" FROM "tblPerawatanLokasiFotoAfter";
          INSERT INTO "#tmpPerawatanLokasiFotoAfter"
          ("NoAuto", "NoAutoPerawatan", "Keterangan", "UserEntry", "LoginComp", "CompName", "TglActivitas", "JamActivitas", "LokasiFotoAfter", "TglAuto") VALUES ${req.body.data};
          MERGE tblPerawatanLokasiFotoAfter AS Target
                  USING (SELECT * FROM #tmpPerawatanLokasiFotoAfter) AS Source
                  ON (Target.NoAuto = Source.NoAuto)
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
                              Target.flagPull = '${req.query.id}'
                  WHEN NOT MATCHED BY TARGET THEN
                       INSERT
                       ("NoAuto", "NoAutoPerawatan", "Keterangan", "UserEntry", "LoginComp", "CompName", "TglActivitas", "JamActivitas", "LokasiFotoAfter", "TglAuto", flagPull)
                        VALUES  (Source.NoAuto, Source.NoAutoPerawatan, Source.Keterangan, Source.UserEntry, Source.LoginComp, Source.CompName, Source.TglActivitas, Source.JamActivitas, Source.LokasiFotoAfter, Source.TglAuto,'${req.query.id}');`);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblPerawatanLokasiFotoAfter: moment().format("YYYY-MM-DD HH:mm:ss"),
        });

      await res.status(200).json({
        success: true,
        message: "Berhasil Post Data",
        data: false,
      });
    } else if (req.method === "PUT") {
      await qryKartuPasien.execute(`
      SELECT Top 1 * INTO "#tmpPerawatanLokasiFotoAfter" FROM "tblPerawatanLokasiFotoAfter" WHERE NoAuto='${req.body.data}' ;
      MERGE logPerawatanLokasiFotoAfter AS Target
      USING (SELECT * FROM #tmpPerawatanLokasiFotoAfter) AS Source
          ON (Target.NoAuto = Source.NoAuto)
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
                              Target.flagPull = '${req.query.id}'
                  WHEN NOT MATCHED BY TARGET THEN
                       INSERT
                       ("NoAuto", "NoAutoPerawatan", "Keterangan", "UserEntry", "LoginComp", "CompName", "TglActivitas", "JamActivitas", "LokasiFotoAfter", "TglAuto", flagPull)
                        VALUES  (Source.NoAuto, Source.NoAutoPerawatan, Source.Keterangan, Source.UserEntry, Source.LoginComp, Source.CompName, Source.TglActivitas, Source.JamActivitas, Source.LokasiFotoAfter, Source.TglAuto,'${req.query.id}');`);
      let deletePerawatanLokasiFotoAfter = await qryKartuPasien.execute(
        `DELETE FROM tblPerawatanLokasiFotoAfter WHERE NoAuto = '${req.body.data}'`
      );
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblPerawatanLokasiFotoAfter: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Delete Data",
        data: req.body.data,
        status: deletePerawatanLokasiFotoAfter,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Anda Kehilangan Arah",
        data: false,
      });
    }
  } catch (error) {
    console.log("Eror Push Lokasi Foto After ", error);
    res.status(500).json("Eror Push Lokasi Foto After ", error);
  }
}
