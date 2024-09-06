<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-08-30 17:24:35
 * @LastEditTime : 2024-09-06 17:53:01
 * @LastEditors  : chenyuchao
 * @Description  :
-->
<template>
  <view class="container">
    <up-navbar :placeholder="true" bg-color="#D8575D" title="报告详情" autoBack />
    <view class="report-detail">
      <view class="report-header">
        <view class="row-1 blod-box">
          <view>个人择校报告</view>
          <view>AI大数据</view>
        </view>
        <view class="row-1">
          <up-icon name="calendar" :color="'#FFFFFF'" size="28"></up-icon>
          <view class="time">{{ targetVolunteer.createTime }}</view>
        </view>
      </view>
      <view class="report-module radius-20">
        <view class="module-title">一、目标志愿</view>
        <view class="module-content">
          <view class="module-row">
            <view class="row-label">意向专业：</view>
            <view class="row-value">{{ targetVolunteer.level3Name }}({{ targetVolunteer.level3Code }})</view>
          </view>
          <view class="module-row">
            <view class="row-label">预估分数：</view>
            <view class="row-value">{{ targetVolunteer.assessScore }}分</view>
          </view>
          <view class="module-row">
            <view class="row-label">学习方式：</view>
            <view class="row-value">
              <text v-if="targetVolunteer.recruitType === '0'">不限</text>
              <text v-if="targetVolunteer.recruitType === '1'">全日制</text>
              <text v-if="targetVolunteer.recruitType === '2'">非全日制</text>
            </view>
          </view>
          <view class="module-row">
            <view class="row-label">院校水平：</view>
            <view class="row-value">{{ targetVolunteer.levelName }}</view>
          </view>
          <view class="module-row">
            <view class="row-label">报考省份：</view>
            <view class="row-value">{{ targetVolunteer.provinces }}</view>
          </view>
        </view>
      </view>
      <view class="report-content">
        <view class="report-module mg-24">
          <view class="module-title">二、推荐考研院校</view>
          <view class="module-content-2">
            <view class="top-row">
              <view class="flex-left">
                <up-icon name="thumb-up-fill" :color="'#E94650'" :size="16"></up-icon>
              </view>
              <view class="flex-right">
                <view class="right-row">
                  <text class="top-row-label">保底院校：</text>
                  <text class="top-row-value">难度一般，只要不放弃学习能够上岸的目标院校，成功率在80%以上！</text>
                </view>
                <view class="right-row">
                  <text class="top-row-label">稳妥院校：</text>
                  <text class="top-row-value">难度适中，跳—跳能够上岸的目标院校，成功率在70%以上！</text>
                </view>
                <view class="right-row">
                  <text class="top-row-label">冲刺院校：</text>
                  <text class="top-row-value">难度较大，蹦起来才上岸的目标院校，成功率在50%左右！</text>
                </view>
              </view>
            </view>
            <view class="module-2-list">
              <view class="module-2-item" v-for="(item, index) in schoolList" :key="index">
                <image class="bg-img"
                  :src="item.selectType === 1 ? minimumGuarantee : item.selectType === 2 ? safe : sprint"
                  mode="scaleToFill" />
                <view class="item-left">
                  <view class="item-index">{{ index + 1 }}</view>
                  <view class="">
                    <image class="item-img" :src="`https://ypdsc.oss-cn-shanghai.aliyuncs.com/app/${item.schoolId}.jpg`"
                      mode="scaleToFill" />
                  </view>
                  <view class="item-title-box">
                    <view class="ellipsis-text">{{ item.schoolName }}</view>
                    <view class="title-desc ellipsis-text">{{ item.lelvel3Name }} ({{ item.level3Code }})</view>
                  </view>
                </view>
                <view class="item-right">
                  <up-image class="edit-icon" :src="item.collected ? star : unstar" width="40rpx" height="40rpx"
                    @click="changeCollecte(item)" />
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="report-module">
          <view class="module-title">三、推荐考研院校分析</view>
          <view class="module-content-3">
            <view class="school-item" v-for="(item, index) in graduateSchoolsList" :key="index">
              <view class="school-item-name">
                <view class="school-name">{{ index + 1 }}、{{ item.school.schoolName }}</view>
                <view class="school-name-desc">{{ item.selectType === 1 ? '保底院校' : item.selectType === 2 ? '稳妥学校' :
                  '冲刺学校' }}</view>
              </view>
              <view class="school-module">
                <view class="school-module-title">(1) 院校专业基础信息</view>
                <view class="green-box" v-for="(college, index2) in item.enrollPlanList" :key="index2">
                  <view class="college-name">{{ college.collegeName }}</view>
                  <view class="college-introduce">
                    <view class="introduce-row">
                      <view class="introduce-label">学习方式：</view>
                      <view class="introduce-value">
                        <view class="introduce-value-item">{{ college.recruitTypeName }}</view>
                      </view>
                    </view>
                    <view class="introduce-row">
                      <view class="introduce-label">考试科目：</view>
                      <view class="introduce-value">
                        <rich-text :nodes="college.examSubject" />
                      </view>
                    </view>
                    <view class="introduce-row">
                      <view class="introduce-label">参考书目：</view>
                      <view class="introduce-value">
                        <rich-text :nodes="college.examBook" />
                        <!-- <view class="introduce-value-item">(101)思想政治理论</view>
                        <view class="introduce-value-item">(201)英语 (一)</view>
                        <view class="introduce-value-item">(398)法律硕士专业基础 (非法学)</view>
                        <view class="introduce-value-item">(498)法律硕士综合 (非法学)</view> -->
                      </view>
                    </view>
                  </view>
                </view>
              </view>
              <view class="school-module">
                <view class="school-module-title">(2) 国家线</view>
                <view class="table">
                  <view class="tr">
                    <view class="th" style="width: 35%;">
                      年份
                    </view>
                    <view class="th">
                      初试总成绩
                    </view>
                    <view class="th">
                      单科=100
                    </view>
                    <view class="th">
                      单科>100
                    </view>
                  </view>
                  <view v-for="(countryItem, index3) in item.scoreLineCountryList" :key="index3" class="tr" style=""
                    :class="{ active: index3 % 2 === 1 }">
                    <view class="td">
                      {{ countryItem.year }}
                    </view>
                    <view class="td">
                      {{ countryItem.scoreTotal }}
                    </view>
                    <view class="td">
                      {{ countryItem.scoreSingle1 }}
                    </view>
                    <view class="td">
                      {{ countryItem.scoreSingle2 }}
                    </view>
                  </view>
                </view>
              </view>
              <view class="school-module">
                <view class="school-module-title">(3) 复试线</view>
                <view class="table">
                  <view class="tr">
                    <view class="th" style="width: 35%;">
                      科目/年份
                    </view>
                    <view class="th" v-for="(year, yearIndex) in item.interviewLineYear" :key="yearIndex">
                      {{ year }}
                    </view>
                  </view>
                  <view v-for="(schoolItem, index3) in item.interviewLine" :key="index3" class="tr" style=""
                    :class="{ active: index3 % 2 === 1 }">
                    <view class="td">
                      {{ schoolItem.name }}
                    </view>
                    <view class="td" v-for="(year, yearIndex) in item.interviewLineYear" :key="yearIndex">
                      {{ schoolItem[year] }}
                    </view>
                  </view>
                </view>
              </view>
              <view class="school-module">
                <view class="school-module-title">(4) 一志愿录取信息</view>
                <view class="table">
                  <view class="tr">
                    <view class="th" style="width: 35%;">年份</view>
                    <view class="th" v-for="(year, yearIndex) in item.scoreStatisTh" :key="yearIndex">
                      {{ year }}
                    </view>
                  </view>
                  <view v-for="(scoreStatisItem, scoreStatisIndex) in item.scoreList" :key="scoreStatisIndex" class="tr"
                    style="" :class="{ active: scoreStatisIndex % 2 === 1 }">
                    <view class="td">
                      {{ scoreStatisItem.name }}
                    </view>
                    <view class="td" v-for="(year, yearIndex) in item.scoreStatisTh" :key="yearIndex">
                      {{ scoreStatisItem[year] }}
                    </view>
                  </view>
                </view>
              </view>
              <view class="school-module">
                <view class="school-module-title">(5) 拟录取考试名单</view>
                <view class="year-item" v-for="(admissionItem, admissionIndex) in item.admissionInformation"
                  :key="admissionIndex">
                  <view class="year-desc">{{ admissionItem[0].year }}年（共{{ item.admissionInformation.length }}人）</view>
                  <view class="table">
                    <view class="tr">
                      <view class="th" style="width: 35%;">
                        一志愿院校
                      </view>
                      <view class="th">
                        初试分数
                      </view>
                      <view class="th">
                        复试分数
                      </view>
                    </view>
                    <view v-for="(people, peopleIndex) in admissionItem" :key="peopleIndex" class="tr" style=""
                      :class="{ active: index % 2 === 1 }">
                      <view class="td">
                        {{ people.schoolName }}
                      </view>
                      <view class="td">
                        {{ people.firstScore }}
                      </view>
                      <view class="td">
                        {{ people.retrialScore }}
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { useShare } from '@/hooks';
import { reportDetail } from '@/api/choice';
import { majorCollegeSave } from '@/api/userinfo';
import {
  enrollPlan,
  interviewLine,
  nationalLine,
  schoolScoreStatis,
  matriculationRecord,
  schoolReportAnalytics
} from '@/api/collage';
interface volunteer {
  level3Name: string,
  level3Code: string,
  assessScore: any,
  id: number,
  createTime: string,
  recruitType: string, // 1全日制 2非全日制
  recruitName: string,
  schoolLevel: string, // 院校水平0：不限1：985 2：211 3：双一流 4：普通院校
  levelName: string, // 院校水平展示
  provinces: string, // 报考省份
}
interface schoolItem {
  selectType: number, // 1保底 2稳妥 3冲刺
  id: number,
  schoolName: string,
  schoolId: number,
  level3Code: string,
  lelvel3Name: string,
  collected: number, // 1收藏 2取消收藏
  enrollPlan: any, // 院校专业基础信息
}
interface courtyardItem {
  schoolName: string,
  selectType: number,
  enrollPlanList: any,
  scoreLineCountryList: any,
  scoreLineSchoolList: any,
  scoreStatisTh: any,
  scoreList: any,
  admissionInformation: any,
  school: any,
  interviewLineYear: any,
  interviewLine: any
}
const reportId = ref('');
const star = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/star.png');
const unstar = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/unstar.png');
const minimumGuarantee = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/minimum-guarantee.png'); // 保底
const safe = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/safe.png'); // 保底
const sprint = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/sprint.png'); // 冲刺
const schoolList = ref<Array<schoolItem>>([]);
const tableCountryData = ref([{}, {}, {}, {}, {}])
const targetVolunteer = ref<volunteer>({
  level3Name: '',
  level3Code: '',
  assessScore: '',
  id: 0,
  createTime: '',
  recruitName: '',
  recruitType: '', // 1全日制 2非全日制
  schoolLevel: '', // 院校水平0：不限1：985 2：211 3：双一流 4：普通院校
  levelName: '', // 院校水平展示
  provinces: '', // 报考省份
}) // 目标志愿
const levelList = ref([
  {
    type: '0',
    name: '不限'
  },
  {
    type: '1',
    name: '985'
  },
  {
    type: '2',
    name: '211'
  },
  {
    type: '3',
    name: '双一流'
  },
  {
    type: '4',
    name: '普通院校'
  }
])
const graduateSchoolsList = ref<Array<courtyardItem>>([]) // 推荐考研院校
// 查询择校详情
const getReoprtDetail = async () => {
  const res: any = await reportDetail({ id: reportId.value });
  console.log(res, '查询报告详情');
  let arry = []
  if (res.recruitType.includes('1')) {
    arry.push('全日制')
  }
  if (res.recruitType.includes('1')) {
    arry.push('全日制')
  }
  if (res.recruitType.includes('2')) {
    arry.push('非全日制')
  }
  let arry2: any = []
  levelList.value.forEach((item: any) => {
    if (res.schoolLevel.includes(item.type)) {
      arry2.push(item.name)
    }
  })
  let obj = {
    level3Name: res.level3Name,
    level3Code: res.level3Code,
    assessScore: res.assessScore,
    id: res.id,
    createTime: res.createTime,
    recruitType: res.recruitType, // 1全日制 2非全日制
    schoolLevel: res.schoolLevel, // 院校水平0：不限1：985 2：211 3：双一流 4：普通院校
    provinces: res.provinces, // 报考省份
    recruitName: arry.join('、'), // 院校类型
    levelName: arry2.join('、')
  }
  targetVolunteer.value = obj;
  schoolList.value = res.schoolList;
}
/**
 * 切换收藏状态
 */
