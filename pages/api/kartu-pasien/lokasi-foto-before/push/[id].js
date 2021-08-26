const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      await qryKartuPasien.execute(` 
          SELECT Top 0 * INTO "#tmpPerawatanLokasiFotoBefore" FROM "tblPerawatanLokasiFotoBefore";
          INSERT INTO "#tmpPerawatanLokasiFotoBefore"
          ("NoAuto", "NoAutoPerawatan", "Keterangan", "UserEntry", "LoginComp", "CompName", "TglActivitas", "JamActivitas", "LokasiFotoBefore", "TglAuto") VALUES ${req.body.data};
          MERGE tblPerawatanLokasiFotoBefore AS Target
                  USING (SELECT * FROM #tmpPerawatanLokasiFotoBefore) AS Source
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
                              Target.LokasiFotoBefore = Source.LokasiFotoBefore,
                              Target.TglAuto = Source.TglAuto,
                              Target.flagPull = '${req.query.id}'
                  WHEN NOT MATCHED BY TARGET THEN
                       INSERT
                       ("NoAuto", "NoAutoPerawatan", "Keterangan", "UserEntry", "LoginComp", "CompName", "TglActivitas", "JamActivitas", "LokasiFotoBefore", "TglAuto", flagPull)
                        VALUES  (Source.NoAuto, Source.NoAutoPerawatan, Source.Keterangan, Source.UserEntry, Source.LoginComp, Source.CompName, Source.TglActivitas, Source.JamActivitas, Source.LokasiFotoBefore, Source.TglAuto,'${req.query.id}');`);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblPerawatanLokasiFotoBefore: moment().format("YYYY-MM-DD HH:mm:ss"),
        });

      await res.status(200).json({
        success: true,
        message: "Berhasil Post Data",
        data: false,
      });
    } else if (req.method === "PUT") {
      await qryKartuPasien.execute(`
      SELECT Top 1 * INTO "#tmpPerawatanLokasiFotoBefore" FROM "tblPerawatanLokasiFotoBefore" WHERE NoAuto='${req.body.data}' ;
      MERGE logPerawatanLokasiFotoBefore AS Target
      USING (SELECT * FROM #tmpPerawatanLokasiFotoBefore) AS Source
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
                              Target.LokasiFotoBefore = Source.LokasiFotoBefore,
                              Target.TglAuto = Source.TglAuto,
                              Target.flagPull = '${req.query.id}'
                  WHEN NOT MATCHED BY TARGET THEN
                       INSERT
                       ("NoAuto", "NoAutoPerawatan", "Keterangan", "UserEntry", "LoginComp", "CompName", "TglActivitas", "JamActivitas", "LokasiFotoBefore", "TglAuto", flagPull)
                        VALUES  (Source.NoAuto, Source.NoAutoPerawatan, Source.Keterangan, Source.UserEntry, Source.LoginComp, Source.CompName, Source.TglActivitas, Source.JamActivitas, Source.LokasiFotoBefore, Source.TglAuto,'${req.query.id}');`);

      let deletePerawatanLokasiFotoBefore = await qryKartuPasien.execute(
        `DELETE FROM tblPerawatanLokasiFotoBefore WHERE NoAuto = '${req.body.data}'`
      );
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblPerawatanLokasiFotoBefore: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Delete Data",
        data: req.body.data,
        status: deletePerawatanLokasiFotoBefore,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Anda Kehilangan Arah",
        data: false,
      });
    }
  } catch (error) {
    console.log("Eror Push Lokasi Foto before ", error);
    res.status(500).json("Eror Push Lokasi Foto before ", error);
  }
}
