<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 19:28:30
 * @LastEditTime : 2024-09-01 16:25:38
 * @LastEditors  : jiangronghua
 * @Description  : 排名组件
-->
<template>
  <view class="ranking">
    <qiun-data-charts type="area" :opts="opts" :chart-data="chart" />
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

onMounted(() => {
  chart.value = chartData;
})
</script>

<style scoped lang="scss"></style>
