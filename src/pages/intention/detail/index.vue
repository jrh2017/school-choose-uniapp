<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 17:56:35
 * @LastEditTime : 2024-07-20 21:05:25
 * @LastEditors  : jiangronghua
 * @Description  :
-->
<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title=""
      autoBack
    />
    <view class="content w-100%">
      <view class="p-32rpx">
        <up-subsection :list="list" :current="subIndex" activeColor="#E94650" inactiveColor="#858081" bgColor="#F1E9EC"></up-subsection>
      </view>
      <template v-if="subIndex === 0">
        <Major />
      </template>
    </view>
  </view>
</template>
<script setup lang="ts">
import Major from './components/major.vue'
const list = reactive(['意向专业排名', '意向院校分析']);
const subIndex = ref(0); // 当前索引
</script>
<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #FFFFFF 100%);
  flex: 1;
}
.content {
  min-height: 1000rpx;
  box-sizing: border-box;
}
</style>
