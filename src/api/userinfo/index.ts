/*
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-29 16:40:26
 * @LastEditTime : 2024-09-05 13:29:42
 * @LastEditors  : jiangronghua
 * @Description  : 用户相关请求
 */
import request from '@/utils/cloudRequest/request';

enum URL {
  login = '/member/login',
  login2 = '/member/login2',
  memberInfo = '/member/info',
  majorCollegeSave = '/member/save-school-major',
  listMajorCollege = '/member/list-school-major',
  activeCode = '/member/list-active-code',
  enableActiveCode = '/member/enable-active-code',
  chartIntention = '/intention-information/chart-intention',
  chartIntentionSchool = '/intention-information/chart-intention-school',
  pageSchool = '/intention-information/page-school',
  intentionInformationListlevel1 = '/intention-information/list-level1',
  intentionInformationListlevel2 = '/intention-information/list-level2',
  intentionInformationListlevel3 = '/intention-information/list-level3',
  intentionInformationSubmit = '/intention-information/submit',
  isEditable = '/intention-information/is-editable',
  getIntenionInfomation = 'intention-information/get-intention-information'
}

export const login = (data: any) => request({ url: URL.login, method: 'POST', data });
export const login2 = (params: any) => request({ url: URL.login2, method: 'GET', params});
export const memberInfo = () => request({ url: URL.memberInfo, method: 'GET'});
export const chartIntention = () => request({ url: URL.chartIntention, method: 'GET', hiddenMsg: true });
export const chartIntentionSchool = () => request({ url: URL.chartIntentionSchool, method: 'GET', hiddenMsg: true });
export const pageSchool = (params: any) => request({ url: URL.pageSchool, method: 'GET', params });
export const intentionInformationListlevel1 = (params: any) => request({ url: URL.intentionInformationListlevel1, method: 'GET', params });
export const intentionInformationListlevel2 = (params: any) => request({ url: URL.intentionInformationListlevel2, method: 'GET', params });
export const intentionInformationListlevel3 = (params: any) => request({ url: URL.intentionInformationListlevel3, method: 'GET', params });
export const intentionInformationSubmit = (data: any) => request({ url: URL.intentionInformationSubmit, method: 'POST', data });
export const majorCollegeSave = (data: any) => request({ url: URL.majorCollegeSave, method: 'POST', data });
export const listMajorCollege = () => request({ url: URL.listMajorCollege, method: 'GET' });
export const activeCode = () => request({ url: URL.activeCode, method: 'GET' });
export const enableActiveCode = (params: any) => request({ url: URL.enableActiveCode, method: 'GET', params });
export const isEditable = () => request({ url: URL.isEditable, method: 'GET', hiddenMsg: true });
export const getIntenionInfomation = () => request({ url: URL.getIntenionInfomation, method: 'GET' });
