import axios from "axios";
import {
  GET_KARTUPASIEN_DATAPASIEN,
  GET_KARTUPASIEN_BA,
  GET_KARTUPASIEN_DOKTER,
  GET_KARTUPASIEN_PERAWATAN,
  GET_KARTUPASIEN_LOKASIFOTOBEFORE,
  GET_KARTUPASIEN_LOKASIFOTOAFTER,
} from "../constants";
import conf from "../config";

export const getDataPasien = () => {
  return (dispatch) => {
    axios
      .get(`${conf.baseURL}/api/kartu-pasien/data-pasien/data`)
      .then(function (response) {
        dispatch({
          type: GET_KARTUPASIEN_DATAPASIEN,
          payload: {
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_KARTUPASIEN_DATAPASIEN,
          payload: {
            data: false,
            errorMessage: error,
          },
        });
      });
  };
};

export const getBA = () => {
  return (dispatch) => {
    console.log(conf.baseURL);
    axios
      .get(`${conf.baseURL}/api/kartu-pasien/ba/data`)
      .then(function (response) {
        dispatch({
          type: GET_KARTUPASIEN_BA,
          payload: {
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_KARTUPASIEN_BA,
          payload: {
            data: false,
            errorMessage: error,
          },
        });
      });
  };
};

export const getDokter = () => {
  return (dispatch) => {
    axios
      .get(`${conf.baseURL}/api/kartu-pasien/dokter/data`)
      .then(function (response) {
        dispatch({
          type: GET_KARTUPASIEN_DOKTER,
          payload: {
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_KARTUPASIEN_DOKTER,
          payload: {
            data: false,
            errorMessage: error,
          },
        });
      });
  };
};

export const getPerawatan = () => {
  return (dispatch) => {
    axios
      .get(`${conf.baseURL}/api/kartu-pasien/perawatan/data`)
      .then(function (response) {
        dispatch({
          type: GET_KARTUPASIEN_PERAWATAN,
          payload: {
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_KARTUPASIEN_PERAWATAN,
          payload: {
            data: false,
            errorMessage: error,
          },
        });
      });
  };
};

export const getLokasiFotoBefore = () => {
  return (dispatch) => {
    axios
      .get(`${conf.baseURL}/api/kartu-pasien/lokasi-foto-before/data`)
      .then(function (response) {
        dispatch({
          type: GET_KARTUPASIEN_LOKASIFOTOBEFORE,
          payload: {
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_KARTUPASIEN_LOKASIFOTOBEFORE,
          payload: {
            data: false,
            errorMessage: error,
          },
        });
      });
  };
};

export const getLokasiFotoAfter = () => {
  return (dispatch) => {
    axios
      .get(`${conf.baseURL}/api/kartu-pasien/lokasi-foto-after/data`)
      .then(function (response) {
        dispatch({
          type: GET_KARTUPASIEN_LOKASIFOTOAFTER,
          payload: {
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_KARTUPASIEN_LOKASIFOTOAFTER,
          payload: {
            data: false,
            errorMessage: error,
          },
        });
      });
  };
};
