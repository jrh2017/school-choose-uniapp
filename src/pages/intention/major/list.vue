<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      :title="pageTitle"
      autoBack
    />
    <view class="content">
      <view class="p-32rpx">
        <up-subsection :list="list" :current="subIndex" activeColor="#E94650" inactiveColor="#858081" bgColor="#F1E9EC" />
      </view>
      <view class="major-level-1 pl-32rpx">
        <up-scroll-list :indicator="false">
          <view v-for="item in majorData" :key="item.id" class="major-level-1-item">
            <up-image :src="`https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/${item.icon}.png`" width="48rpx" height="48rpx" />
            <text>{{ item.name }}</text>
          </view>
        </up-scroll-list>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import MajorList from '@/mock/major-list.json';

const list = reactive(['专业学位', '学术学位']);
const subIndex = ref(0); // 当前索引

const majorData = ref<any>(MajorList);

const pageTitle = ref('专业库');

onLoad((options: any) => {
  if (options?.id) {
    pageTitle.value = '浙江工商大学专业';
  }
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #FFFFFF 100%);
  flex: 1;
}
.content {
  box-sizing: border-box;
}
.major-level-1 {
  .major-level-1-item {
    margin-right: 16rpx;
    flex-shrink: 0;
    width: 116rpx;
    height: 144rpx;
    background: linear-gradient( 180deg, #F8EFF2 0%, #FFFFFF 100%);
    box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(12,12,13,0.05);
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    border: 2rpx solid rgba(246,245,248,0.65);
  }
}
</style>
