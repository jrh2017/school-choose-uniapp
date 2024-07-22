<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-21 10:11:26
 * @LastEditTime : 2024-07-22 20:03:25
 * @LastEditors  : jiangronghua
 * @Description  : 院校库页面
-->
<template>
  <view class="container">
    <view class="content">
      <z-paging ref="pagingRef" v-model="dataList" @query="queryList">
        <template #top>
          <up-navbar
            :placeholder="true"
            bg-color="#F8EFF2"
            title="院校库"
            autoBack
          />
          <view class="search-wrapper">
            <view class="search-box">
              <up-search v-model="keyword" shape="square" bgColor="#FFFFFF" :showAction="false" height="88rpx" placeholder="请输入院校名称" />
            </view>
            <view class="condition">
              <view class="condition-item" @click="provincePopup = true">
                <text class="mr-10rpx">
                  {{ currentProvince }}
                </text>
                <up-icon name="arrow-down-fill" />
              </view>
              <view class="condition-item" @click="levelPopup = true">
                <text class="mr-10rpx">
                  {{ currentLevel }}
                </text>
                <up-icon name="arrow-down-fill" />
              </view>
            </view>
          </view>
        </template>
        <view class="list-wrapper">
          <view v-for="(item, index) in dataList" :key="index" class="school-item" @click="toDetail(item)">
            <view class="left">
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
            <view class="right">
              <up-image src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/location.png" width="22rpx" height="22rpx" />
              <text class="area">
                {{ item.area }}({{ item.type }})
              </text>
              <up-icon name="arrow-right" :size="12" color="#000000" />
            </view>
          </view>
        </view>
      </z-paging>
      <up-picker :show="provincePopup" :columns="columns" keyName="label" @confirm="confirmProvince" @cancel="provincePopup = false" />
      <up-picker :show="levelPopup" :columns="levels" keyName="label" @confirm="confirmLevel" @cancel="levelPopup = false" />
    </view>
  </view>
</template>

<script setup lang="ts">
import type zPaging from 'z-paging/components/z-paging/z-paging.vue';
import type { schoolVO } from '@/api/school/types';

const keyword = ref('');

const pagingRef = ref<InstanceType<typeof zPaging> | null>(null); // 实例化z-paging组件的ref
const dataList = ref<schoolVO[]>([]); // 存放请求回来的数据
const provincePopup = ref(false); // 省份筛选弹窗
const levelPopup = ref(false); // 院校层次筛选弹窗
const currentProvince = ref('省份'); // 当前选择的省份
const currentLevel = ref('院校水平'); // 当前选择的院校层次
const majorId = ref(''); // 专业id

const columns = reactive([[
  {
    label: '北京市',
    id: 1,
  },
  {
    label: '上海市',
    id: 2,
  },
  {
    label: '广东省',
    id: 3,
  },
  {
    label: '河南省',
    id: 4,
  },
  {
    label: '湖北省',
    id: 5,
  },
]]);

const levels = reactive([[
  {
    label: '985',
    id: 1,
  },
  {
    label: '211',
    id: 2,
  },
  {
    label: '普通高校',
    id: 3,
  },
]]);

const school: schoolVO = {
  name: '浙江工商大学',
  logo: 'https://static.kaoyan.cn/image/logo/470_log.jpg',
  tag1: '综合类',
  tag2: ['985', '211'],
  area: '浙江',
  type: 'A区',
  id: 1,
};

/**
 * 跳转到院校详情页面
 * @param item 院校信息
 */
const toDetail = (item: schoolVO) => {
  const { id } = item;
  console.log('[ toDetail ] >', majorId.value);
  if (majorId.value) {
    uni.navigateTo({
      url: `/pages/intention/collage/detail?id=${id}`,
    });
  }
  else {
    uni.navigateTo({
      url: `/pages/intention/major/list?id=${id}`,
    });
  }
};

/**
 * 省份数据选中事件
 * @param data
 */
const confirmProvince = (data: any) => {
  currentProvince.value = data.value[0].label;
  provincePopup.value = false;
  queryList(1, 10);
};

/**
 * 学校水平选中确认事件
 * @param data
 */
const confirmLevel = (data: any) => {
  currentLevel.value = data.value[0].label;
  levelPopup.value = false;
  queryList(1, 10);
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
    for (let i = 0; i < 30; i++)
      list.push(school);

    pagingRef.value?.complete(list);
  }, 1000);
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
  .search-wrapper {
    padding: 32rpx 32rpx 0 32rpx;
  }
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
.list-wrapper {
  padding: 0 32rpx;
  .school-item {
    padding: 32rpx;
    border-radius: 16rpx;
    background: #FFFFFF;
    margin-bottom: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
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
    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #8C8C8C;
      font-size: 20rpx;
      flex-shrink: 0;
    }
    .area {
      margin-left: 8rpx;
      margin-right: 26rpx;
    }
  }
}
</style>
