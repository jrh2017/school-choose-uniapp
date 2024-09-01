<template>
  <up-popup :show="showPop" mode="center" :closeable="true" round="24rpx" @close="$emit('close')">
    <view class="popup-box">
      <view class="popup-title">
        深度择校
      </view>
      <view class="popup-content">
        <up-image src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/qrcode.png" mode="aspectFit" width="436rpx"
          height="436rpx" />
        <text class="text">
          长按识别二维码
        </text>
      </view>
    </view>
  </up-popup>
</template>
<script setup lang="ts">
const emit = defineEmits(['close']);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  }
});
const { show } = toRefs(props);
const showPop = ref(false); // 是否显示二维码弹窗
const closeFn = () => {

}
watchEffect(() => {
  showPop.value = show.value;
});
</script>
<style lang="scss" scoped>
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
    color: rgba(0, 0, 0, 0.85);
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
      color: rgba(0, 0, 0, 0.85);
      line-height: 36rpx;
    }
  }
}
</style>
