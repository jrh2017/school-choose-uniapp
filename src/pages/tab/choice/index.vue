<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-25 13:36:30
 * @LastEditTime : 2024-07-27 14:35:04
 * @LastEditors  : jiangronghua
 * @Description  : 择校页面
-->
<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title="择校设置"
      leftIcon=""
    />
    <view class="content">
      <view class="top">
        <view class="line-01">
          你都择校报告
        </view>
        <view class="line-02">
          1亿大数据最优考研院校推荐
        </view>
        <view class="list">
          <view class="item">
            <view class="circle" />
            <text>专属冲刺院校</text>
          </view>
          <view class="item">
            <view class="circle" />
            <text>专属稳妥院校</text>
          </view>
          <view class="item">
            <view class="circle" />
            <text>专属保底院校</text>
          </view>
        </view>
        <button
          size="default"
          type="default"
          class="create-btn"
        >
          无限次生成
        </button>
      </view>
      <view class="bottom-box">
        <button size="default" type="warn" class="btn-start" @click="show = true">
          点击添加导师，尊享深度择校！(上岸快人一步)
        </button>
      </view>
      <up-safe-bottom />
    </view>
    <up-popup :show="show" mode="center" :closeable="true" round="24rpx" @close="show = false">
      <view class="popup-box">
        <view class="popup-title">
          出淤泥而不染，濯清涟而不妖
        </view>
        <view class="popup-content">
          <up-image src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/qrcode.png" mode="aspectFit" width="436rpx" height="436rpx" />
          <text class="text">
            长按识别二维码
          </text>
        </view>
      </view>
    </up-popup>
  </view>
</template>

<script lang="ts" setup>
import { getToken } from '@/utils/auth';

const show = ref(false);

onShow(() => {
  if (!getToken()) {
    uni.reLaunch({ url: '/pages/common/login/index' });
  }
});
</script>

<style scoped lang="scss">
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.content {
  min-height: 1000rpx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .top {
    width: 686rpx;
    height: 396rpx;
    background: url('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/zx-bg.png') no-repeat center;
    background-size: cover;
    display: flex;
    padding: 50rpx 32rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .line-01 {
      font-weight: 600;
      font-size: 36rpx;
      color: #FFFFFF;
      line-height: 42rpx;
    }
    .line-02 {
      margin-top: 16rpx;
      font-size: 24rpx;
      color: #F2F2F2;
      line-height: 36rpx;
    }
    .list {
      margin-top: 40rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        flex: 1;
        height: 40rpx;
        display: flex;
        font-weight: 600;
        font-size: 24rpx;
        color: #F2F2F2;
        line-height: 36rpx;
        align-items: center;
      }
      .circle {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        background: #F1DADC;
        margin-right: 16rpx;
      }
    }
    .create-btn {
      width: 100%;
      height: 96rpx;
      margin-top: 38rpx;
      background: linear-gradient( 180deg, rgba(255,255,255,0.8) 0%, #FFFFFF 100%);
      box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(233,76,88,0.25);
      border-radius: 48rpx;
      border: 2rpx solid #FFFFFF;
      font-weight: 600;
      font-size: 34rpx;
      color: #E94650;
      line-height: 48rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .bottom-box {
    padding: 24rpx 64rpx;
    background: #FFFFFF;
    position: fixed;
    bottom: 0;
    .btn-start {
      border-radius: 40rpx;
      color:#ffffff;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      font-size: 28rpx;
    }
  }
}
.popup-box {
  width: 686rpx;
  height: 664rpx;
  border-radius: 24rpx;
  .popup-title {
    height: 112rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 32rpx;
    color: rgba(0,0,0,0.85);
    line-height: 48rpx;
  }
  .popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 24rpx;
    .text {
      margin-top: 24rpx;
      font-size: 28rpx;
      color: rgba(0,0,0,0.85);
      line-height: 36rpx;
    }
  }
}
</style>
