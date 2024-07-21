<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 18:35:05
 * @LastEditTime : 2024-07-20 21:52:32
 * @LastEditors  : jiangronghua
 * @Description  :
-->
<template>
  <view class="school-info">
    <view class="top">
      <up-image class="logo" :src="schoolInfo.logo" width="96rpx" height="96rpx" />
      <view class="right">
        <view class="school-name">
          <text>{{ schoolInfo.name }}</text>
          <up-image class="edit-icon" :src="schoolInfo.star ? star : unstar" width="40rpx" height="40rpx" @click="schoolInfo.star = !schoolInfo.star" />
        </view>
        <view class="tags">
          <view class="tag tag-1">
            {{ schoolInfo.tag1 }}
          </view>
          <view v-for="(tag, index) in schoolInfo.tag2" :key="index" class="tag tag-2">
            {{ tag }}
          </view>
          <view class="tag tag-3">
            {{ schoolInfo.tag3 }}
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="detail-item flex justify-between">
        <view class="item left">
          <view class="label">
            专业:
          </view>
          <text>{{ schoolInfo.major }}({{ schoolInfo.majorCode }})</text>
        </view>
        <view class="item right">
          <view class="label">
            学位类型:
          </view>
          <text>{{ schoolInfo.type }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const schoolInfo = reactive({
  name: '上海交通大学',
  logo: 'https://static.kaoyan.cn/image/logo/470_log.jpg',
  major: '应用心理',
  majorCode: '025872',
  type: '学术学位',
  score: 400,
  tag1: '综合类',
  tag2: ['985', '211'],
  tag3: 'A+',
  editAble: true,
  star: false,
});

const star = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/star.png');
const unstar = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/unstar.png');
</script>

<style lang="scss" scoped>
.school-info {
  padding: 32rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      flex-shrink: 0;
    }
    .right {
      flex: 1;
      margin-left: 24rpx;
      height: 96rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .school-name {
      display: flex;
      justify-content: space-between;
    }
    .tags {
      display: flex;
    }
    .tag {
      padding: 4rpx 8rpx;
      border-radius: 4rpx;
      font-size: 20rpx;
      margin-right: 16rpx;
    }
    .tag-1 {
      color: #E94650;
      background-color: #FFECEB;
    }
    .tag-2 {
      color: #4D59FF;
      background-color: #EBEFFF;
    }
    .tag-3 {
      color: #0EAEB4;
      background-color: #E0F8F5;
    }
  }
  .bottom {
    margin-top: 24rpx;
    background-color: #F9F9FA;
    border-radius: 8rpx;
    padding: 16rpx 24rpx;
    font-size: 24rpx;
    line-height: 36rpx;
  }
  .detail-item {
    margin: 4rpx 0;
    .left {
      flex: 6;
      flex-shrink: 0;
    }
    .right {
      flex: 4;
      flex-shrink: 0;
    }
    .item {
      display: flex;
    }
    .label {
      color: #898989;
      margin-right: 10rpx;
    }
  }
}
</style>
