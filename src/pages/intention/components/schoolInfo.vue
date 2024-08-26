<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 18:35:05
 * @LastEditTime : 2024-08-26 15:19:43
 * @LastEditors  : jiangronghua
 * @Description  :
-->
<template>
  <view class="school-info">
    <view class="top">
      <up-image class="logo" :src="schoolInfo.logo" width="96rpx" height="96rpx" />
      <view class="right">
        <view class="school-name">
          <text>{{ schoolInfo.schoolName }}</text>
          <up-image class="edit-icon" :src="schoolInfo.star ? star : unstar" width="40rpx" height="40rpx" @click="schoolInfo.star = !schoolInfo.star" />
        </view>
        <view class="tags">
          <view class="tag tag-1">
            {{ schoolInfo.typeName }}
          </view>
          <view v-for="(tag, index) in schoolInfo.tag2" :key="index" class="tag tag-2">
            {{ tag }}
          </view>
          <view v-if="schoolInfo.is985 === 1" class="tag tag-2">
            985
          </view>
          <view v-if="schoolInfo.is211 === 1" class="tag tag-2">
            211
          </view>
          <view v-if="schoolInfo.isZihuaxian === 1" class="tag tag-3">
            A+
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="detail-item flex justify-between">
        <view class="item left">
          <view class="label">
            专业:
          </view>
          <text>{{ schoolInfo.level3Name }}({{ schoolInfo.level3Code }})</text>
        </view>
        <view class="item right">
          <view class="label">
            学位类型:
          </view>
          <text>{{ schoolInfo.degreeType }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  magorDetail: {
    type: Object,
    default: () => ({}),
  },
});

const data = reactive({
  schoolInfo: {
    schoolName: '',
    logo: '',
    typeName: '',
    tag2: [],
    tag3: '',
    is985: 0,
    is211: 0,
    level3Name: '',
    level3Code: '',
    degreeType: '',
    isZihuaxian: 1,
    star: true,
  },
});
const { schoolInfo } = toRefs(data);
const star = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/star.png');
const unstar = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/unstar.png');
const { magorDetail } = toRefs(props);
watchEffect(() => {
  schoolInfo.value = magorDetail.value;
});
</script>

<style lang="scss" scoped>
.school-info {
  padding: 32rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      flex-shrink: 0;
    }
    .right {
      flex: 1;
      margin-left: 24rpx;
      height: 96rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .school-name {
      display: flex;
      justify-content: space-between;
    }
    .tags {
      display: flex;
    }
    .tag {
      padding: 4rpx 8rpx;
      border-radius: 4rpx;
      font-size: 20rpx;
      margin-right: 16rpx;
    }
    .tag-1 {
      color: #E94650;
      background-color: #FFECEB;
    }
    .tag-2 {
      color: #4D59FF;
      background-color: #EBEFFF;
    }
    .tag-3 {
      color: #0EAEB4;
      background-color: #E0F8F5;
    }
  }
  .bottom {
    margin-top: 24rpx;
    background-color: #F9F9FA;
    border-radius: 8rpx;
    padding: 16rpx 24rpx;
    font-size: 24rpx;
    line-height: 36rpx;
  }
  .detail-item {
    margin: 4rpx 0;
    .left {
      flex: 6;
      flex-shrink: 0;
    }
    .right {
      flex: 4;
      flex-shrink: 0;
    }
    .item {
      display: flex;
    }
    .label {
      color: #898989;
      margin-right: 10rpx;
    }
  }
}
</style>
