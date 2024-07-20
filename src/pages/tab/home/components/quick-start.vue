<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 11:17:58
 * @LastEditTime : 2024-07-20 21:40:34
 * @LastEditors  : jiangronghua
 * @Description  :
-->
<template>
  <view class="quick mt-40rpx w-100% flex items-center justify-between">
    <view class="right bg01 h-332rpx w-332rpx flex flex-col items-center justify-center">
      <up-image src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/home-icon-01.png" width="204rpx" height="178rpx" />
      <view class="icon-text flex flex-col items-center justify-center">
        <text class="font-size-36rpx font-bold">
          择校对比
        </text>
        <text class="text-01 font-size-24rpx">
          最优选择推荐
        </text>
      </view>
    </view>
    <view class="left h-332rpx flex flex-col items-center justify-between">
      <view class="item bg02 h-156rpx w-332rpx flex items-center justify-between" @click="toSchoolLibrary">
        <view class="icon-text flex flex-col items-center justify-center">
          <text class="font-size-36rpx font-bold">
            院校库
          </text>
          <text class="text-01 font-size-24rpx">
            收录874所
          </text>
        </view>
        <up-image src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/home-icon-02.png" width="136rpx" height="124rpx" />
      </view>
      <view class="item bg03 h-156rpx w-332rpx flex items-center justify-between">
        <view class="icon-text flex flex-col items-center justify-center">
          <text class="font-size-36rpx font-bold">
            专业库
          </text>
          <text class="text-01 font-size-24rpx">
            涵盖全学科
          </text>
        </view>
        <up-image src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/home-icon-03.png" width="136rpx" height="110rpx" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const toSchoolLibrary = () => {
  uni.navigateTo({
    url: '/pages/intention/detail/index',
  });
};
</script>

<style scoped lang="scss">
.quick {
  width: 100%;
  flex: 1;
  .bg01 {
    background: url('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/home-bg-01.png') no-repeat center;
    background-size: cover;
  }
  .bg02 {
    background: url('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/home-bg-02.png') no-repeat center;
    background-size: cover;
  }
  .bg03 {
    background: url('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/home-bg-03.png') no-repeat center;
    background-size: cover;
  }
  .left {
    border-radius: 24rpx;
  }
  .right {
    border-radius: 24rpx;
  }
  .text-01 {
    color: rgba(0, 0, 0, 0.65);
  }
  .item {
    padding: 0 24rpx;
    border-radius: 24rpx;
    box-sizing: border-box;
  }
}
</style>
