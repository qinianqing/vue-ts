import axios from 'axios';
import { Config } from './index';
// import { RedirectLogin } from '@/util/Actions';
import ErrorHandle from './ErrorHandle';
/**
 * commonjs for ajax request
 * @params url send request address
 * @param method send request method
 * @param options send request other config
 * @author qinianqing@jiagouyun.com
 */
export function axiosAjax(url: string, method?: string, options?: any, notShowErrorMsg: boolean = false) {
  const defaultOptions = {
    method: 'GET',
    withCredentials: true,
    timeout: 60000,
    baseURL: Config.apiUrl,
    // headers: {
    //   'X-FT-Auth-Token': window.$cookies.get(Utils.getCookieTokenKey()) || '',
    // },
  };
  options = Object.assign(
    defaultOptions,
    {
      url: url || '',
      method: method || 'GET',
      baseURL: getBaseUrl(options ? options.apiType : null),
    },
    options || {},
  );

  /**
   * 获取接口的base url地址
   * @param apiType  识别配置中key包含apiurl的地址，比如：值为home， 则获取配置信息中的homeApiUrl地址。
   * @author qinianqing@jiagouyun.com
   */
  function getBaseUrl(apiType?: string) {
    let baseUrl: string = '';
    const apiConfig = Object.assign({}, Config, {});
    const apiKey: string = apiType ? apiType.toLowerCase() + 'apiurl' : 'apiurl';

    for (const key in apiConfig) {
      if (key && apiKey === key.toLowerCase()) {
        baseUrl = apiConfig[key];
        break;
      }
    }
    return baseUrl;
  }

  const htmlResponseType = ['stream', 'text'];

  return new Promise((resolve, reject) => {
    axios(options)
      .then((res: any) => {
        if (options.outLink || htmlResponseType.includes(options.responseType)) {
          resolve(res.data || res.content);
        } else if (res.data && res.data.code === 200) {
          resolve(res.data);
        } else {
          ErrorHandle.showMsg(res.data.code, res.data.message, { type: 'error' });
          reject(res);
        }
      })
      .catch(error => {
        if (!error.__CANCEL__) {
          const errorMsg = {
            code: error.response ? error.response.data.errorCode : error.code,
            message: error.response ? error.response.data.message : error.message,
          };
          const reLoginArr = ['401', 'ft.AuthTokenFailed', 'ft.NotAuth'];
          if (!notShowErrorMsg) {
            ErrorHandle.showMsg(errorMsg.code, errorMsg.message, { type: 'error' });
          }
          if (reLoginArr.includes(`${errorMsg.code}`)) {
            // window.$cookies.remove(Utils.getCookieTokenKey(), undefined, Config.cookieDomain);
            // return RedirectLogin();
          }
          reject(error);
        } else {
          resolve([]);
        }
      });
  });
}