const changeCollecte = (school: any) => {
  const action = school.collected === 1 ? 2 : 1;
  const params = {
    action,
    schoolId: school.schoolId,
    level3Code: school.level3Code,
  };
  majorCollegeSave(params).then(() => {
    school.collected = action;
  });
};
// 推荐考研院校分析
const schoolReportAnalyticsFn = () => {
  schoolReportAnalytics({
    id: reportId.value
  }).then((data: any) => {
    let arr = data || []
    arr.forEach((item: any) => {
      let scoreList = item.scoreList || [] // 一志愿录取信息
      let list: any = [{ name: '一志愿拟录取人数' }, { name: '录取最高分' }, { name: '录取中位分' }, { name: '录取最低分' }, { name: '录取建议分' }];
      let scoreStatisTh: any = [] // 年份集合
      scoreList.forEach((item2: any) => {
        scoreStatisTh.push(item2.year)
        list[0][item2.year] = item2.people
        list[1][item2.year] = item2.maxScore
        list[2][item2.year] = item2.middleScore
        list[3][item2.year] = item2.minScore
        list[4][item2.year] = item2.adviceScore
      })
      item.scoreStatisTh = scoreStatisTh
      item.scoreList = list
      // 拟录取名单处理
      let matriculationRecordList = item.matriculationRecordList || []
      let admissionInformation: any = [] // 拟录取考试名单分年
      let yearList: any = [] // 年份集合
      matriculationRecordList.forEach((item2: any) => {
        yearList.push(item2.year)
      })
      yearList = Array.from(new Set(yearList)); // 去重后的年份集合
      yearList.forEach((year: any, index: number) => {
        admissionInformation.push([])
        matriculationRecordList.forEach((item2: any) => {
          if (item2.year === year) {
            admissionInformation[index].push(item2)
          }
        })
      })
      item.admissionInformation = admissionInformation
      // 复试线处理
      let list2: any = [{ name: '初始总成绩' }, { name: '政治' }, { name: '外语' }, { name: '专业课一' }, { name: '专业课二' }];
      let interviewLine = item.scoreLineSchoolList || []
      let interviewLineYear: any = []
      interviewLine.forEach((item2: any) => {
        interviewLineYear.push(item2.year)
        list2[0][item2.year] = item2.total
        list2[1][item2.year] = item2.politics
        list2[2][item2.year] = item2.english
        list2[3][item2.year] = item2.specialOne
        list2[4][item2.year] = item2.specialTwo
      })
      item.interviewLine = list2
      item.interviewLineYear = interviewLineYear
    })
    graduateSchoolsList.value = arr || []
    console.log(arr, '推荐考研院校分析')
  })
}
// 学校专业基本信息
const getCurveFn = (schoolId: any, level3Code: any) => {
  enrollPlan({
    level3Code: level3Code,
    schoolId: schoolId,
  }).then((res: any) => {
    console.log(res, '学校专业基本信息');
    schoolList.value.forEach((item: any) => {
      if (item.schoolId === schoolId && item.level3Code === level3Code) {
        item.enrollPlan = res || []
      }
    })
    // const { collegeId, recruitType } = res
    // getMatriculationRecordFn(schoolId, level3Code, collegeId, recruitType)
  });
  interviewLine({ // 复试线
    level3Code: level3Code,
    schoolId: schoolId,
  }).then((res: any) => { // 复试线
    const list: any = [{ name: '初试总成绩' }, { name: '政治' }, { name: '英语' }, { name: '专业课一' }, { name: '专业课二' }];
    res?.forEach((item: any) => {
      list[0][item.year] = item.total;
      list[1][item.year] = item.politics;
      list[2][item.year] = item.english;
      list[3][item.year] = item.specialOne;
      list[4][item.year] = item.specialTwo;
    });
    schoolList.value.forEach((item: any) => {
      if (item.schoolId === schoolId && item.level3Code === level3Code) {
        item.tableSchoolData = list
      }
    })
  });
  nationalLine({ // 国家线
    level3Code: level3Code,
  }).then((res: any) => { // 国家线
    const list: any = [{ name: '初试总成绩(A区)' }, { name: '初试总成绩(B区)' }, { name: '单科=100(A区)' }, { name: '单科=100(B区)' }, { name: '单科>100(A区)' }, { name: '单科>100(B区)' }];
    res?.forEach((item: any) => {
      list[0][item.year] = item.scoreTotalA;
      list[1][item.year] = item.scoreTotalB;
      list[2][item.year] = item.scoreSingle1A;
      list[3][item.year] = item.scoreSingle1B;
      list[4][item.year] = item.scoreSingle2A;
      list[5][item.year] = item.scoreSingle2B;
    });
    schoolList.value.forEach((item: any) => {
      if (item.schoolId === schoolId && item.level3Code === level3Code) {
        item.tableCountryData = list
      }
    })
  });
  schoolScoreStatis({ // (4) 一志愿录取信息
    level3Code: level3Code,
    schoolId: schoolId,
  }).then((res: any) => {
    console.log(res, '学校学生成绩统计');
    const list: any = [{ name: '一志愿拟录取人数' }, { name: '录取最高分' }, { name: '录取中位分' }, { name: '录取最低分' }, { name: '录取建议分' }];
    let scoreStatisTh: any = []
    if (res && res.length) {
      res.forEach((item: any) => {
        scoreStatisTh.push(item.year)
        list[0][item.year] = item.people
        list[1][item.year] = item.maxScore
        list[2][item.year] = item.middleScore
        list[3][item.year] = item.minScore
        list[4][item.year] = item.adviceScore
      })
    }
    schoolList.value.forEach((item: any) => {
      if (item.schoolId === schoolId && item.level3Code === level3Code) {
        item.scoreStatisTh = scoreStatisTh
        item.scoreStatisList = list
      }
    })
  });
};
// (5) 拟录取考试名单
const getMatriculationRecordFn = (schoolId: any, level3Code: any, collegeId: any, recruitType: any) => {
  matriculationRecord({
    level3Code: level3Code,
    schoolId: schoolId,
    collegeId: collegeId,
    recruitType: recruitType,
  }).then((res: any) => {
    console.log(res, '(5) 拟录取考试名单');
  });
};
onShareAppMessage(() => {
  return {
    title: '个人择校报告',
    path: `/pages/user/report/detail?id=${reportId.value}`,
    imageUrl: '',
  };
});
onLoad((options: any) => {
  reportId.value = options!.id;
  getReoprtDetail();
  schoolReportAnalyticsFn()
  // useShare({
  //   title: '个人择校报告',
  //   path: `/pages/user/report/detail?id=${reportId.value}`,
  //   query: `id=${reportId.value}`,
  //   imageUrl: '',
  // }).onShareAppMessage()
})
</script>
<style scoped lang="scss">
.report-detail {
  position: relative;
  padding-top: 138rpx;

  .report-header {
    height: 330rpx;
    background: linear-gradient(180deg, #D8575D 0%, rgba(239, 68, 119, 0.1) 100%);
    padding: 0 32rpx;
    color: #FFFFFF;
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.85);
    line-height: 44rpx;
    width: 100%;
    position: absolute;
    left: 0;
    top: -1rpx;
    z-index: -1;
    box-sizing: border-box;

    .blod-box {
      font-weight: 600;
      font-size: 44rpx;
      line-height: 52rpx;
      margin-bottom: 16rpx;
    }

    .row-1 {
      display: flex;
      align-items: center;

      .time {
        margin-left: 10rpx;
      }
    }
  }

  .report-content {
    background-color: #F8F0F3;
    padding-top: 24rpx;
  }

  .radius-20 {
    border-radius: 20rpx;
    overflow: hidden;
  }

  .report-module {
    padding: 32rpx;
    background-color: #fff;

    .module-title {
      font-weight: 500;
      font-size: 32rpx;
      color: #000000;
      line-height: 48rpx;
      margin-bottom: 16rpx;
    }

    .module-content {
      background: rgba(246, 245, 248, 0.65);
      border-radius: 8rpx 8rpx 8rpx 8rpx;
      overflow: hidden;
      padding: 16rpx 24rpx;

      .module-row {
        display: flex;
        margin-bottom: 16rpx;
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.85);
        line-height: 36rpx;

        .row-label {
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }
  }

  .module-content-2 {
    .top-row {
      padding: 16rpx 24rpx;
      display: flex;
      font-size: 24rpx;
      color: rgba(0, 0, 0, 0.85);
      line-height: 40rpx;
      background: #FFECEB;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      overflow: hidden;
      margin-bottom: 16rpx;

      .flex-left {
        margin-right: 16rpx;
      }

      .top-row-label {
        font-weight: 600;
        flex: 0 0 116rpx;
      }

      .flex-right {
        .right-row {}
      }
    }
  }

  .module-2-list {
    .module-2-item {
      display: flex;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: rgba(246, 245, 248, 0.65);
      overflow: hidden;
      justify-content: space-between;
      padding: 24rpx 32rpx;
      position: relative;
      margin-bottom: 16rpx;

      .bg-img {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 102rpx;
        height: 80rpx;
      }

      .item-left {
        display: flex;
        align-items: center;

        .item-index {
          margin-right: 24rpx;
          font-weight: 500;
          font-size: 32rpx;
          color: #000000;
        }

        .item-img {
          width: 96rpx;
          height: 96rpx;
          margin-right: 24rpx;
        }

        .item-title-box {
          font-weight: 500;
          font-size: 32rpx;
          color: #000000;
          line-height: 48rpx;

          .title-desc {
            font-size: 24rpx;
            color: rgba(0, 0, 0, 0.85);
            line-height: 36rpx;
            margin-top: 12rpx;
            font-weight: 400;
          }

          .ellipsis-text {
            width: 400rpx;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }

  .module-content-3 {
    .school-item {
      margin-bottom: 32rpx;

      .school-item-name {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24rpx;

        .school-name {
          font-weight: 600;
          font-size: 32rpx;
          color: rgba(0, 0, 0, 0.85);
          line-height: 48rpx;
        }

        .school-name-desc {
          font-weight: 400;
          font-size: 32rpx;
          color: rgba(0, 0, 0, 0.45);
          line-height: 48rpx;
        }
      }

      .school-module {
        margin-bottom: 24rpx;

        .school-module-title {
          font-size: 32rpx;
          color: rgba(0, 0, 0, 0.65);
          line-height: 48rpx;
          margin-bottom: 16rpx;
        }

        .green-box {
          background: rgba(246, 245, 248, 0.65);
          border-radius: 8rpx 8rpx 8rpx 8rpx;
          overflow: hidden;
          padding: 16rpx 24rpx;
          margin-bottom: 16rpx;

          .college-name {
            font-weight: 600;
            font-size: 24rpx;
            color: rgba(0, 0, 0, 0.85);
            line-height: 36rpx;
            margin-bottom: 16rpx;
          }

          .college-introduce {
            .introduce-row {
              display: flex;
              font-weight: 400;
              font-size: 24rpx;
              line-height: 36rpx;
              margin-bottom: 16rpx;

              .introduce-label {
                color: rgba(0, 0, 0, 0.45);
                flex: 0 0 120rpx;
              }

              .introduce-value {
                color: rgba(0, 0, 0, 0.85);
              }
            }
          }
        }

        .year-item {
          margin-bottom: 24rpx;
        }

        .year-desc {
          font-size: 24rpx;
          color: rgba(0, 0, 0, 0.45);
          line-height: 36rpx;
          margin-bottom: 16rpx;
        }
      }
    }
  }
}

.mg-24 {
  margin-bottom: 24rpx;
}

.table {
  width: 100%;
  border-radius: 8rpx;
  display: table;
  border-collapse: collapse;
  font-size: 24rpx;

  .active {
    background: #F9F9FA;
  }

  .th {
    text-align: center;
    color: #828282;
    padding: 20rpx 0;
    font-weight: bolder;
    display: table-cell;
    background: #F9F9FA;
  }

  .td {
    text-align: center;
    padding: 20rpx 0;
    display: table-cell;
    border-bottom: 1px solid #EFEFEF;
  }

  .tr {
    display: table-row;
  }
}
</style>
