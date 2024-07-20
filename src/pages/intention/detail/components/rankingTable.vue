<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 19:32:44
 * @LastEditTime : 2024-07-20 20:29:36
 * @LastEditors  : jiangronghua
 * @Description  : 意向排名表格
-->
<template>
  <view class="ranking-table">
    <view class="table">
      <view class="tr">
        <view class="th">
          年份
        </view>
        <view class="th">
          预估分/排名
        </view>
        <view class="th">
          最高分/排名
        </view>
        <view class="th">
          最低分/排名
        </view>
        <view class="th">
          建议分/排名
        </view>
      </view>
      <view v-for="(item, index) in tableData" :key="index" class="tr" style="">
        <view class="td">
          {{ item.year }}
        </view>
        <view class="td">
          {{ item.estimateScore }}/{{ item.estimateRank }}
        </view>
        <view class="td">
          {{ item.highScore }}/{{ item.highRank }}
        </view>
        <view class="td">
          {{ item.lowScore }}/{{ item.lowRank }}
        </view>
        <view class="td">
          {{ item.recommendScore }}/{{ item.recommendRank }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const tableData = ref([{
  year: '2024',
  estimateScore: 456,
  estimateRank: 1545,
  highScore: 530,
  highRank: 1,
  lowScore: 300,
  lowRank: 1923,
  recommendScore: 400,
  recommendRank: 1234,
}, {
  year: '2023',
  estimateScore: 456,
  estimateRank: 1545,
  highScore: 530,
  highRank: 1,
  lowScore: 300,
  lowRank: 1923,
  recommendScore: 400,
  recommendRank: 1234,
}, {
  year: '2022',
  estimateScore: 456,
  estimateRank: 1545,
  highScore: 530,
  highRank: 1,
  lowScore: 300,
  lowRank: 1923,
  recommendScore: 400,
  recommendRank: 1234,
}]);
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  border-radius: 8rpx;
  display: table;
  border-collapse: collapse;
  font-size: 24rpx;
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
