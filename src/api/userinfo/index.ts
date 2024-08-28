/*
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-29 16:40:26
 * @LastEditTime : 2024-08-28 16:58:38
 * @LastEditors  : jiangronghua
 * @Description  : 用户相关请求
 */
import request from '@/utils/cloudRequest/request';

enum URL {
  login = '/member/login',
  majorCollegeSave = '/member/save-school-major',
  listMajorCollege = '/member/list-school-major',
  chartIntention = '/intention-information/chart-intention',
  pageSchool = '/intention-information/page-school',
  intentionInformationListlevel1 = '/intention-information/list-level1',
  intentionInformationListlevel2 = '/intention-information/list-level2',
  intentionInformationListlevel3 = '/intention-information/list-level3',
  intentionInformationSubmit = '/intention-information/submit',
}

export const login = (data: any) => request({ url: URL.login, method: 'POST', data });
export const chartIntention = () => request({ url: URL.chartIntention, method: 'GET' });
export const pageSchool = (params: any) => request({ url: URL.pageSchool, method: 'GET', params });
export const intentionInformationListlevel1 = (params: any) => request({ url: URL.intentionInformationListlevel1, method: 'GET', params });
export const intentionInformationListlevel2 = (params: any) => request({ url: URL.intentionInformationListlevel2, method: 'GET', params });
export const intentionInformationListlevel3 = (params: any) => request({ url: URL.intentionInformationListlevel3, method: 'GET', params });
export const intentionInformationSubmit = (data: any) => request({ url: URL.intentionInformationSubmit, method: 'POST', data });
export const majorCollegeSave = (data: any) => request({ url: URL.majorCollegeSave, method: 'POST', data });
export const listMajorCollege = () => request({ url: URL.listMajorCollege, method: 'GET' });
