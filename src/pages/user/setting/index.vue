<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-25 15:08:43
 * @LastEditTime : 2024-07-27 11:12:51
 * @LastEditors  : jiangronghua
 * @Description  :
-->
<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title="设置"
      autoBack
    />
    <view class="content">
      <up-button type="error" shape="circle" text="退出" class="mt-20rpx" @click="logout" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { clearToken } from '@/utils/auth';

const logout = () => {
  uni.showModal({
    title: '提示',
    content: '确定退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        clearToken();
        uni.reLaunch({
          url: '/pages/common/login/index',
        });
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
}
.content {
  min-height: 1000rpx;
  box-sizing: border-box;
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
  padding: 32rpx;
}
</style>
