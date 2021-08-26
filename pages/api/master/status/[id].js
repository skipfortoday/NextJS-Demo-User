const qryKartuPasien = require("../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      await qryKartuPasien.execute(`
      UPDATE OnlineStatus
      SET Status = 'Internet ON'
      WHERE ID = '${req.query.id}';
          `);

      await firebase
        .database()
        .ref("/OnlineStatus")
        .update({
          param: moment().format("YYYY-MM-DD HH:mm:ss"),
        });

      res.status(200).json({
        success: true,
        message: "Berhasil Post Data",
      });
    } else if (req.method === "PUT") {
      await qryKartuPasien.execute(`
        UPDATE OnlineStatus
        SET Status = 'Internet OFF'
        WHERE ID = '${req.query.id}';
            `);

      await firebase
        .database()
        .ref("/OnlineStatus")
        .update({
          param: moment().format("YYYY-MM-DD HH:mm:ss"),
        });

      res.status(200).json({
        success: true,
        message: "Berhasil Post Data",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Anda Kehilangan Arah",
        data: false,
      });
    }
  } catch (error) {
    console.log(" Erorr Status Update ", error);
    res.json("Erorr Status Update ", error);
  }
}
