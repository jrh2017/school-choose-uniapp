<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-24 13:11:56
 * @LastEditTime : 2024-08-29 13:42:50
 * @LastEditors  : jiangronghua
 * @Description  : 学校排名
-->
<template>
  <div class="school-rank">
    <view class="top">
      <view class="name">
        排名
      </view>
      <view class="title" @click="changeSort">
        {{ title }}
        <view class="sort-icons" :class="{ desc: !sort }">
          <image class="w-22rpx h-22rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/caret-up.png"
            mode="aspectFit" />
          <image class="w-22rpx h-22rpx" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/caret-down.png"
            mode="aspectFit" />
        </view>
      </view>
    </view>
    <view class="list">
      <view class="scrool-main">
        <scroll-view style="height: 100%;" scroll-y="true" :scroll-top="scrollTop" @scroll="onScroll">
          <view v-for="(item, index) in showList" :key="index" class="item">
            <view class="rank">
              {{ item.number }}
            </view>
            <view class="name">
              {{ item.schoolName }}
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '校友会',
  },
  list: {
    type: Array,
    default: () => [],
  },
});
const { title, list } = toRefs(props);
const showList = ref<any>([]); // 显示的列表
const scrollTop = ref(0);
const oldScrollTop = ref(0);
const sort = ref(true); // 排序方式,是否是正序

const onScroll = (e: any) => {
  oldScrollTop.value = e.detail.scrollTop;
};

/**
 * 实现滚动到顶部
 */
const scrollToTop = () => {
  scrollTop.value = oldScrollTop.value;
  nextTick(() => {
    scrollTop.value = 0;
  });
};

const changeSort = () => {
  sort.value = !sort.value;
  doSort()
}
const doSort = () => {
  const newList = [...list.value];
  newList.sort((a: any, b: any) => {
    if (sort.value) {
      return a.id - b.id;
    }
    else {
      return b.id - a.id;
    }
  });
  showList.value = newList;
  scrollToTop();
};

// 监听行数、列数变化
watch(
  () => props.list,
  (val) => {
    showList.value = val;
    doSort()
  },
  { immediate: true }
)

onMounted(() => {
  showList.value = list.value;
});
</script>

<style scoped lang="scss">
.school-rank {
  display: flex;
  flex-direction: column;
  height: 100%;

  .top {
    height: 80rpx;
    background-color: #F2F2F7;
    display: flex;
    align-items: center;

    .name {
      width: 110rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
      color: #828282;
      line-height: 32rpx;
      flex-shrink: 0;
    }

    .title {
      padding: 0 16rpx;
      font-weight: 500;
      font-size: 28rpx;
      color: #252525;
      line-height: 44rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .list {
    flex: 1;
    position: relative;

    .scrool-main {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
    }

    .item {
      display: flex;
      height: 80rpx;
      align-items: center;
    }

    .rank {
      width: 110rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
      color: #828282;
      line-height: 32rpx;
      flex-shrink: 0;
    }

    .name {
      padding: 0 16rpx;
      font-weight: 500;
      font-size: 28rpx;
      color: #252525;
      line-height: 44rpx;
      overflow: hidden;
      /*内容超出后隐藏*/
      text-overflow: ellipsis;
      /*超出内容显示为省略号*/
      white-space: nowrap;
      /*文本不进行换行*/
    }
  }
}

.sort-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 16rpx;
  transform: rotate(180deg);
}

.desc {
  transform: rotate(0deg);
}
</style>
