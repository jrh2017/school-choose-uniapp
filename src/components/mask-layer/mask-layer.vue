<!--
 * @Author       : chenyuchao c375880854@163.com
 * @Date         : 2024-08-28 17:58:04
 * @LastEditTime : 2024-08-28 21:33:14
 * @LastEditors  : jiangronghua
 * @Description  : 蒙层组件
 * @Remark       :
-->
<template>
  <view class="mask-layer">
    <view class="content">
      <slot></slot>
    </view>
    <view v-if="isShowMask" class="default">
      <up-skeleton :rows="4" title loading rowsHeight="18"></up-skeleton>
    </view>
    <view v-if="isShowMask" class="mask-layer-bg">
      <view class="custom-style" @click="activationFn">激活查看完整内容</view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { getToken } from '@/utils/auth';
const props = defineProps({
  isShowMask: {
    type: Boolean,
    default: false,
  }
});
const { isShowMask } = toRefs(props);
const activationFn = () => {
  if (!getToken()) {
    uni.reLaunch({
      url: '/pages/common/login/index'
    })
    return
  } else {
    uni.navigateTo({
      url: '/pages/code/index'
    })
  }
}
</script>
<style lang="scss" scoped>
.mask-layer {
  position: relative;

  .mask-layer-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5rpx);
    display: flex;
    justify-content: center;
    align-items: center;

    .custom-style {
      color: #fff;
      width: 430rpx;
      height: 80rpx;
      background: #E94650;
      border-radius: 48rpx 48rpx 48rpx 48rpx;
      overflow: hidden;
      border-radius: 48rpx;
      text-align: center;
      line-height: 80rpx;
    }
  }
}

.default {
  display: none;
  height: 300rpx;
}

.content:empty+.default {
  display: block;
}
</style>
