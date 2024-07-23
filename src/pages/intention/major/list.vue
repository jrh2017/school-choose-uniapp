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
      <view class="major-level-1">
        <up-scroll-list :indicator="false">
          <view v-for="(item, index) in majorData" :key="item.value" class="major-level-1-item" :class="{ active: firstIndex === index }" @click="selectFirstIndex(index)">
            <up-image :src="`https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/${item.icon}.png`" width="48rpx" height="48rpx" />
            <text class="major-level-1-item-name">
              {{ item.label }}
            </text>
          </view>
        </up-scroll-list>
      </view>
      <view class="sub-major">
        <view class="major-main">
          <view class="left">
            <scroll-view style="height: 100%;" scroll-y="true">
              <view v-for="(item, index) in secondList" :key="item.value" class="major-level-2-item" :class="{ 'level-2-active': secondIndex === index }" @click="selectSecondIndex(index)">
                {{ item.label }}-{{ item.value }}
              </view>
            </scroll-view>
          </view>
          <view class="right">
            <scroll-view style="height: 100%;" scroll-y="true">
              <view v-for="(item, index) in thirdList" :key="item.value" class="major-level-3-item" :class="{ 'level-3-active': thirdIndex === index }" @click="selectThirdIndex(index)">
                {{ item.label }}-{{ item.value }}
              </view>
            </scroll-view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import MajorList from '@/mock/major-list.json';

const list = reactive(['专业学位', '学术学位']);
const subIndex = ref(0); // 当前索引
const firstIndex = ref(0); // 第一级别索引
const secondIndex = ref(0); // 第二级别索引
const thirdIndex = ref(0); // 第三级别索引
const secondList = ref<any[]>([]); // 第二级别列表
const thirdList = ref<any[]>([]); // 第三级别列表
const majorData = ref<any>(MajorList);
const pageTitle = ref('专业库');
const schoolId = ref('');

/**
 * 更新视图数据
 */
const setListView = (firstIndex: number, secondIndex: number) => {
  secondList.value = majorData.value[firstIndex].children;
  console.log(secondList.value);
  thirdList.value = majorData.value[firstIndex].children[secondIndex].children;
};

/**
 * 切换一级分类以后的事件
 * @param index
 */
const selectFirstIndex = (index: number) => {
  firstIndex.value = index;
  secondIndex.value = 0;
  thirdIndex.value = 0;
  setListView(firstIndex.value, 0);
};

/**
 * 切换二级分类以后的事件
 */
const selectSecondIndex = (index: number) => {
  secondIndex.value = index;
  thirdIndex.value = 0;
  setListView(firstIndex.value, secondIndex.value);
};

/**
 * 点击三级分类事件
 * @param index
 */
const selectThirdIndex = (index: number) => {
  thirdIndex.value = index;
  const id = thirdList.value[index].value;
  // 院校的专业直接跳转到院校详情
  if (schoolId.value) {
    uni.navigateTo({
      url: `/pages/intention/collage/detail?id=${id}`,
    });
  }
  else {
    uni.navigateTo({
      url: `/pages/intention/collage/list?id=${id}`,
    });
  }
};

/**
 * 设置默认的层级
 * @param first
 * @param second
 * @param third
 */
const setDefaultView = (first: number, second: number, third: number) => {
  firstIndex.value = first;
  secondIndex.value = second;
  thirdIndex.value = third;
  setListView(first, second);
};

onLoad((options: any) => {
  if (options?.id) {
    pageTitle.value = '浙江工商大学专业';
    schoolId.value = options.id;
    setDefaultView(0, 0, 0);
  }
  else {
    pageTitle.value = '专业库';
    setDefaultView(0, 0, 0);
  }
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #FFFFFF 50%);
  display: flex;
  flex-direction: column;
}
.content {
  box-sizing: border-box;
  flex:1;
  display: flex;
  flex-direction: column;
  .sub-major {
    flex: 1;
    position: relative;
    .major-main {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      display: flex;
      width: 100%;
    }
    .left {
      width: 276rpx;
      background: #F6F5F8;
    }
    .right {
      flex: 1 1 auto;
      background: #FFFFFF;
    }
    .major-level-2-item {
      padding: 32rpx;
      font-size: 28rpx;
      color: rgba(0,0,0,0.65);
      line-height: 44rpx;
    }
    .level-2-active {
      background: #ffffff;
      color: #E94650;
    }
    .major-level-3-item {
      padding: 32rpx;
      font-size: 28rpx;
      color: rgba(0,0,0,0.65);
      line-height: 44rpx;
    }
    .level-3-active {
      background: #ffffff;
      color: #E94650;
    }
  }
}
.major-level-1 {
  padding: 0 32rpx;
  .major-level-1-item {
    margin-right: 16rpx;
    flex-shrink: 0;
    width: 116rpx;
    height: 144rpx;
    background: linear-gradient( 180deg, #F8EFF2 0%, #FFFFFF 100%);
    box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(12,12,13,0.05);
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    border: 2rpx solid rgba(246,245,248,0.65);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    .major-level-1-item-name {
      margin-top: 10rpx;
      font-weight: 500;
      font-size: 28rpx;
      color: rgba(0,0,0,0.85);
      line-height: 44rpx;
    }
  }
  .active {
    border: 3rpx solid #F5ACB0;
    .major-level-1-item-name {
      color: #E94650;
    }
  }
}
</style>
