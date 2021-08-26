const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import moment from "moment";
import firebase from "../../../../../src/config/firebase";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const checkData = await qryKartuPasien.query(`
      SELECT TOP 100 *FROM tblDataPasien WHERE flagPull NOT Like '%${req.query.id}%' ;
      `);
      if (checkData[0]) {
        let dataArray = "";
        checkData.forEach((items) => {
          dataArray += `(
            '${items.NKP}',
            ${items.NoAuto == null ? null : `'${items.NoAuto}'`},
            ${
              items.TglAwalDaftar == null
                ? null
                : `'${moment(items.TglAwalDaftar).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}'`
            },
            ${items.Nama == null ? null : `'${items.Nama.replace(/'/g, "''")}'`},
            ${
              items.Alamat == null
                ? null
                : `'${items.Alamat.replace(/'/g, "''")}'`
            },
            ${items.TelpRumah == null ? null : `'${items.TelpRumah.replace(/'/g, "''")}'`},
            ${items.HP == null ? null : `'${items.HP.replace(/'/g, "''")}'`},
            ${items.Fax == null ? null : `'${items.Fax.replace(/'/g, "''")}'`},
            ${
              items.TglLahir == null
                ? null
                : `'${moment(items.TglLahir).format("YYYY-MM-DD HH:mm:ss")}'`
            },
            ${items.NoDist == null ? null : `'${items.NoDist.replace(/'/g, "''")}'`}, 
            ${items.NoSponsor == null ? null : `'${items.NoSponsor.replace(/'/g, "''")}'`},
            ${items.Status == null ? null : `'${items.Status.replace(/'/g, "''")}'`},
            ${
              items.Keterangan == null
                ? null
                : `'${items.Keterangan.replace(/'/g, "''")}'`
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
            ${items.UserEntry == null ? null : `'${items.UserEntry}'`},
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
            ${items.Sponsor == null ? null : `'${items.Sponsor}'`},
            ${items.Exported == null ? null : `'${items.Exported}'`},
            ${
              items.LastCalldateUltah == null
                ? null
                : `'${moment(items.LastCalldateUltah).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}'`
            },
            ${
              items.tempCallPasien == null ? null : `'${items.tempCallPasien}'`
            },
            ${
              items.tempCallDate == null
                ? null
                : `'${moment(items.tempCallDate).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}'`
            },
            ${
              items.tempCallTime == null
                ? null
                : `'${moment(items.tempCallTime).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}'`
            },
            ${items.tempCallKet == null ? null : `'${items.tempCallKet}'`},
            ${
              items.tempNoAutoHistoryCallPasienUltah == null
                ? null
                : `'${items.tempNoAutoHistoryCallPasienUltah}'`
            },
            ${items.IDSponsor == null ? null : `'${items.IDSponsor}'`},
            ${
              items.LokasiFoto == null
                ? null
                : `'${items.LokasiFoto.replace(/'/g, "''")}'`
            },
            ${items.NoKTP == null ? null : `'${items.NoKTP}'`},
            ${
              items.NamaKTP == null
                ? null
                : `'${items.NamaKTP.replace(/'/g, "''")}'`
            },
            ${
              items.TempatLahir == null
                ? null
                : `'${items.TempatLahir.replace(/'/g, "''")}'`
            },
            ${
              items.AlamatKTP == null
                ? null
                : `'${items.AlamatKTP.replace(/'/g, "''")}'`
            },
            ${items.TelpKTP == null ? null : `'${items.TelpKTP}'`},
            ${items.Kota == null ? null : `'${items.Kota.replace(/'/g, "''")}'`},
            ${
              items.KotaKTP == null
                ? null
                : `'${items.KotaKTP.replace(/'/g, "''")}'`
            },
            ${
              items.KotaSMS == null
                ? null
                : `'${items.KotaSMS.replace(/'/g, "''")}'`
            },
            ${items.StatusLtPack == null ? null : `'${items.StatusLtPack}'`},
            ${items.NoDistLtPack == null ? null : `'${items.NoDistLtPack}'`},
            ${
              items.IDSponsorLtPack == null
                ? null
                : `'${items.IDSponsorLtPack}'`
            },
            ${items.PinBB == null ? null : `'${items.PinBB}'`},
            ${
              items.StatusDiskonPasien == null
                ? null
                : `'${items.StatusDiskonPasien}'`
            },       
            '${moment(moment(items.TglAuto)).format("YYYY-MM-DD HH:mm:ss")}'),`;
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
      SELECT Top 0 * INTO "#tmpDataPasien" FROM "tblDataPasien";
      INSERT INTO "#tmpDataPasien"
         ("NKP"
          ,"NoAuto"
          ,"TglAwalDaftar"
          ,"Nama"
          ,"Alamat"
          ,"TelpRumah"
          ,"HP"
          ,"Fax"
          ,"TglLahir"
          ,"NoDist"
          ,"NoSponsor"
          ,"Status"
          ,"Keterangan"
          ,"TglActivitas"
          ,"JamActivitas"
          ,"UserEntry"
          ,"LoginComp"
          ,"CompName"
          ,"PasienLama"
          ,"Sponsor"
          ,"Exported"
          ,"LastCallDateUltah"
          ,"tempCallPasien"
          ,"tempCallDate"
          ,"tempCallTime"
          ,"tempCallKet"
          ,"tempNoAutoHistoryCallPasienUltah"
          ,"IDSponsor"
          ,"LokasiFoto"
          ,"NoKTP"
          ,"NamaKTP"
          ,"TempatLahir"
          ,"AlamatKTP"
          ,"TelpKTP"
          ,"Kota"
          ,"KotaKTP"
          ,"KotaSMS"
          ,"StatusLtPack"
          ,"NoDistLtPack"
          ,"IDSponsorLtPack"
          ,"PinBB"
          ,"StatusDiskonPasien"
          ,"TglAuto") VALUES ${req.body.data};
      MERGE tblDataPasien AS Target
      USING (SELECT * FROM #tmpDataPasien) AS Source
      ON (Target.NKP = Source.NKP)
      WHEN MATCHED THEN
          UPDATE SET Target.NKP = Source.NKP,
                     Target.NoAuto = Source.NoAuto,
                     Target.TglAwalDaftar = Source.TglAwalDaftar,
                     Target.Nama = Source.Nama,
                     Target.Alamat = Source.Alamat,
                     Target.TelpRumah = Source.TelpRumah,
                     Target.HP = Source.HP,
                     Target.Fax = Source.Fax,
                     Target.TglLahir = Source.TglLahir,
                     Target.NoDist = Source.NoDist,
                     Target.NoSponsor = Source.NoSponsor,
                     Target.Status = Source.Status,
                     Target.Keterangan = Source.Keterangan,
                     Target.TglActivitas = Source.TglActivitas,
                     Target.JamActivitas = Source.JamActivitas,
                     Target.UserEntry = Source.UserEntry,
                     Target.LoginComp = Source.LoginComp,
                     Target.CompName = Source.CompName,
                     Target.PasienLama = Source.PasienLama,
                     Target.Sponsor = Source.Sponsor,
                     Target.Exported = Source.Exported,
                     Target.LastCallDateUltah = Source.LastCallDateUltah,
                     Target.tempCallPasien = Source.tempCallPasien,
                     Target.tempCallDate = Source.tempCallDate,
                     Target.tempCallTime = Source.tempCallTime,
                     Target.tempCallKet = Source.tempCallKet,
                     Target.tempNoAutoHistoryCallPasienUltah = Source.tempNoAutoHistoryCallPasienUltah,
                     Target.IDSponsor = Source.IDSponsor,
                     Target.LokasiFoto = Source.LokasiFoto,
                     Target.NoKTP = Source.NoKTP,
                     Target.NamaKTP = Source.NamaKTP,
                     Target.TempatLahir = Source.TempatLahir,
                     Target.AlamatKTP = Source.AlamatKTP,
                     Target.TelpKTP = Source.TelpKTP,
                     Target.Kota = Source.Kota,
                     Target.KotaKTP = Source.KotaKTP,
                     Target.KotaSMS = Source.KotaSMS,
                     Target.StatusLtPack = Source.StatusLtPack,
                     Target.NoDistLtPack = Source.NoDistLtPack,
                     Target.IDSponsorLtPack = Source.IDSponsorLtPack,
                     Target.PinBB = Source.PinBB,
                     Target.StatusDiskonPasien = Source.StatusDiskonPasien,
                     Target.TglAuto = Source.TglAuto,
                     Target.flagPull = Target.flagPull + '-' + '${req.query.id}' ;
                     `);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblDataPasien: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Post Flag Pull",
        data: req.body.data,
      });
    } else if (req.method === "PATCH") {
      const checkData = await qryKartuPasien.query(`
      SELECT TOP 1 NKP FROM logDataPasien WHERE flagPull NOT Like '%${req.query.id}%' ;
      `);
      if (checkData[0]) {
        let key = checkData[0].NKP;
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
        SELECT Top 1 * INTO "#tmpDataPasien" FROM "logDataPasien" WHERE NKP='${req.body.data}' ;
        MERGE logDataPasien AS Target
        USING (SELECT * FROM #tmpDataPasien) AS Source
            ON (Target.NKP = Source.NKP)
            WHEN MATCHED THEN
                 UPDATE SET Target.flagPull = Target.flagPull + '-' + '${req.query.id}' ;
      `);
      await firebase
        .database()
        .ref("/kartu-pasien")
        .update({
          tblDataPasien: moment().format("YYYY-MM-DD HH:mm:ss"),
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
    console.log("Eror Pull DataPasien ", error);
    res.json("Eror Pull DataPasien ", error);
  }
}
