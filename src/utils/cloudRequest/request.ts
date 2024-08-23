import { getCloudInstance } from './wxCloud';
import { cloudEnvId } from './common';
import { getToken } from '@/utils/auth';

interface RequestDO {
  url: string
  method: string
  params?: any
  data?: any
  headers?: any
  contenType?: string | null
}

function objectToQueryString(obj: any) {
  return Object.keys(obj).map((key) => {
    const value = obj[key];
    if (Array.isArray(value)) {
      return value.map(arrayValue => `${encodeURIComponent(key)}=${encodeURIComponent(arrayValue)}`).join('&');
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }).join('&');
}

function request({ url, method, params, data, headers, contenType }: RequestDO) {
  if (params) {
    url += `?${objectToQueryString(params)}`;
  }
  return new Promise(async (resolve, reject) => {
    // 修改为云托管 wx.cloud.callContainer
    const param = {
      path: url,
      method,
      data,
      header: {
        'X-WX-SERVICE': 'ypd',
        'content-type': contenType || 'application/json',
        'Authorization': getToken() ? getToken() : null,
        ...headers,
      },
      success: (res: any) => {
        const data = res.data;
        console.log(`${url}  success`, res);
        if (data.code === 200) {
          resolve(data.data);
        }
        else if (data.code === 403) {
          uni.showToast({
            title: '登录失效，请重新登录',
            icon: 'none',
          });
          uni.reLaunch({
            url: '/pages/common/login/index',
          });
        }
        else {
          reject(data);
        }
      },
      fail: (err: any) => {
        console.log(`${url} fail`, err);
        reject(err);
      },
    };
    console.log('请求信息', param);
    if (import.meta.env.VITE_IN_HOSTING === 'mp-weixin-cloud') {
      const c1 = await getCloudInstance();
      await c1.init({
        env: cloudEnvId,
      });
      await c1.callContainer(param);
    }
    else {
      params.url = import.meta.env.VUE_APP_API_BASE_URL + url;
      uni.request(param);
    }
  });
}

export default request;
