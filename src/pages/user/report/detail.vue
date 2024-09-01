<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-08-30 17:24:35
 * @LastEditTime : 2024-08-30 17:33:24
 * @LastEditors  : jiangronghua
 * @Description  :
-->
<template>
  <view class="container">
    <up-navbar :placeholder="true" bg-color="#F8EFF2" title="报告详情" autoBack />
  </view>
</template>
<script setup lang="ts">
import { reportDetail } from '@/api/choice';

const reportId = ref('');

const getReoprtDetail = async () => {
  const res = await reportDetail({ id: reportId.value });
  console.log(res);
}

onLoad((options: any) => {
  reportId.value = options!.id;
  getReoprtDetail();
})
</script>
<style scoped lang="scss"></style>
