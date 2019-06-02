import superagent from 'superagent';
import auth from './auth';
import history from './m-history';

const methods = ['get', 'post', 'put', 'path', 'del'];
export const API_HOST = 'http://localhost:8080'
export const AUTH_SERVER = 'http://localhost:8080/login'

let formatUrl = path => {
  return API_HOST + path;
};
export const login = (username, password) => {
  let request = superagent.post(AUTH_SERVER);
  return request.send({username, password})
};

export const logout = () => {
  let request = superagent.get('http://localhost:8080/logout');
  request.set('Authorization', `Bearer ${auth.gettoken()}`);
  return request.send()
}

export const download = (path, fileName) => {
  const request = superagent.get(formatUrl(path));
  request.set('Authorization', `Bearer ${auth.gettoken()}`);
  request.responseType('blob').then(data => {
    var a = document.createElement('a');
    var url = window.URL.createObjectURL(data.body);
    a.href = url;
    a.download = fileName || 'export.xls';
    a.click();
    window.URL.revokeObjectURL(url);
  });
};

export default class ApiClient {
  constructor() {
    methods.forEach(method => {
      this[method] = (path, {params, data} = {}) => {
        return new Promise((resolve, reject) => {
          const request = superagent[method](formatUrl(path));
          request.set('Authorization', `Bearer ${auth.gettoken()}`);
          if (params) {
            request.query(params);
          }
          if (data) {
            request.send(data);
          }

          request.end((error, {body, headers} = {}) => {
            if (error) {
              if ([401, 403].indexOf(error.status) !== -1) {
                auth.clear();
                history.push('/login');
                return;
              }
              reject(body || error);
            } else {
              if (body && body.message === 'token.invalid') {
                auth.clear();
                history.push('/login');
                return;
              }
              // FIXME: THIS IS A TRICKY FIX FOR THE JSON_SERVER. IF WE USE SPRINGBOOT, NO NEED THIS.
              body.total = parseInt(headers['x-total-count'] || 0, 10)
              resolve(body);
            }
          });
        });
      };
    });
  }

  empty() {
  }
}
