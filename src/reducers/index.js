import { combineReducers } from "redux";
import kartuPasien from "./kartu-pasien-reducer";
import users from "./kartu-pasien-reducer";

export default combineReducers({
  kartuPasien,
  users,
});
