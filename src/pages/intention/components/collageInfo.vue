<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-08-26 18:59:23
 * @LastEditTime : 2024-09-04 12:41:17
 * @LastEditors  : jiangronghua
 * @Description  :
-->
<template>
  <maskLayer :isShowMask="status !== 2">
    <view class="collage-info">
      <view class="title">
        联系方式
      </view>
      <view class="item">
        <text class="label">
          院校电话：
        </text>
        <view class="text">
          <view v-for="(item, index) in phoneList" :key="index">
            {{ item }}
            <text class="copy" @click="copyText(item)">
              复制
            </text>
          </view>
        </view>
      </view>
      <view class="item">
        <text class="label">
          院校邮箱：
        </text>
        <view class="text">
          <view v-for="(item, index) in emailList" :key="index">
            {{ item }}
            <text class="copy" @click="copyText(item)">
              复制
            </text>
          </view>
        </view>
      </view>
      <view class="item">
        <text class="label">
          院校网址：
        </text>
        <view class="text">
          <view v-for="(item, index) in websiteList" :key="index">
            {{ item }}
            <text class="copy" @click="copyText(item)">
              复制
            </text>
          </view>
        </view>
      </view>
      <view class="item">
        <text class="label">
          院校网址：
        </text>
        <text class="text">
          {{ collageMain.provinceName }}
        </text>
      </view>
    </view>
  </maskLayer>
</template>

<script lang="ts" setup>
import {
  getSchoolInfo,
} from '@/api/collage';
import { useUserStore } from '@/store';
const userStore = useUserStore();
const { status } = storeToRefs(userStore)

const props = defineProps({
  schoolId: {
    type: String,
    default: '',
  },
});
const phoneList = ref<string[]>([]); // 电话列表
const emailList = ref<string[]>([]); // 邮箱列表
const websiteList = ref<string[]>([]); // 网址列表

const collageMain = ref<any>({}); // 简章内容

const copyText = (text: string) => {
  uni.setClipboardData({
    data: text,
    success() {
      uni.showToast({
        title: '复制成功',
        duration: 2000,
      });
    },
  });
};

onMounted(() => {
  getSchoolInfo({ schoolId: props.schoolId }).then((res: any) => {
    collageMain.value = res;
    if (res.schoolPhone) {
      phoneList.value = res.schoolPhone.split(',');
    }
    if (res.schoolEmail) {
      emailList.value = res.schoolEmail.split(',');
    }
    if (res.schoolSite) {
      websiteList.value = res.schoolSite.split(',');
    }
  });
});
</script>

<style scoped lang="scss">
.collage-info {
  padding: 32rpx 0;

  .title {
    font-weight: 500;
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.85);
    line-height: 48rpx;
    margin-bottom: 24rpx;
  }

  .item {
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.85);
    line-height: 44rpx;
    margin-bottom: 24rpx;
    display: flex;

    .label {
      color: rgba(0, 0, 0, 0.65);
      width: 150rpx;
      flex-shrink: 0;
    }

    .text {
      flex: 1;
      width: 400rpx;
      display: flex;
      flex-wrap: wrap;
      word-break: break-all;
    }

    .copy {
      color: #E94650;
      margin-left: 32rpx;
    }
  }
}
</style>
