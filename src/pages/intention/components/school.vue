<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 21:42:19
 * @LastEditTime : 2024-07-20 22:11:53
 * @LastEditors  : jiangronghua
 * @Description  : 意向院校组件
-->
<template>
  <div class="school">
    <view class="top">
      <schoolInfo />
    </view>
    <view class="main">
      <up-tabs :list="list1" :current="currentIndex" lineColor="#E94650" :activeStyle="{ color: '#E94650' }" :inactiveStyle="{ color: '#8C8C8C' }" />
      <view v-if="currentIndex === 0">
        <analysis />
      </view>
    </view>
  </div>
</template>

<script setup lang="ts">
import schoolInfo from './schoolInfo.vue';
import analysis from './analysis.vue';

const list1 = reactive([
  { name: '拟录取分析' },
  { name: '复试/国家线' },
  { name: '考试科目' },
  { name: '招生简章' },
  { name: '院校信息' },
]);
const currentIndex = ref(0);
</script>

<style scoped lang="scss">
.school {
  .top {
    padding: 0 32rpx;
  }
  .main {
    margin-top: 32rpx;
    background-color: #ffffff;
    padding: 32rpx;
  }
}
</style>
