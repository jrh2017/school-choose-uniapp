<template>
  <view class="container">
    <u-navbar title="" bg-color="#F8EFF2" placeholder left-icon="" />
    <view class="content">
      <view class="flex items-center">
        <view class="mr-32rpx">
          <up-image src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/avatar.jpg" shape="circle" width="128rpx" height="128rpx" />
        </view>
        <view class="h-128rpx flex flex-1 flex-col flex-justify-between">
          <view class="font-weight-bold pb-20rpx font-size-40rpx color-#252424">
            用户昵称
          </view>
          <view class="font-size-28rpx color-#888486" @click="toCopy">
            手机号:18530064223
          </view>
        </view>
      </view>

      <view class="mt-44rpx border-rd-24rpx bg-white">
        <u-cell-group :border="false">
          <u-cell icon="rmb-circle" title="我的报告" is-link :border="false">
            <template #icon>
              <up-image class="mr-16rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/user-01.png" width="40rpx" height="40rpx" />
            </template>
          </u-cell>
        </u-cell-group>
      </view>

      <view class="mt-20rpx border-rd-24rpx bg-white">
        <u-cell-group :border="false">
          <u-cell icon="star" title="关注院校" is-link @click="toAttention">
            <template #icon>
              <up-image class="mr-16rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/user-02.png" width="40rpx" height="40rpx" />
            </template>
          </u-cell>
          <u-cell icon="photo" title="激活码" is-link>
            <template #icon>
              <up-image class="mr-16rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/user-03.png" width="40rpx" height="40rpx" />
            </template>
          </u-cell>
          <u-cell icon="heart" title="一起分销赚钱" is-link :border="false">
            <template #icon>
              <up-image class="mr-16rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/user-04.png" width="40rpx" height="40rpx" />
            </template>
          </u-cell>
        </u-cell-group>
      </view>

      <view class="mt-20rpx border-rd-24rpx bg-white">
        <u-cell-group :border="false">
          <u-cell icon="setting" title="设置" is-link :border="false" @click="toSetting">
            <template #icon>
              <up-image class="mr-16rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/user-05.png" width="40rpx" height="40rpx" />
            </template>
          </u-cell>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useClipboard } from '@/hooks';

const { setClipboardData, getClipboardData } = useClipboard();

// 复制
const toCopy = async () => {
  await setClipboardData({ data: '1234567890' });
  const data = await getClipboardData();
  console.log('[ data ] >', data);
};

/**
 * 跳转到关注院校页面
 */
const toAttention = () => {
  uni.navigateTo({
    url: '/pages/user/attention/index',
  });
};

/**
 * 跳转到设置页面
 */
const toSetting = () => {
  uni.navigateTo({
    url: '/pages/user/setting/index',
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
  flex: 1;
}
.content {
  box-sizing: border-box;
  padding: 32rpx;
}
</style>
