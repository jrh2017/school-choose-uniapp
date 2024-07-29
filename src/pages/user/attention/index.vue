<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-25 10:40:19
 * @LastEditTime : 2024-07-25 15:06:24
 * @LastEditors  : jiangronghua
 * @Description  : 关注页面
-->
<template>
  <view class="container">
    <view class="content">
      <z-paging ref="pagingRef" v-model="dataList" @query="queryList">
        <template #top>
          <up-navbar
            :placeholder="true"
            bg-color="#F8EFF2"
            title="关注院校"
            autoBack
          />
        </template>
        <view class="list-wrapper">
          <view v-for="(item, index) in dataList" :key="index" class="school-item">
            <view class="top">
              <view class="top-left">
                <up-image :src="item.logo" width="100rpx" height="100rpx" />
                <view class="school-info">
                  <view class="school-name">
                    <text>{{ item.name }}</text>
                  </view>
                  <view class="tags">
                    <view class="tag tag-1">
                      {{ item.tag1 }}
                    </view>
                    <view v-for="(tag, tindex) in item.tag2" :key="tindex" class="tag tag-2">
                      {{ tag }}
                    </view>
                  </view>
                </view>
              </view>
              <up-image class="edit-icon" :src="item.star ? star : unstar" width="40rpx" height="40rpx" @click="item.star = !item.star" />
            </view>
            <view class="bottom">
              <view class="detail-item flex justify-between">
                <view class="item left">
                  <view class="label">
                    专业:
                  </view>
                  <text>{{ item.major }}({{ item.magorCode }})</text>
                </view>
                <view class="item right">
                  <view class="label">
                    学位类型:
                  </view>
                  <text>{{ item.type }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type zPaging from 'z-paging/components/z-paging/z-paging.vue';
import { deepClone } from 'uview-plus';

const pagingRef = ref<InstanceType<typeof zPaging> | null>(null); // 实例化z-paging组件的ref
const dataList = ref<any[]>([]); // 存放请求回来的数据
const majorId = ref(''); // 专业id
const star = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/star.png');
const unstar = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/unstar.png');
const school = {
  name: '浙江工商大学',
  logo: 'https://static.kaoyan.cn/image/logo/470_log.jpg',
  tag1: '综合类',
  tag2: ['985', '211'],
  area: '浙江',
  major: '应用心理',
  type: '学术学位',
  magorCode: '01010101',
  star: false,
  id: 1,
};

/**
 * 请求院校信息
 * @param pageNo
 * @param pageSize
 */
function queryList(pageNo: number, pageSize: number) {
  console.log('[ pageNo ] >', pageNo, '[ pageSize ] >', pageSize);
  // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
  // 这里的请求只是演示，请替换成自己的项目的网络请求，并在网络请求回调中通过pagingRef.value.complete(请求回来的数组)将请求结果传给z-paging
  setTimeout(() => {
    // 1秒之后停止刷新动画
    const list = [];
    for (let i = 0; i < 30; i++) {
      const copy = deepClone(school);
      copy.id = i + 1;
      list.push(copy);
    }
    console.log('[ list ] >', list);
    pagingRef.value?.complete(list);
  }, 200);
}

onLoad((options: any) => {
  if (options?.id) {
    majorId.value = options.id;
  }
});
</script>

<style scoped lang="scss">
.container {
  flex: 1;
}
.content {
  min-height: 1000rpx;
  box-sizing: border-box;
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
}
.list-wrapper {
  padding: 0 32rpx;
  .school-item {
    padding: 32rpx;
    border-radius: 16rpx;
    background: #FFFFFF;
    margin-bottom: 24rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      ::v-deep .u-iconfont {
        color: #E94650 !important;
      }
      .top-left {
        display: flex;
      }
      .btn-right {
        padding: 12rpx 16rpx;
        border-radius: 8rpx;
        font-weight: 600;
        font-size: 24rpx;
        color: rgba(0,0,0,0.25);
      }
      .selected {
        background: #F2F2F7;
      }
      .unselected {
        background: rgba(252,227,229,0.4);
      }
      .school-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 24rpx;
        height: 100rpx;
      }
      .school-name{
        font-weight: 500;
        font-size: 32rpx;
        color: #000000;
        line-height: 48rpx;
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
    }
    .bottom {
      margin-top: 24rpx;
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
}
</style>
