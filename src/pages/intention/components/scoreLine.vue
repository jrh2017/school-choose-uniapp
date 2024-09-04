<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-08-26 17:40:04
 * @LastEditTime : 2024-09-04 12:44:54
 * @LastEditors  : jiangronghua
 * @Description  : 国家线
-->
<template>
  <div>
    <view class="ranking-table">
      <view class="title">
        复试线
      </view>
      <maskLayer :isShowMask="status !== 2">
        <view class="table">
          <view class="tr">
            <view class="th" style="width: 25%;">
              科目/年份
            </view>
            <view class="th">
              2024
            </view>
            <view class="th">
              2023
            </view>
            <view class="th">
              2022
            </view>
          </view>
          <view v-for="(item, index) in tableSchoolData" :key="index" class="tr" style=""
            :class="{ active: index % 2 === 1 }">
            <view class="td">
              {{ item.name }}
            </view>
            <view class="td">
              {{ item[2024] }}
            </view>
            <view class="td">
              {{ item[2023] }}
            </view>
            <view class="td">
              {{ item[2022] }}
            </view>
          </view>
        </view>
      </maskLayer>
    </view>
    <view class="ranking-table">
      <view class="title">
        国家线
      </view>
      <view class="tips">
        <text>单科=100: 满分为100的科目，即英语和政治</text>
        <text>单科>100: 满分大于100的科目，即专业课一和专业课二</text>
      </view>
      <maskLayer :isShowMask="status !== 2">
        <view class="table">
          <view class="tr">
            <view class="th" style="width: 35%;">
              科目
            </view>
            <view class="th">
              2024
            </view>
            <view class="th">
              2023
            </view>
            <view class="th">
              2022
            </view>
          </view>
          <view v-for="(item, index) in tableCountryData" :key="index" class="tr" style=""
            :class="{ active: index % 2 === 1 }">
            <view class="td">
              {{ item.name }}
            </view>
            <view class="td">
              {{ item[2024] }}
            </view>
            <view class="td">
              {{ item[2023] }}
            </view>
            <view class="td">
              {{ item[2022] }}
            </view>
          </view>
        </view>
      </maskLayer>
    </view>
    <view class="ranking-table">
      <view class="title">
        趋势分析-总成绩
      </view>
      <maskLayer :isShowMask="status !== 2">
        <view class="table">
          <qiun-data-charts :canvas2d="true" type="line" :opts="opts" :chart-data="chartTotalScoreListData" />
        </view>
      </maskLayer>
    </view>
    <view class="ranking-table">
      <view class="title">
        趋势分析-政治
      </view>
      <maskLayer :isShowMask="status !== 2">
        <view class="table">
          <qiun-data-charts :canvas2d="true" type="line" :opts="opts" :chart-data="chartPoliticsScoreListData" />
        </view>
      </maskLayer>
    </view>
    <view class="ranking-table">
      <view class="title">
        趋势分析-外语
      </view>
      <maskLayer :isShowMask="status !== 2">
        <view class="table">
          <qiun-data-charts :canvas2d="true" type="line" :opts="opts" :chart-data="chartEnglishScoreListData" />
        </view>
      </maskLayer>
    </view>
    <view class="ranking-table">
      <view class="title">
        趋势分析-专业课一
      </view>
      <maskLayer :isShowMask="status !== 2">
        <view class="table">
          <qiun-data-charts :canvas2d="true" type="line" :opts="opts" :chart-data="chartSpecialOneScoreListData" />
        </view>
      </maskLayer>
    </view>
    <view class="ranking-table">
      <view class="title">
        趋势分析-专业课二
      </view>
      <maskLayer :isShowMask="status !== 2">
        <view class="table">
          <qiun-data-charts :canvas2d="true" type="line" :opts="opts" :chart-data="chartSpecialTwoScoreListData" />
        </view>
      </maskLayer>
    </view>
  </div>
</template>

<script lang="ts" setup>
import {
  interviewLine,
  nationalLine,
  schoolLineCompore
} from '@/api/collage';
import maskLayer from '@/components/mask-layer/mask-layer.vue'
import { useUserStore } from '@/store';
const userStore = useUserStore();
const { status } = storeToRefs(userStore)
const props = defineProps({
  level3Code: {
    type: String,
    default: '',
  },
  schoolId: {
    type: String,
    default: '',
  },
});

const chartTotalScoreListData = reactive({
  categories: [],
  series: [
    {
      name: '国家线',
      data: []
    },
    {
      name: '院校线',
      data: []
    }
  ],
});

const chartPoliticsScoreListData = reactive({
  categories: [],
  series: [
    {
      name: '国家线',
      data: []
    },
    {
      name: '院校线',
      data: []
    }
  ],
});

const chartEnglishScoreListData = reactive({
  categories: [],
  series: [
    {
      name: '国家线',
      data: []
    },
    {
      name: '院校线',
      data: []
    }
  ],
});

const chartSpecialOneScoreListData = reactive({
  categories: [],
  series: [
    {
      name: '国家线',
      data: []
    },
    {
      name: '院校线',
      data: []
    }
  ],
});

