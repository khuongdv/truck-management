import superagent from 'superagent';
import auth from './auth';
import history from './m-history';

const methods = ['get', 'post', 'put', 'path', 'del'];
const MODE = 'DEV'
const TEST = '127.0.0.1:8000';
const DEV = 'localhost:';
export const API_HOST = `http://${MODE === 'DEV' ? DEV + 8011 : TEST}/ketoan/api`;
export const AUTH_SERVER = `http://${MODE === 'DEV' ? DEV + 8020 : TEST}/auth`;

let formatUrl = path => {
  return API_HOST + path;
};
export const login = (username, password) => {
  let request = superagent.post(`${AUTH_SERVER}/oauth/token`);
  return request
    .set('Authorization', 'Basic ' + btoa('public:secret'))
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send('client_id=public')
    .send('&grant_type=password')
    .send(`&username=${username}`)
    .send(`&password=${password}`);
};

export const logout = () => {
  let request = superagent.del(`${AUTH_SERVER}/oauth/logout`);
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

          request.end((error, {body} = {}) => {
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
