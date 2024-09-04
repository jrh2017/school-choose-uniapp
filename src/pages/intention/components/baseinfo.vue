<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 18:35:05
 * @LastEditTime : 2024-09-04 08:32:31
 * @LastEditors  : jiangronghua
 * @Description  :
-->
<template>
  <view class="school-info">
    <view class="top">
      <up-image class="logo" :src="`https://ypdsc.oss-cn-shanghai.aliyuncs.com/app/${majorDetail.schoolId}.jpg`"
        width="96rpx" height="96rpx" />
      <view class="right">
        <view class="school-name">
          <text>{{ majorDetail.schoolName }}</text>
          <view class="w-144rpx">
            <up-button :customStyle="customStyle" shape="circle" type="error" text="更改意向" :disabled="disabeledBtn"
              @click="showChangeIntentionModal" />
          </view>
        </view>
        <view class="tags">
          <view class="tag tag-1">
            {{ majorDetail.typeName }}
          </view>
          <view v-if="majorDetail.is985 === 1" class="tag tag-2">
            985
          </view>
          <view v-if="majorDetail.is211 === 1" class="tag tag-2">
            211
          </view>
          <view v-if="majorDetail.subjectRanking" class="tag tag-3">
            {{ majorDetail.subjectRanking }}
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="detail-item flex justify-between">
        <view class="item left">
          <view class="label">
            意向专业:
          </view>
          <text>{{ intentionInfo.level3Name }}</text>
        </view>
        <view class="item right">
          <view class="label">
            专业代码:
          </view>
          <text>{{ intentionInfo.level3Code }}</text>
        </view>
      </view>
      <view class="detail-item flex justify-between">
        <view class="item left">
          <view class="label">
            学位类型:
          </view>
          <text>{{ majorDetail.degreeType }}</text>
        </view>
        <view class="item right">
          <view class="label">
            预估分数:
          </view>
          <text>{{ intentionInfo.assessScore }}分</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { isEditable } from '@/api/userinfo'

const props = defineProps({
  intention: {
    type: Object,
    default: () => ({}),
  },
  majorDetail: {
    type: Object,
    default: () => ({}),
  }
});

const intentionInfo = ref({
  level3Name: '',
  level3Code: '',
  assessScore: 0,
});

const majorDetail = ref({
  schoolName: '',
  typeName: '',
  is985: 0,
  is211: 0,
  subjectRanking: '',
  degreeType: '',
});

watch(
  () => props.intention,
  (newVal) => {
    intentionInfo.value = newVal;
  },
  {
    immediate: true,
  }
)

watch(
  () => props.majorDetail,
  (newVal) => {
    if (newVal) {
      majorDetail.value = newVal;
    }
  },
  {
    immediate: true,
  }
)



const customStyle = {
  height: '44rpx',
  fontSize: '14rpx',
  border: 'none',
};
const disabeledBtn = ref(false);

const emit = defineEmits(['change']);

const showChangeIntentionModal = () => {
  emit('change', true);
}

onMounted(() => {
  isEditable().then((res) => {
    disabeledBtn.value = false;
  }).catch(() => {
    disabeledBtn.value = true;
  });
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
