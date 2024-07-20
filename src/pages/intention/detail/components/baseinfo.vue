<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 18:35:05
 * @LastEditTime : 2024-07-20 20:50:37
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
          <view class="w-144rpx">
            <up-button :customStyle="customStyle" shape="circle" type="error" text="更改意向" :disabled="schoolInfo.editAble"></up-button>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">123</view>
  </view>
</template>
<script setup lang="ts">
const customStyle = {
  height: '44rpx',
  fontSize: '14rpx',
  border: 'none',
}
const schoolInfo = reactive({
  name: '上海交通大学',
  logo: 'https://static.kaoyan.cn/image/logo/470_log.jpg',
  major: '计算机科学与技术',
  majorCode: '025872',
  type: '学术学位',
  score: 400,
  tag1: '综合类',
  tag2: ['985', '211'],
  tag3: 'A+',
  editAble: true,
})
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
    }
    .school-name {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
