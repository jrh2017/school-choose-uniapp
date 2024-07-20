<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title="研攀登"
      left-icon=""
    />
    <view class="content w-100% flex items-start justify-start">
      <view class="echart-container">
        <view class="title mb-10rpx">
          24届专业录取排名 <up-icon name="arrow-right" size="10" style="margin-left: 40rpx;" />
        </view>
        <qiun-data-charts type="area" :opts="opts" :chart-data="chart" />
      </view>
      <view class="quick mt-40rpx w-100% flex items-center justify-between">
        <view class="bg1 h-332rpx w-332rpx flex items-center justify-center">
          <up-image src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/home-icon-01.png" width="204rpx" height="178rpx" />
          <view class="icon-text">
            <text>择校对比</text>
            <text>最优选择推荐</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const chart = ref();
const chartData = reactive({
  categories: ['2018', '2019', '2020', '2021', '2022', '202'],
  series: [
    {
      name: '成交量A',
      data: [35, 8, 25, 37, 4, 20],
    },
  ],
});
const opts = reactive({
  color: ['#FF9D9D'],
  padding: [15, 40, 20, 0],
  enableScroll: false,
  legend: {
    show: false,
  },
  dataLabel: false,
  dataPointShape: false,
  xAxis: {
    disableGrid: true,
    boundaryGap: 'justify',
    labelCount: 2,
    title: '分数',
    titleOffsetX: 15,
  },
  yAxis: {
    disableGrid: true,
    gridType: 'dash',
    splitNumber: 1,
    dashLength: 2,
    showTitle: true,
    data: [{
      title: '录取人数',
      calibration: false,
      titleOffsetX: 5,
    }],
  },
  extra: {
    area: {
      type: 'curve',
      opacity: 0.9,
      addLine: true,
      width: 2,
      gradient: true,
      activeType: 'hollow',
    },
  },
});

onShow(() => {
  chart.value = chartData;
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #FFFFFF 100%);
  flex: 1;
}
.content {
  min-height: 1000rpx;
  padding: 32rpx;
  box-sizing: border-box;
  flex-direction: column;
  .echart-container {
    width: 100%;
    height: 400rpx;
    box-sizing: border-box;
    padding: 32rpx 20rpx;
    background: #FFFFFF;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    .title {
      display: flex;
      height: 28rpx;
      border-left: 8rpx solid #F1878D;
      font-size: 28rpx;
      align-items: center;
      padding-left: 20rpx;
      font-weight: 600;
    }
  }
  .quick {
    .icon-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
