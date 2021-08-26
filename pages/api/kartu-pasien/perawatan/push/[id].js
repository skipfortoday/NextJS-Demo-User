const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
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
                  Target.flagPull = '${req.query.id}'	
              WHEN NOT MATCHED BY TARGET THEN
                   INSERT
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
                   ,"TglAuto"
                   ,"flagPull")
                    VALUES  (Source.NoAuto
                      ,Source.NKP
                      ,Source.NoUrutTreatment
                      ,Source.TglTreatment
                      ,Source.Nama
                      ,Source.Alamat
                      ,Source.TelpRumah
                      ,Source.HP
                      ,Source.Anamnesa
                      ,Source.Pagi
                      ,Source.Sore
                      ,Source.Malam
                      ,Source.Terapy
                      ,Source.NamaDokterKonsul
                      ,Source.NamaDokter
                      ,Source.NamaBA
                      ,Source.Status
                      ,Source.TglActivitas
                      ,Source.JamActivitas
                      ,Source.Keterangan
                      ,Source.UserEntry
                      ,Source.LoginComp
                      ,Source.CompName
                      ,Source.PasienLama
                      ,Source.Exported
                      ,Source.CallPasien
                      ,Source.CallDate
                      ,Source.CallTime
                      ,Source.CallKet
                      ,Source.CallPasienResep
                      ,Source.IDJenisPerawatan
                      ,Source.TglAuto
                      ,'${req.query.id}');
      `);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblPerawatan: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Push Data Perawatan ",
        data: req.body.data,
      });
    } else if (req.method === "PUT") {
      await qryKartuPasien.execute(`
      SELECT Top 1 * INTO "#tmpPerawatan" FROM "tblPerawatan" WHERE NoAuto='${req.body.data}' ;
      MERGE logPerawatan AS Target
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
          Target.flagPull = '${req.query.id}'	
      WHEN NOT MATCHED BY TARGET THEN
           INSERT
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
           ,"TglAuto"
           ,"flagPull")
            VALUES  (Source.NoAuto
              ,Source.NKP
              ,Source.NoUrutTreatment
              ,Source.TglTreatment
              ,Source.Nama
              ,Source.Alamat
              ,Source.TelpRumah
              ,Source.HP
              ,Source.Anamnesa
              ,Source.Pagi
              ,Source.Sore
              ,Source.Malam
              ,Source.Terapy
              ,Source.NamaDokterKonsul
              ,Source.NamaDokter
              ,Source.NamaBA
              ,Source.Status
              ,Source.TglActivitas
              ,Source.JamActivitas
              ,Source.Keterangan
              ,Source.UserEntry
              ,Source.LoginComp
              ,Source.CompName
              ,Source.PasienLama
              ,Source.Exported
              ,Source.CallPasien
              ,Source.CallDate
              ,Source.CallTime
              ,Source.CallKet
              ,Source.CallPasienResep
              ,Source.IDJenisPerawatan
              ,Source.TglAuto
              ,'${req.query.id}');
    `);
      let deletePerawatan = await qryKartuPasien.execute(
        `DELETE FROM tblPerawatan WHERE NoAuto = '${req.body.data}'`
      );
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblPerawatan: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Delete Data",
        data: req.body.data,
        status: deletePerawatan,
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
    res.json("Eror Sycron perawatan ", error);
  }
}
