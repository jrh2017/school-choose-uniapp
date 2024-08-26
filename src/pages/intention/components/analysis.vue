<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 22:10:53
 * @LastEditTime : 2024-08-26 15:35:49
 * @LastEditors  : jiangronghua
 * @Description  : 拟录取分析组件
-->
<template>
  <view class="analysis">
    <view class="analysis-select">
      <view class="analysis-select-item-left">
        <view v-for="(item, index) in itemList" :key="index" class="item" :class="{ active: currentIndex === index }" @click="recruitTypeChange(index, item.recruitType)">
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
      <view class="chart">
        <qiun-data-charts type="column" :opts="opts" :chart-data="chart" />
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
          <view v-for="(item, index) in tableData" :key="index" class="tr" style="" :class="{ active: index % 2 === 1 }">
            <view class="td">
              {{ item.score }}
            </view>
            <view class="td">
              {{ item['2024'] }}
            </view>
            <view class="td">
              {{ item['2023'] }}
            </view>
            <view class="td">
              {{ item['2022'] }}
            </view>
          </view>
          <view class="tr">
            <view class="td">
              建议分
            </view>
            <view class="td">
              332分
            </view>
            <view class="td">
              335分
            </view>
            <view class="td">
              336分
            </view>
          </view>
        </view>
      </view>
      <view class="title">
        一志愿拟录取名单
      </view>
      <view class="table-header">
        <view class="item-wrapper">
          <view v-for="(item, index) in yearList" :key="index" class="item" :class="{ active: currentYearIndex === index }">
            {{ item }}
          </view>
        </view>
        <view class="num-wrapper">
          总录取人数:<text class="num">
            5人
          </text>
        </view>
      </view>
      <view class="ranking-table">
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
          <view v-for="(item, index) in tableData2" :key="index" class="tr" style="" :class="{ active: index % 2 === 1 }">
            <view class="td">
              {{ index + 1 }}
            </view>
            <view class="td">
              {{ item.collage }}
            </view>
            <view class="td">
              {{ item.firstScore }}
            </view>
            <view class="td">
              {{ item.secondScore }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <up-picker :show="collegeShow" :columns="collegeColumns" keyName="collegeName" @confirm="confirmCollege" @cancel="collegeCancel" />
  </view>
</template>

<script setup lang="ts">
import { useCollege } from '@/store/index';

const props = defineProps({
  scoreStatisDetail: {
    type: Object,
    default: () => ({}),
  },
  collegeList: {
    type: Array,
    default: () => ([]),
  },
});
const emit = defineEmits(['getMatriculationRecordFn']);
const collegeStore = useCollege();
const itemList = [{
  name: '全日制',
  recruitType: '1',
}, {
  name: '非全日制',
  recruitType: '2',
}];
const currentIndex = ref(0);
const chart = ref();
const yearList = reactive(['2024', '2023', '2022']); // 2024, 2023, 2022
const currentYearIndex = ref(0);

const chartData = reactive({
  categories: ['316-332', '332-348', '348-364', '364-380', '380-400'],
  series: [
    {
      name: '2024年',
      data: [35, 36, 31, 33, 13],
    },
    {
      name: '2023年',
      data: [18, 27, 21, 24, 6],
    },
    {
      name: '2022年',
      data: [18, 27, 21, 24, 6],
    },
  ],
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

const tableData = ref([{
  score: '364-380',
  2024: 180,
  2023: 150,
  2022: 120,
}, {
  score: '348-364',
  2024: 180,
  2023: 150,
  2022: 120,
}, {
  score: '332-348',
  2024: 180,
  2023: 150,
  2022: 120,
}, {
  score: '316-332',
  2024: 180,
  2023: 150,
  2022: 120,
}]);

const tableData2 = ref([{
  collage: '计算机科学与技术学院',
  firstScore: 360,
  secondScore: 365,
}, {
  collage: '计算机科学与技术学院',
  firstScore: 360,
  secondScore: 365,
}, {
  collage: '计算机科学与技术学院',
  firstScore: 360,
  secondScore: 365,
}]);
const { scoreStatisDetail, collegeList } = toRefs(props);
const collegeShow = ref(false);
const collegeColumns = ref([]);
const collegeItem = ref({
  collegeName: '所有学院',
});
// 学院选择确认
const confirmCollege = (item: any) => {
  collegeStore.setCollegeItem(item);
  collegeItem.value = item;
  collegeShow.value = false;
};
// 学院选择取消
const collegeCancel = () => {
  collegeShow.value = false;
};
// 切换全日制和非全日制
const recruitTypeChange = (index: number, recruitType: string) => {
  currentIndex.value = index;
  collegeStore.setRecruitType(recruitType);
  emit('getMatriculationRecordFn');
};
onMounted(() => {
  chart.value = chartData;
});
watchEffect(() => {
  collegeColumns.value = [[{ collegeName: '所有学院' }, ...collegeList.value]];
});
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
    height: 60rpx;
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
    color: rgba(0,0,0,0.85);
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
      color: rgba(0,0,0,0.85);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 32rpx;
    }
    .num-wrapper {
      font-size: 24rpx;
      color: rgba(0,0,0,0.45);
      margin: 24rpx 0;
      .num {
        color: rgba(0,0,0,0.85);
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
