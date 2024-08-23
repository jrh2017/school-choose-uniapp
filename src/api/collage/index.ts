/*
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-29 16:40:26
 * @LastEditTime : 2024-08-14 15:02:37
 * @LastEditors  : jiangronghua
 * @Description  : 用户相关请求
 */
import request from '@/utils/cloudRequest/request';

enum URL {
  schoolPage = '/school/page-school',
  provinceList = '/school/list-province',
}

export const schoolPage = (params: any) => request({ url: URL.schoolPage, method: 'GET', params });
export const provinceList = () => request({ url: URL.provinceList, method: 'GET' });
