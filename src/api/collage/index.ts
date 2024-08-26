/*
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-29 16:40:26
 * @LastEditTime : 2024-08-26 16:47:02
 * @LastEditors  : jiangronghua
 * @Description  : 用户相关请求
 */
import request from '@/utils/cloudRequest/request';

enum URL {
  schoolPage = '/school/page-school',
  provinceList = '/school/list-province',
  majorLeve1List = '/major-level3/list-level1',
  majorLeve2List = '/major-level3/list-level2',
  majorLeve3List = '/major-level3/list-level3',
  majorSchoolList = '/major-level3/page-school',
  intentionSchool = '/intention-information/page-school', // 意向学校详情
  intentionRanking = '/intention-information/list-intention-ranking', // 意向专业/意向院校排名
  level1List = '/school/list-level1', // 查询学校专业列表-1级
  level2List = '/school/list-level2', // 查询学校专业列表-2级
  level3List = '/school/list-level3', // 查询学校专业列表-3级
  schoolMajorDetail = '/school-major/get-school-major', // 查询院校专业详情
  schoolScoreStatis = '/school-major/list-school-score-statis', // 一志愿录取信息 / 成绩统计
  matriculationRecord = '/school-major/list-matriculation-record', // 一志愿录取名单
  interviewLine = '/school-major/list-score-line-school', // 复试线
  nationalLine = '/school-major/list-score-line-country', // 国家线
}

export const schoolPage = (params: any) => request({ url: URL.schoolPage, method: 'GET', params });
export const majorSchoolList = (params: any) => request({ url: URL.majorSchoolList, method: 'GET', params });
export const provinceList = () => request({ url: URL.provinceList, method: 'GET' });
export const majorLeve1List = (params: any) => request({ url: URL.majorLeve1List, method: 'GET', params });
export const majorLeve2List = (params: any) => request({ url: URL.majorLeve2List, method: 'GET', params });
export const majorLeve3List = (params: any) => request({ url: URL.majorLeve3List, method: 'GET', params });
export const intentionSchool = (params: any) => request({ url: URL.intentionSchool, method: 'GET', params });
export const intentionRanking = (params: any) => request({ url: URL.intentionRanking, method: 'GET', params });
export const level1List = (params: any) => request({ url: URL.level1List, method: 'GET', params });
export const level2List = (params: any) => request({ url: URL.level2List, method: 'GET', params });
export const level3List = (params: any) => request({ url: URL.level3List, method: 'GET', params });
export const schoolMajorDetail = (params: any) => request({ url: URL.schoolMajorDetail, method: 'GET', params });
export const schoolScoreStatis = (params: any) => request({ url: URL.schoolScoreStatis, method: 'GET', params });
export const matriculationRecord = (params: any) => request({ url: URL.matriculationRecord, method: 'GET', params });
export const interviewLine = (params: any) => request({ url: URL.interviewLine, method: 'GET', params });
export const nationalLine = (params: any) => request({ url: URL.nationalLine, method: 'GET', params });
