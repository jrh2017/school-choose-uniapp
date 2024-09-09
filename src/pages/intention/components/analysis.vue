<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 22:10:53
 * @LastEditTime : 2024-09-07 14:50:40
 * @LastEditors  : jiangronghua
 * @Description  : 拟录取分析组件
-->
<template>
  <view class="analysis">
    <view class="analysis-select">
      <view class="analysis-select-item-left">
        <view v-for="(item, index) in itemList" :key="index" class="item" :class="{ active: currentIndex === index }"
          @click="recruitTypeChange(index)">
          {{ item.name }}
        </view>
      </view>
      <view class="analysis-select-item-right" @click="collegeShow = true">
        <text>{{ collegeItem.collegeName }}</text>
        <up-icon name="arrow-down" />
      </view>
    </view>
    <view class="analysis-detail">
      <view class="title">
        一志愿拟录取与分数分布
      </view>
      <maskLayer :isShowMask="status !== 1">
        <view class="chart">
          <qiun-data-charts :canvas2d="true" type="column" :opts="opts" :chart-data="chart" />
        </view>
        <view class="ranking-table">
          <view class="table">
            <view class="tr">
              <view class="th">
                年份
              </view>
              <view class="th">
                2024(人)
              </view>
              <view class="th">
                2023(人)
              </view>
              <view class="th">
                2022(人)
              </view>
            </view>
            <view v-for="(item, index) in tableData" :key="index" class="tr" style=""
              :class="{ active: index % 2 === 1 }">
              <view class="td">
                {{ item['segment'] }}
              </view>
              <view class="td">
                {{ item['2024'] || '-' }}
              </view>
              <view class="td">
                {{ item['2023'] || '-' }}
              </view>
              <view class="td">
                {{ item['2022'] || '-' }}
              </view>
            </view>
          </view>
        </view>
      </maskLayer>
      <view class="title">
        一志愿拟录取名单
      </view>
      <maskLayer :isShowMask="status !== 1">
        <view v-if="tableYearList.length" class="table-header">
          <view class="item-wrapper">
            <view v-for="(item, index) in tableYearList" :key="index" class="item"
              :class="{ active: currentYearIndex === item }" @click="changeYear(item)">
              {{ item }}
            </view>
          </view>
          <view class="num-wrapper">
            总录取人数:<text class="num">
              {{ tableData2.length }}人
            </text>
          </view>
        </view>
        <view v-if="tableData2.length" class="ranking-table">
          <view class="table">
            <view class="tr">
              <view class="th">
                序号
              </view>
              <view class="th">
                学院
              </view>
              <view class="th">
                初试成绩
              </view>
              <view class="th">
                复试成绩
              </view>
            </view>
            <view v-for="(item, index) in tableData2" :key="index" class="tr" style=""
              :class="{ active: index % 2 === 1 }">
              <view class="td">
                {{ index + 1 }}
              </view>
              <view class="td">
                {{ item.collegeName }}
              </view>
              <view class="td">
                {{ item.firstScore }}
              </view>
              <view class="td">
                {{ item.retrialScore }}
              </view>
            </view>
          </view>
        </view>
      </maskLayer>
    </view>
    <up-picker ref="collegePickerRef" :show="collegeShow" :columns="collegeColumns" keyName="collegeName"
      @confirm="confirmCollege" @cancel="collegeCancel" />
  </view>
</template>

<script setup lang="ts">
import { matriculationRecord, schoolScoreStatis, chatMatriculationRecord } from '@/api/collage';
import { groupBy } from 'lodash-es';
import { useUserStore } from '@/store';
const userStore = useUserStore();

const { status } = storeToRefs(userStore)

const props = defineProps({
  majorDetail: {
    type: Object,
    default: () => ({}),
  },
  level3Code: {
    type: String,
    default: '',
  },
  schoolId: {
    type: String,
    default: '',
  },
});
const collegePickerRef = ref(null);
const recruitType = ref(1);
const itemList = [{
  name: '全日制',
  recruitType: 1,
}, {
  name: '非全日制',
  recruitType: 2,
}];
const currentIndex = ref(0);
const majorDatail = ref<any>(null)
const chart = ref();
const tableYearList = ref([]);
const currentYearIndex = ref('2024');
const scoreStatisDetail = ref<any>({})

const chartData = ref({
  categories: [],
  series: [],
});

