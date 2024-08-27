<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title="对比详情"
      autoBack
    />
    <view>123</view>
  </view>
</template>

<script lang="ts" setup>
import { majorCompare } from '@/api/compare';

const ids = ref('');
const getCompareData = () => {
  majorCompare({ ids: ids.value }).then((res) => {
    console.log(res);
  });
};
onLoad((options) => {
  ids.value = options!.schoolIds;
  getCompareData();
});
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
