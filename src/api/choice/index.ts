/*
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-08-27 08:34:04
 * @LastEditTime : 2024-08-27 08:36:30
 * @LastEditors  : jiangronghua
 * @Description  : 择校相关api
 */
import request from '@/utils/cloudRequest/request';

enum URL {
  reportListLevel1 = '/select-school-report/list-level1',
  reportListLevel2 = '/select-school-report/list-level2',
  reportListLevel3 = '/select-school-report/list-level3',
}

export const reportListLevel1 = (params: any) => request({ url: URL.reportListLevel1, method: 'GET', params });
export const reportListLevel2 = (params: any) => request({ url: URL.reportListLevel2, method: 'GET', params });
export const reportListLevel3 = (params: any) => request({ url: URL.reportListLevel3, method: 'GET', params });
