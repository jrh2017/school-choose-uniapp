/*
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-29 16:40:26
 * @LastEditTime : 2024-08-27 09:38:42
 * @LastEditors  : jiangronghua
 * @Description  : 学校对比模块API
 */
import request from '@/utils/cloudRequest/request';

enum URL {
  listSchoolMajor = '/school-major-compare/list-school-major',
  pageSchoolMajor = '/school-major-compare/page-school-major',
  listProvince = '/school-major-compare/list-province',
  insertSchoolMajor = '/school-major-compare/insert-school-major',
  majorCompare = '/school-major-compare/list-school-major-compare',
}

export const listSchoolMajor = () => request({ url: URL.listSchoolMajor, method: 'GET' });
export const pageSchoolMajor = (params: any) => request({ url: URL.pageSchoolMajor, method: 'GET', params });
export const listProvince = () => request({ url: URL.listProvince, method: 'GET' });
export const insertSchoolMajor = (data: any) => request({ url: URL.insertSchoolMajor, method: 'POST', data });
export const majorCompare = (data: any) => request({ url: URL.majorCompare, method: 'POST', data });
