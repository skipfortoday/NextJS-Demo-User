const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      await qryKartuPasien.execute(`
         SELECT Top 0 * INTO "#tmpDokter" FROM "tblDokter"
         INSERT INTO "#tmpDokter"
         ("IDDokter", "NamaDokter", "Status", "Exported" , TglAuto) VALUES ${req.body.data};
         MERGE tblDokter AS Target
         USING (SELECT * FROM "#tmpDokter") AS Source
         ON (Target.IDDokter = Source.IDDokter)
         WHEN MATCHED THEN
             UPDATE SET Target.NamaDokter = Source.NamaDokter, 
                        Target.Status = Source.Status,
                        Target.Exported = Source.Exported, 
                        Target.TglAuto = Source.TglAuto,
                        Target.flagPull = '${req.query.id}'		  
         WHEN NOT MATCHED BY TARGET THEN
             INSERT (IDDokter,NamaDokter,Status,Exported,TglAuto,flagPull)
             VALUES (Source.IDDokter, Source.NamaDokter, Source.Status,
         Source.Exported,Source.TglAuto,'${req.query.id}');`);

      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblDokter: moment().format("YYYY-MM-DD HH:mm:ss"),
        });

      res.status(200).json({
        success: true,
        message: "Berhasil Post Data",
        data: req.body.data,
      });
    } else if (req.method === "PUT") {
      await qryKartuPasien.execute(`
      SELECT Top 1 * INTO "#tmpDokter" FROM "tblDokter" WHERE IDDokter='${req.body.data}' ;
      MERGE logDokter AS Target
      USING (SELECT * FROM #tmpDokter) AS Source
          ON (Target.IDDokter = Source.IDDokter)
          WHEN MATCHED THEN
               UPDATE SET Target.NamaDokter = Source.NamaDokter, 
                          Target.Status = Source.Status,
                         Target.Exported = Source.Exported, 
                         Target.TglAuto = Source.TglAuto,
                         Target.flagPull = '${req.query.id}'
          WHEN NOT MATCHED BY TARGET THEN
                    INSERT (IDDokter,NamaDokter,Status,Exported,TglAuto,flagPull)
                    VALUES (Source.IDDokter, Source.NamaDokter, Source.Status,
                    Source.Exported,Source.TglAuto,'${req.query.id}');
    `);
      let deleteDokter = await qryKartuPasien.execute(
        `DELETE FROM tblDokter WHERE IDDokter = '${req.body.data}'`
      );
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblDokter: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Delete Data",
        data: req.body.data,
        status: deleteDokter,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Anda Kehilangan Arah",
        data: false,
      });
    }
  } catch (error) {
    console.log("Eror Push Dokter ", error);
    res.json("Eror Push dokter ", error);
  }
}
