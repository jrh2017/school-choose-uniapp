<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-25 15:08:43
 * @LastEditTime : 2024-09-01 22:32:04
 * @LastEditors  : jiangronghua
 * @Description  :
-->
<template>
  <view class="container">
    <up-navbar :placeholder="true" bg-color="#F8EFF2" title="设置" autoBack />
    <view class="content">
      <view class="m-y-20rpx border-rd-24rpx bg-white">
        <u-cell-group :border="false">
          <u-cell icon="star" title="商务合作" is-link @click="show = true">
            <template #icon>
              <up-image class="mr-16rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/user-06.png"
                width="40rpx" height="40rpx" />
            </template>
          </u-cell>
          <u-cell icon="heart" title="隐私政策" is-link :border="false" @click="toPrivacy">
            <template #icon>
              <up-image class="mr-16rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/user-07.png"
                width="40rpx" height="40rpx" />
            </template>
          </u-cell>
        </u-cell-group>
      </view>
      <up-button type="error" shape="circle" text="退出登录" class="mt-20rpx" @click="logout" />
    </view>
    <FreeSchoolPop :show="show" @close="show = false" />
  </view>
</template>

<script setup lang="ts">
import { clearToken } from '@/utils/auth';
import FreeSchoolPop from '@/components/free-school-selection/free-school-selection.vue'
const show = ref(false);

const logout = () => {
  uni.showModal({
    title: '提示',
    content: '确定退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        clearToken();
        uni.reLaunch({
          url: '/pages/common/login/index',
        });
      }
    },
  });
};

const toPrivacy = () => {
  uni.navigateTo({ url: '/pages/user/policy/index' });
};
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
}

.content {
  min-height: 1000rpx;
  box-sizing: border-box;
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
  padding: 32rpx;
}
</style>
