<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title=""
      left-icon=""
    />
    <view class="content">
      <view class="top">
        <up-image class="edit-icon" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/logo.png" width="184rpx" height="184rpx" />
        <view class="info">
          <text class="font-size-32rpx color-#000000 line-height-48rpx">
            小程序申请获得以下权限：
          </text>
          <text class="mt-8rpx font-size-32rpx color-#BDB9BB line-height-40rpx">
            获得您的手机号码
          </text>
        </view>
        <view class="btn">
          <!-- <button
            size="default" type="default"
            class="login-btn"
            hover-class="is-hover"
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber"
          >
            手机号一键登录
          </button> -->
          <button
            size="default" type="default"
            class="login-btn"
            hover-class="is-hover"
            open-type="getPhoneNumber"
            @click="getPhoneNumber"
          >
            手机号一键登录
          </button>
        </view>
        <view class="agreement">
          <up-checkbox-group v-model="checkbox" activeColor="#E94650">
            <up-checkbox
              :customStyle="{ marginBottom: '8px' }"
              name="agree"
            >
              <template #label>
                <text class="color-#BDB9BB line-height-32rpx">
                  我已阅读并同意
                  <text class="color-#E94650">
                    《用户协议与隐私条款》
                  </text>
                </text>
              </template>
            </up-checkbox>
          </up-checkbox-group>
        </view>
      </view>
      <text class="contact">
        联系客服
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { setToken } from '@/utils/auth';

const checkbox = ref([]);

const submit = () => {
  setToken('1234567890');
  uni.reLaunch({ url: '/pages/tab/home/index' });
};

const getPhoneNumber = (e: any) => {
  console.log(e);
  submit();
};
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
        color:#ffffff;
        background-color:#E94650;
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