const chartSpecialTwoScoreListData = reactive({
  categories: [],
  series: [
    {
      name: '国家线',
      data: []
    },
    {
      name: '院校线',
      data: []
    }
  ],
});

const opts = reactive({
  color: ["#E94650", "#4D59FF"],
  padding: [15, 20, 0, 0],
  enableScroll: false,
  legend: {},
  xAxis: {
    disableGrid: true
  },
  yAxis: {
    gridType: "dash",
    dashLength: 2,
    data: [{
      axisLine: false,
      tofix: 0
    }]
  },
  extra: {
    line: {
      type: "curve",
      width: 2,
      activeType: "hollow"
    }
  }
});

const tableCountryData = ref([]);
const tableSchoolData = ref([]);

// 复试线,国家线
const getCurveFn = () => {
  interviewLine({
    level3Code: props.level3Code,
    schoolId: props.schoolId,
  }).then((res: any) => { // 复试线
    const list: any = [{ name: '初试总成绩' }, { name: '政治' }, { name: '英语' }, { name: '专业课一' }, { name: '专业课二' }];
    res?.forEach((item: any) => {
      list[0][item.year] = item.total;
      list[1][item.year] = item.politics;
      list[2][item.year] = item.english;
      list[3][item.year] = item.specialOne;
      list[4][item.year] = item.specialTwo;
    });
    tableSchoolData.value = list;
  });
  nationalLine({
    level3Code: props.level3Code,
    schoolId: props.schoolId,
  }).then((res: any) => { // 国家线
    const list: any = [{ name: '初试总成绩' }, { name: '单科=100' }, { name: '单科>100' }];
    res?.forEach((item: any) => {
      list[0][item.year] = item.scoreTotal;
      list[1][item.year] = item.scoreSingle1;
      list[2][item.year] = item.scoreSingle2;
    });
    tableCountryData.value = list;
  });
};

const getSchoolLineFn = () => {
  // 总成绩
  chartTotalScoreListData.categories = []
  chartTotalScoreListData.series[0].data = []
  chartTotalScoreListData.series[1].data = []
  // 政治
  chartPoliticsScoreListData.categories = []
  chartPoliticsScoreListData.series[0].data = []
  chartPoliticsScoreListData.series[1].data = []
  // 英语
  chartEnglishScoreListData.categories = []
  chartEnglishScoreListData.series[0].data = []
  chartEnglishScoreListData.series[1].data = []
  // 专业课一
  chartSpecialOneScoreListData.categories = []
  chartSpecialOneScoreListData.series[0].data = []
  chartSpecialOneScoreListData.series[1].data = []
  // 专业课二
  chartSpecialTwoScoreListData.categories = []
  chartSpecialTwoScoreListData.series[0].data = []
  chartSpecialTwoScoreListData.series[1].data = []

  schoolLineCompore({
    level3Code: props.level3Code,
    schoolId: props.schoolId
  }).then((res: any) => { // 学校排名
    const totalScoreListData = res.totalScoreList.reverse()
    totalScoreListData?.forEach((item: any) => {
      chartTotalScoreListData.categories.push(item.year)
      chartTotalScoreListData.series[0].data.push(item.country)
      chartTotalScoreListData.series[1].data.push(item.school)
    })

    const politicsScoreListData = res.politicsScoreList.reverse()
    politicsScoreListData?.forEach((item: any) => {
      chartPoliticsScoreListData.categories.push(item.year)
      chartPoliticsScoreListData.series[0].data.push(item.country)
      chartPoliticsScoreListData.series[1].data.push(item.school)
    })

    const englishScoreListData = res.englishScoreList.reverse()
    englishScoreListData?.forEach((item: any) => {
      chartEnglishScoreListData.categories.push(item.year)
      chartEnglishScoreListData.series[0].data.push(item.country)
      chartEnglishScoreListData.series[1].data.push(item.school)
    })

    const specialOneScoreListData = res.specialOneScoreList.reverse()
    specialOneScoreListData?.forEach((item: any) => {
      chartSpecialOneScoreListData.categories.push(item.year)
      chartSpecialOneScoreListData.series[0].data.push(item.country)
      chartSpecialOneScoreListData.series[1].data.push(item.school)
    })

    const specialTwoScoreListData = res.specialTwoScoreList.reverse()
    specialTwoScoreListData?.forEach((item: any) => {
      chartSpecialTwoScoreListData.categories.push(item.year)
      chartSpecialTwoScoreListData.series[0].data.push(item.country)
      chartSpecialTwoScoreListData.series[1].data.push(item.school)
    })
  });
};


onMounted(() => {
  getCurveFn();
  getSchoolLineFn();
});
</script>

<style lang="scss" scoped>
.ranking-table {
  margin-bottom: 16rpx;

  .title {
    font-weight: 500;
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.85);
    line-height: 48rpx;
    margin-bottom: 16rpx;
  }

  .tips {
    background: #F2F2F7;
    border-radius: 16rpx;
    padding: 16rpx 24rpx;
    display: flex;
    flex-direction: column;
    font-size: 24rpx;
    color: rgba(0, 0, 0, 0.65);
    line-height: 40rpx;
    margin-bottom: 16rpx;
  }
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
