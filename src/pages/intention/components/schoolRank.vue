<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-24 13:11:56
 * @LastEditTime : 2024-07-24 17:44:46
 * @LastEditors  : jiangronghua
 * @Description  : 学校排名
-->
<template>
  <div class="school-rank">
    <view class="top">
      <view class="name">
        排名
      </view>
      <view class="title">
        {{ title }}
      </view>
    </view>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '校友会',
  },
  list: {
    type: Array,
    default: () => [],
  },
});
const { title, list } = toRefs(props);
const showList = ref<any>([]); // 显示的列表

onMounted(() => {
  showList.value = list.value;
});
</script>

<style scoped lang="scss">
.school-rank {
  display: flex;
  flex-direction: column;
  height: 100%;
  .top {
    height: 80rpx;
    background-color: #F2F2F7;
    display: flex;
    align-items: center;
    .name {
      width: 110rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
      color: #828282;
      line-height: 32rpx;
      flex-shrink: 0;
    }
    .title {
      padding: 0 16rpx;
      font-weight: 500;
      font-size: 28rpx;
      color: #252525;
      line-height: 44rpx;
    }
  }
}
</style>
