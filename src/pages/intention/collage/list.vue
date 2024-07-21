<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-21 10:11:26
 * @LastEditTime : 2024-07-21 10:43:57
 * @LastEditors  : jiangronghua
 * @Description  : 院校库页面
-->
<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title="院校库"
      autoBack
    />
    <view class="content">
      <up-sticky>
        <view class="search-box">
          <up-search v-model="keyword" shape="square" bgColor="#FFFFFF" :showAction="false" height="88rpx" placeholder="请输入院校名称" />
        </view>
        <view class="condition">
          <view class="condition-item">
            <text class="mr-10rpx">
              省份
            </text>
            <up-icon name="arrow-down-fill" />
          </view>
          <view class="condition-item">
            <text class="mr-10rpx">
              院校水平
            </text>
            <up-icon name="arrow-down-fill" />
          </view>
        </view>
      </up-sticky>
      <view class="page-content">
        <z-paging ref="pagingRef" v-model="dataList" @query="queryList">
          <view v-for="(item, index) in dataList" :key="index">
            <u-cell :title="`列表长度-${index + 1}`">
              <template #icon>
                <u-avatar
                  shape="square"
                  size="35"
                  :src="item"
                  custom-style="margin: -3px 5px -3px 0"
                />
              </template>
            </u-cell>
          </view>
        </z-paging>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type zPaging from 'z-paging/components/z-paging/z-paging.vue';

const keyword = ref('');

const pagingRef = ref<InstanceType<typeof zPaging> | null>(null);
const dataList = ref<string[]>([]);

const urls: string[] = [
  'https://cdn.uviewui.com/uview/album/1.jpg',
  'https://cdn.uviewui.com/uview/album/2.jpg',
  'https://cdn.uviewui.com/uview/album/3.jpg',
  'https://cdn.uviewui.com/uview/album/4.jpg',
  'https://cdn.uviewui.com/uview/album/5.jpg',
  'https://cdn.uviewui.com/uview/album/6.jpg',
  'https://cdn.uviewui.com/uview/album/7.jpg',
  'https://cdn.uviewui.com/uview/album/8.jpg',
  'https://cdn.uviewui.com/uview/album/9.jpg',
  'https://cdn.uviewui.com/uview/album/10.jpg',
];

function queryList(pageNo: number, pageSize: number) {
  console.log('[ pageNo ] >', pageNo);
  console.log('[ pageSize ] >', pageSize);
  // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
  // 这里的请求只是演示，请替换成自己的项目的网络请求，并在网络请求回调中通过pagingRef.value.complete(请求回来的数组)将请求结果传给z-paging
  setTimeout(() => {
    // 1秒之后停止刷新动画
    const list = [];
    for (let i = 0; i < 30; i++)
      list.push(urls[uni.$u.random(0, urls.length - 1)]);

    pagingRef.value?.complete(list);
  }, 1000);
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #FFFFFF 100%);
  flex: 1;
}
.content {
  min-height: 1000rpx;
  box-sizing: border-box;
  padding: 32rpx;
  .condition {
    margin: 24rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .condition-item {
    width: 327rpx;
    height: 60rpx;
    border-radius: 8rpx;
    background: #E8E1E4;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 28rpx;
    color: #232222;
    line-height: 44rpx;
  }
}
</style>
