const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
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
                               Target.flagPull = '${req.query.id}'
                WHEN NOT MATCHED BY TARGET THEN
                          INSERT (IDBA,NamaBA,Status,Exported,TglAuto,flagPull)
                          VALUES (Source.IDBA, Source.NamaBA, Source.Status,
                          Source.Exported,Source.TglAuto,'${req.query.id}');
          `);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblBA: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Post Data",
        data: req.body.data,
      });
    } else if (req.method === "PUT") {
      await qryKartuPasien.execute(`
      SELECT Top 1 * INTO "#tmpBA" FROM "tblBA" WHERE IDBA='${req.body.data}' ;
      MERGE logBA AS Target
      USING (SELECT * FROM #tmpBA) AS Source
          ON (Target.IDBA = Source.IDBA)
          WHEN MATCHED THEN
               UPDATE SET Target.NamaBA = Source.NamaBA, 
                          Target.Status = Source.Status,
                         Target.Exported = Source.Exported, 
                         Target.TglAuto = Source.TglAuto,
                         Target.flagPull = '${req.query.id}'
          WHEN NOT MATCHED BY TARGET THEN
                    INSERT (IDBA,NamaBA,Status,Exported,TglAuto,flagPull)
                    VALUES (Source.IDBA, Source.NamaBA, Source.Status,
                    Source.Exported,Source.TglAuto,'${req.query.id}');
    `);
      let deleteBA = await qryKartuPasien.execute(
        `DELETE FROM tblBA WHERE IDBA = '${req.body.data}'`
      );
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblBA: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Delete Data",
        data: req.body.data,
        status: deleteBA,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Anda Kehilangan Arah",
        data: false,
      });
    }
  } catch (error) {
    console.log(" Erorr Push BA ", error);
    res.json("Erorr Push BA ", error);
  }
}
