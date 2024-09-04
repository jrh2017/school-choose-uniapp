<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 19:28:30
 * @LastEditTime : 2024-09-04 08:50:17
 * @LastEditors  : jiangronghua
 * @Description  : 排名组件
-->
<template>
  <view class="ranking">
    <qiun-data-charts :canvas2d="true" type="area" :opts="opts" :chart-data="chart" />
  </view>
</template>

<script setup lang="ts">
import { chartIntention, chartIntentionSchool } from '@/api/userinfo';
const props = defineProps({
  type: {
    type: Number,
    default: 1,
  }
});
const chart = ref();
const chartData = reactive({
  categories: [],
  series: [
    {
      name: '录取人数',
      data: [],
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

const getIntentionData = () => {
  chartIntention().then((res: any) => {
    const chartBase = res.chartBase.reverse()
    chartData.categories = []
    chartData.series[0].data = []
    chartBase?.forEach((item: any) => {
      chartData.categories.push(item.score)
      chartData.series[0].data.push(item.people)
    })
    chart.value = chartData;
  })
}

const getIntentionSchoolData = () => {
  chartIntentionSchool().then((res: any) => {
    const chartBase = res.chartBase.reverse()
    chartData.categories = []
    chartData.series[0].data = []
    chartBase?.forEach((item: any) => {
      chartData.categories.push(item.score)
      chartData.series[0].data.push(item.people)
    })
    chart.value = chartData;
  })
}

onMounted(() => {
  const type = props.type;
  if (type === 1) {
    getIntentionData();
  }
  if (type === 2) {
    getIntentionSchoolData()
  }
})
</script>

<style scoped lang="scss"></style>
