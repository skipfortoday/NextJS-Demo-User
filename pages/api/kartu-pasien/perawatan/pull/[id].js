const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import moment from "moment";
import firebase from "../../../../../src/config/firebase";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const checkData = await qryKartuPasien.query(`
      SELECT TOP 100 *FROM tblPerawatan WHERE flagPull NOT Like '%${req.query.id}%' ;
      `);
      if (checkData[0]) {
        let dataArray = "";
        checkData.forEach((items) => {
          dataArray += `(
            '${items.NoAuto}',
             ${items.NKP == null ? null : `'${items.NKP}'`},
             ${
               items.NoUrutTreatment == null
                 ? null
                 : `'${items.NoUrutTreatment}'`
             },
             ${
               items.TglTreatment == null
                 ? null
                 : `'${moment(items.TglTreatment).format(
                     "YYYY-MM-DD HH:mm:ss"
                   )}'`
             },
             ${
               items.Nama == null ? null : `'${items.Nama.replace(/'/g, "''")}'`
             },
             ${
               items.Alamat == null
                 ? null
                 : `'${items.Alamat.replace(/'/g, "''")}'`
             },
             ${items.TelpRumah == null ? null : `'${items.TelpRumah}'`},
             ${items.HP == null ? null : `'${items.HP}'`},
             ${
               items.Anamnesa == null
                 ? null
                 : `'${items.Anamnesa.replace(/'/g, "''")}'`
             },
             ${
               items.Pagi == null ? null : `'${items.Pagi.replace(/'/g, "''")}'`
             },
             ${
               items.Sore == null ? null : `'${items.Sore.replace(/'/g, "''")}'`
             },
             ${
               items.Malam == null
                 ? null
                 : `'${items.Malam.replace(/'/g, "''")}'`
             },
             ${
               items.Terapy == null
                 ? null
                 : `'${items.Terapy.replace(/'/g, "''")}'`
             },
             ${
               items.NamaDokterKonsul == null
                 ? null
                 : `'${items.NamaDokterKonsul.replace(/'/g, "''")}'`
             },
             ${
               items.NamaDokter == null
                 ? null
                 : `'${items.NamaDokter.replace(/'/g, "''")}'`
             },
             ${
               items.NamaBA == null
                 ? null
                 : `'${items.NamaBA.replace(/'/g, "''")}'`
             },
             ${
               items.Status == null
                 ? null
                 : `'${items.Status.replace(/'/g, "''")}'`
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
             ${items.PasienLama == null ? null : `'${items.PasienLama}'`},
             ${items.Exported == null ? null : `'${items.Exported}'`},
             ${items.CallPasien == null ? null : `'${items.CallPasien}'`},
             ${
               items.CallDate == null
                 ? null
                 : `'${moment(items.CallDate).format("YYYY-MM-DD HH:mm:ss")}'`
             },
             ${
               items.CallTime == null
                 ? null
                 : `'${moment(items.CallTime).format("YYYY-MM-DD HH:mm:ss")}'`
             },
             ${
               items.CallKet == null
                 ? null
                 : `'${items.CallKet.replace(/'/g, "''")}'`
             },
             ${
               items.CallPasienResep == null
                 ? null
                 : `'${items.CallPasienResep}'`
             },
             ${
               items.IDJenisPerawatan == null
                 ? null
                 : `'${items.IDJenisPerawatan}'`
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
        SELECT Top 0 * INTO "#tmpPerawatan" FROM "tblPerawatan";
        INSERT INTO "#tmpPerawatan"
        ("NoAuto"
        ,"NKP"
        ,"NoUrutTreatment"
        ,"TglTreatment"
        ,"Nama"
        ,"Alamat"
        ,"TelpRumah"
        ,"HP"
        ,"Anamnesa"
        ,"Pagi"
        ,"Sore"
        ,"Malam"
        ,"Terapy"
        ,"NamaDokterKonsul"
        ,"NamaDokter"
        ,"NamaBA"
        ,"Status"
        ,"TglActivitas"
        ,"JamActivitas"
        ,"Keterangan"
        ,"UserEntry"
        ,"LoginComp"
        ,"CompName"
        ,"PasienLama"
        ,"Exported"
        ,"CallPasien"
        ,"CallDate"
        ,"CallTime"
        ,"CallKet"
        ,"CallPasienResep"
        ,"IDJenisPerawatan"
        ,"TglAuto") VALUES ${req.body.data};
        MERGE tblPerawatan AS Target
        USING (SELECT * FROM #tmpPerawatan) AS Source
            ON (Target.NoAuto = Source.NoAuto)
            WHEN MATCHED THEN
            UPDATE SET
            Target.NKP = Source.NKP,
            Target.NoUrutTreatment = Source.NoUrutTreatment,
            Target.TglTreatment = Source.TglTreatment,
            Target.Nama = Source.Nama,
            Target.Alamat = Source.Alamat,
            Target.TelpRumah = Source.TelpRumah,
            Target.HP = Source.HP,
            Target.Anamnesa = Source.Anamnesa,
            Target.Pagi = Source.Pagi,
            Target.Sore = Source.Sore,
            Target.Malam = Source.Malam,
            Target.Terapy = Source.Terapy,
            Target.NamaDokterKonsul = Source.NamaDokterKonsul,
            Target.NamaDokter = Source.NamaDokter,
            Target.NamaBA = Source.NamaBa,
            Target.Status = Source.Status,
            Target.TglActivitas = Source.TglActivitas,
            Target.JamActivitas = Source.JamActivitas,
            Target.Keterangan = Source.Keterangan,
            Target.UserEntry = Source.UserEntry,
            Target.LoginComp = Source.Logincomp,
            Target.CompName = Source.CompName,
            Target.PasienLama = Source.PasienLama,
            Target.Exported = Source.Exported,
            Target.CallPasien = Source.CallPAsien,
            Target.CallDate = Source.CallDate,
            Target.CallTime = Source.CallTime,
            Target.CallKet = Source.CallKet,
            Target.CallPasienResep = Source.CallPasienResep,
            Target.IDJenisPerawatan = Source.IDJenisPerawatan,
            Target.TglAuto = Source.TglAuto,
            Target.flagPull = Target.flagPull + '-' + '${req.query.id}' ;
                           
      `);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblPerawatan: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Post Flag Pull",
        data: req.body.data,
      });
    } else if (req.method === "PATCH") {
      const checkData = await qryKartuPasien.query(`
      SELECT TOP 1 NoAuto FROM logPerawatan WHERE flagPull NOT Like '%${req.query.id}%' ;
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
        SELECT Top 1 * INTO "#tmpPerawtan" FROM "logPerawatan" WHERE NoAuto='${req.body.data}' ;
        MERGE logPerawatan AS Target
        USING (SELECT * FROM #tmpPerawatan) AS Source
            ON (Target.NoAuto = Source.NoAuto)
            WHEN MATCHED THEN
                 UPDATE SET Target.flagPull = Target.flagPull + '-' + '${req.query.id}' ;
      `);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblPerawatan: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil PUT Flag Pull Perawatan",
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
    console.log(error);
    res.json("Eror Pull Perawatan ", error);
  }
}
