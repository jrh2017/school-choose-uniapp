<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 18:42:19
 * @LastEditTime : 2024-07-20 20:17:42
 * @LastEditors  : jiangronghua
 * @Description  : 专业详情主页
-->
<template>
  <div class="major">
    <view class="top">
      <baseinfo />
    </view>
    <view class="main">
      <view class="title">24届专业录取排名</view>
      <view class="content">
        <ranking />
      </view>
      <view class="title">
        意向专业<text class="sub-title">录取该专业的所有排名</text>
      </view>
      <view class="content">
        <ranking-table />
      </view>
      <view class="title">24届院校录取排名</view>
      <view class="content">
        <ranking />
      </view>
      <view class="title">
        意向院校<text class="sub-title">意向院校中该专业录取排名</text>
      </view>
      <view class="content">
        <ranking-table />
      </view>
    </view>
  </div>
</template>
<script setup lang="ts">
import baseinfo from './baseinfo.vue'
import ranking from './rankingChart.vue'
import rankingTable from './rankingTable.vue'
</script>
<style scoped lang="scss">
.major {
  .top {
    padding: 0 32rpx;
  }
  .main {
    margin-top: 32rpx;
    background-color: #ffffff;
    padding: 32rpx;
    .title {
      font-weight: 500;
      margin: 20rpx 0;
      font-size: 32rpx;
      color: rgba(0,0,0,0.85);
      line-height: 48rpx;
      display: flex;
      align-items: center;
    }
    .sub-title {
      margin-left: 20rpx;
      font-size: 24rpx;
      color: rgba(0,0,0,0.45);
      line-height: 36rpx;
    }
  }
}
</style>
