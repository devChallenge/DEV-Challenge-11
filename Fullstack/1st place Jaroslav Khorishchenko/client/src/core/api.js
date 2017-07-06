// Utils
import _ from 'lodash';
import axios from 'axios';
// Log
import Log from 'helpers/log';
const log = Log.withModule('api');
// Const
const API_ROOT = '/api/v1';

// Api req

const apiReq = ({ method = 'GET', path = '/', data = null, params = null }, cb) => {
  const reqOpt = {};
  reqOpt.method = method.toLowerCase();
  reqOpt.url = API_ROOT + path;
  reqOpt.params = params;
  reqOpt.data = data;
  log(`req with opt: ${JSON.stringify(reqOpt)}`);
  axios(reqOpt)
    .then((resp) => {
      if (resp.status > 299) {
        const errData = resp.data ? _.cloneDeep(resp.data) : {};
        errData.code = resp.status;
        return cb(errData);
      }
      return cb(null, resp.data);
    })
    .catch((err) => {
      if (err.response) {
        const resp = err.response;
        const errData = resp.data ? _.cloneDeep(resp.data) : {};
        errData.code = resp.status;
        return cb(errData);
      }
      return cb(err);
    });
};

// Auth

export const login = (email, pass, cb) => {
  apiReq({ method: 'POST', path: '/auth/signin', data: { email, pass } }, cb);
};

export const logout = (cb) => {
  apiReq({ method: 'POST', path: '/auth/signout' }, cb);
};

export const me = (cb) => {
  apiReq({ path: '/me' }, cb);
};

// Flights

export const listFlights = (cb) => {
  apiReq({ path: '/flights' }, cb);
};

export const getFlightById = (id, cb) => {
  apiReq({ path: `/flights?id=${id}` }, cb);
};

export const addFlight = (data, cb) => {
  if (_.isString(data.id)) data.id = parseInt(data.id);
  if (_.isString(data.cost)) data.id = parseInt(data.cost);
  if (_.isString(data.price)) data.id = parseInt(data.price);
  const params = { ...data };
  apiReq({ method: 'PUT', path: '/flights', params }, cb);
};

export const editFlight = (id, data, cb) => {
  if (_.isString(data.id)) data.id = parseInt(data.id);
  if (_.isString(data.cost)) data.id = parseInt(data.cost);
  if (_.isString(data.price)) data.id = parseInt(data.price);
  const params = { id, ...data };
  apiReq({ method: 'POST', path: '/flights', params }, cb);
};

export const removeFlight = (id, cb) => {
  apiReq({ method: 'DELETE', path: `/flights?id=${id}` }, cb);
};

// Trips

export const listTrips = (params, cb) => {
  apiReq({ path: '/trips', params }, cb);
};
