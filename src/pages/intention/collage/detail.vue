<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-22 19:23:54
 * @LastEditTime : 2024-07-22 19:31:22
 * @LastEditors  : jiangronghua
 * @Description  : 院校详情页面
-->
<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title="院校专业详情"
      autoBack
    />
    <School />
  </view>
</template>

<script lang="ts" setup>
import School from '../components/school.vue';
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
  flex: 1;
}
</style>
