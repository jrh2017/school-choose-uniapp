<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-25 13:36:30
 * @LastEditTime : 2024-07-25 13:42:38
 * @LastEditors  : jiangronghua
 * @Description  : 择校页面
-->
<template>
  <view>123</view>
</template>

<script lang="ts" setup>
import { getToken } from '@/utils/auth';

onShow(() => {
  if (!getToken()) {
    uni.reLaunch({ url: '/pages/common/login/index' });
  }
});
</script>

<style scoped lang="scss"></style>
