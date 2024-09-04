<template>
  <view class="container">
    <up-navbar :placeholder="true" bg-color="#F8EFF2" title="" left-icon="" />
    <view class="content">
      <view class="top">
        <up-image class="edit-icon" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/logo.png" width="184rpx"
          height="184rpx" />
        <view class="info">
          <text class="font-size-32rpx color-#000000 line-height-48rpx">
            小程序申请获得以下权限：
          </text>
          <text class="mt-8rpx font-size-32rpx color-#BDB9BB line-height-40rpx">
            获得您的手机号码
          </text>
        </view>
        <view class="btn">
          <button v-if="checkbox.length > 0" size="default" type="default" class="login-btn" hover-class="is-hover"
            open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
            手机号一键登录
          </button>
          <button v-else size="default" type="default" class="login-btn" hover-class="is-hover" @click="showToastMsg">
            手机号一键登录
          </button>
        </view>
        <view class="agreement">
          <up-checkbox-group v-model="checkbox" activeColor="#E94650">
            <up-checkbox :customStyle="{ marginBottom: '8px' }" name="agree">
              <template #label>
                <text class="color-#BDB9BB line-height-32rpx">
                  我已阅读并同意
                  <text class="color-#E94650" @click.stop="openUrl">
                    《用户协议与隐私条款》
                  </text>
                </text>
              </template>
            </up-checkbox>
          </up-checkbox-group>
        </view>
      </view>
      <text class="contact" @click="toService">
        联系客服
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { setToken } from '@/utils/auth';
import { login, login2, memberInfo } from '@/api/userinfo';
import type { UserState } from '@/store/modules/user/types';
import { useUserStore } from '@/store';

const checkbox = ref([]);
const userStore = useUserStore();
// openid直接登录方法
const submit = () => {
  login({}).then((res: any) => {
    const { Authorization } = res;
    setToken(Authorization);
    uni.reLaunch({ url: '/pages/tab/home/index' });
  });
};

const openUrl = () => {
  uni.navigateTo({ url: '/pages/user/policy/index' });
};

const showToastMsg = () => {
  uni.showToast({
    title: '请先同意用户协议与隐私条款',
    icon: 'none',
    duration: 2000,
  });
};

const getPhoneNumber = (event: any) => {
  // submit();
  const code = event.detail.code;
  login2({ code }).then(async (res: any) => {
    try {
      const { Authorization } = res;
      setToken(Authorization);
      const userinfo: UserState = await memberInfo()
      userStore.setInfo(userinfo)
      uni.reLaunch({ url: '/pages/tab/home/index' });
    } catch (error) {
      uni.showToast({
        title: '登录失败，请稍后再试',
        icon: 'none',
        duration: 2000,
      });
    }
  });
};

const toService = () => {
  console.log("toService");
  wx.openCustomerServiceChat({
    corpId: "wwec843afac46c76c2",
    extInfo: {
      url: "https://work.weixin.qq.com/kfid/kfccaa80616c6052be2",
    },
    success: function (res) {
      console.log("res", res);
    },
    fail: function (res) {
      console.log("res", res);
    },
  });
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.content {
  box-sizing: border-box;
  padding: 0 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  .top {
    margin-top: 100rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .info {
      margin-top: 64rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .btn {
      margin-top: 96rpx;

      .login-btn {
        color: #ffffff;
        background-color: #E94650;
        border-color: #E94650;
        width: 558rpx;
        height: 108rpx;
        border-radius: 54rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 34rpx;
        color: #FFFFFF;
        line-height: 48rpx;
      }
    }

    .agreement {
      margin-top: 98rpx;
      width: 100%;
    }
  }

  .contact {
    margin-bottom: 96rpx;
    font-size: 28rpx;
    color: #E94650;
    line-height: 44rpx;
  }
}
</style>
