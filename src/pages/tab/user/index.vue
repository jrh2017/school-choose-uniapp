<template>
  <view class="container">
    <u-navbar title="" bg-color="#F8EFF2" placeholder left-icon="" />
    <view class="content">
      <view class="flex items-center">
        <view class="mr-32rpx">
          <up-image src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/logo.png" shape="circle" width="128rpx"
            height="128rpx" />
        </view>
        <view class="h-128rpx flex flex-1 flex-col flex-justify-between">
          <view class="font-weight-bold pb-20rpx font-size-40rpx color-#252424">
            {{ nickname || code }}
          </view>
          <view class="font-size-28rpx color-#888486">
            手机号:{{ mobile }}
          </view>
        </view>
      </view>

      <view class="mt-44rpx border-rd-24rpx bg-white">
        <u-cell-group :border="false">
          <u-cell icon="rmb-circle" title="我的报告" is-link :border="false" @click="toReport">
            <template #icon>
              <up-image class="mr-16rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/user-01.png"
                width="40rpx" height="40rpx" />
            </template>
          </u-cell>
        </u-cell-group>
      </view>

      <view class="mt-20rpx border-rd-24rpx bg-white">
        <u-cell-group :border="false">
          <u-cell icon="star" title="关注院校" is-link @click="toAttention">
            <template #icon>
              <up-image class="mr-16rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/user-02.png"
                width="40rpx" height="40rpx" />
            </template>
          </u-cell>
          <u-cell icon="photo" title="激活码" is-link @click="toCode">
            <template #icon>
              <up-image class="mr-16rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/user-03.png"
                width="40rpx" height="40rpx" />
            </template>
          </u-cell>
          <u-cell icon="heart" title="一起分销赚钱" is-link :border="false" @click="toShare">
            <template #icon>
              <up-image class="mr-16rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/user-04.png"
                width="40rpx" height="40rpx" />
            </template>
          </u-cell>
        </u-cell-group>
      </view>

      <view class="mt-20rpx border-rd-24rpx bg-white">
        <u-cell-group :border="false">
          <u-cell icon="setting" title="设置" is-link :border="false" @click="toSetting">
            <template #icon>
              <up-image class="mr-16rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/user-05.png"
                width="40rpx" height="40rpx" />
            </template>
          </u-cell>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { memberInfo } from '@/api/userinfo'
import type { UserState } from '@/store/modules/user/types';
import { useClipboard } from '@/hooks';
import { useUserStore } from '@/store';

const { setClipboardData, getClipboardData } = useClipboard();
const userStore = useUserStore();

const { code, mobile, nickname } = storeToRefs(userStore)
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

/**
 * 跳转到我的报告页面
 */
const toReport = () => {
  uni.navigateTo({
    url: '/pages/user/report/index',
  });
};

/**
 * 跳转到激活码页面
 */
const toCode = () => {
  uni.navigateTo({
    url: '/pages/code/index',
  });
};

const toShare = () => {
  const linkUrl =
    "https://mp.weixin.qq.com/s?__biz=MzkyODYwMzQ3NQ==&mid=2247483659&idx=1&sn=77afd5cdcc89efe45eef8657c99d22ee&chksm=c2170d37f5608421fa03b7faba0d66af1bb3d8e055ce088667de7f0f4eb348a61285ab200ab3#rd";
  const params = encodeURIComponent(linkUrl);
  wx.navigateTo({
    url: `/pages/common/webview/index?url=${params}`,
  });
}

onShow(async () => {
  const userinfo: UserState = await memberInfo()
  userStore.setInfo(userinfo)
})
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
