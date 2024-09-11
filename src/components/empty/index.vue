<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-09-11 14:08:52
 * @LastEditTime : 2024-09-11 14:26:10
 * @LastEditors  : jiangronghua
 * @Description  : 空状态组件
-->
<template>
  <view class="empty-main">
    <up-image src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/empty.png" mode="aspectFit" width="255rpx"
      height="240rpx" />
    <view v-if="text" class="empty-text">{{ text }}</view>
    <view v-if="subText" class="empty-text">{{ subText }}</view>
  </view>
</template>
<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: '暂无数据',
  },
  subText: {
    type: String,
    default: '',
  }
});
const { text, subText } = toRefs(props);
</script>
<style scoped lang="scss">
.empty-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
  box-sizing: border-box;

  .empty-text {
    margin-top: 16rpx;
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.25);
    line-height: 44rpx;
  }
}
</style>