const opts = {
  color: ['#F0929E', '#F5D96F', '#B7A6F8', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
  padding: [15, 40, 0, 5],
  enableScroll: false,
  legend: {},
  dataLabel: false,
  xAxis: {
    disableGrid: true,
    title: '分数',
    titleOffsetX: -5,
    fontSize: 11,
  },
  yAxis: {
    showTitle: true,
    gridType: 'dash',
    data: [{
      axisLine: false,
      title: '录取人数',
      titleOffsetX: 5,
      min: 0,
    }],
  },
  extra: {
    column: {
      seriesGap: 2,
      type: 'group',
      width: 10,
      activeBgColor: '#000000',
      activeBgOpacity: 0.08,
    },
  },
};

const tableData = ref([]);

const tableData2 = ref([]);
const collegeList = ref<any[]>([])
const collegeShow = ref(false);
const collegeColumns = ref<any[]>([[]]);
const collegeItem = ref<any>({
  collegeId: '',
  collegeItem: '',
});
// 学院选择确认
const confirmCollege = (item: any) => {
  console.log(item, 'item')
  collegeItem.value = item.value[0];
  collegeShow.value = false;
  reloadPageData()
};
// 学院选择取消
const collegeCancel = () => {
  collegeShow.value = false;
};
// 切换全日制和非全日制
const recruitTypeChange = (index: number) => {
  currentIndex.value = index;
  recruitType.value = itemList[index].recruitType;
  reloadPageData()
};

// 查录取与分数分布
const getSchoolScoreStatisFn = () => {
  schoolScoreStatis({
    level3Code: props.level3Code,
    schoolId: props.schoolId,
  }).then((res: any) => {
    scoreStatisDetail.value = res || {};
  });
};

// 一志愿录取名单
const getMatriculationRecordFn = () => {
  matriculationRecord({
    level3Code: props.level3Code,
    schoolId: props.schoolId,
    collegeId: collegeItem.value.collegeId,
    recruitType: recruitType.value,
  }).then((res: any) => {
    const response = res || [];
    if (response && response.length) {
      const groupList = groupBy(response, 'year');
      for (let key in groupList) {
        if (groupList[key] && groupList[key].length) {
          tableYearList.value.push(key)
        }
      }
      tableYearList.value.sort((a, b) => b - a)
      scoreStatisDetail.value = groupList;
      currentYearIndex.value = tableYearList.value[0]
      tableData2.value = scoreStatisDetail.value[tableYearList.value[0]]
    } else {
      scoreStatisDetail.value = [];
      tableData2.value = []
    }
  });
};

const setChartData = (data: any) => {
  const categories = [];
  let series = [];
  const year2022 = [];
  const year2023 = [];
  const year2024 = [];
  for (const item of data) {
    if (item.segment !== '建议分') {
      categories.push(item.segment);
      year2022.push(item['2022'] || 0);
      year2023.push(item['2023'] || 0);
      year2024.push(item['2024'] || 0);
    }
  }
  series = [{
    name: '2024年',
    data: year2024,
  }, {
    name: '2023年',
    data: year2023,
  }, {
    name: '2022年',
    data: year2022,
  }]
  chartData.value.categories = categories;
  chartData.value.series = series;
  chart.value = chartData.value;
}

// 获取一志愿录取与分数分布
const getChatMatriculationRecord = () => {
  chatMatriculationRecord({
    level3Code: props.level3Code,
    schoolId: props.schoolId,
    collegeId: collegeItem.value.collegeId,
    recruitType: recruitType.value,
  }).then((res: any) => {
    tableData.value = res || [];
    setChartData(res)
  });
};

const changeYear = (year: string) => {
  currentYearIndex.value = year;
  tableData2.value = scoreStatisDetail.value[year]
}


watch(
  () => props.majorDetail,
  (val: any[]) => {
    if (val && val.collegeList) {
      majorDatail.value = val
      collegeList.value = val.collegeList
      setTimeout(() => {
        collegePickerRef.value.setColumnValues(0, collegeList.value)
        if (collegeList.value.length > 0) {
          collegeItem.value = collegeList.value[0];
        }
        reloadPageData()
      }, 200)
    }
  },
  {
    immediate: true
  }
)

const reloadPageData = () => {
  getChatMatriculationRecord()
  // getSchoolScoreStatisFn()
  getMatriculationRecordFn()
}

</script>

<style scoped lang="scss">
.analysis {
  padding: 32rpx 0rpx;
}

.analysis-select {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .analysis-select-item-left {
    width: 288rpx;
    height: 60rpx;
    display: flex;
    border-radius: 8rpx;
    overflow: hidden;

    .item {
      width: 144rpx;
      background: #F2F2F7;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .active {
      color: #ffffff;
      background-color: #E94650;
    }
  }

  .analysis-select-item-right {
    width: 366rpx;
    min-height: 60rpx;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    padding: 0 16rpx;
    box-sizing: border-box;
    border: 2rpx solid #E7E7E7;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.analysis-detail {
  .title {
    margin: 24rpx 0;
    font-weight: 500;
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.85);
    line-height: 48rpx;
  }

  .table-header {
    .item-wrapper {
      display: flex;
    }

    .active {
      background: #FFECEB !important;
      color: #E94650 !important;
    }

    .item {
      width: 160rpx;
      height: 64rpx;
      border-radius: 32rpx;
      background: #F2F2F7;
      font-weight: 500;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.85);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 32rpx;
    }

    .num-wrapper {
      font-size: 24rpx;
      color: rgba(0, 0, 0, 0.45);
      margin: 24rpx 0;

      .num {
        color: rgba(0, 0, 0, 0.85);
      }
    }
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
