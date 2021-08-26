const ADODB = require("node-adodb");
import Config from "./index";
const qryKartuPasien = ADODB.open(
  `Provider=SQLOLEDB.1;Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=${Config.Database};Data Source=${Config.ipDatabase};`
);
module.exports = qryKartuPasien;
