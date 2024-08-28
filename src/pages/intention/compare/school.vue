<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-23 16:42:34
 * @LastEditTime : 2024-08-28 09:03:46
 * @LastEditors  : jiangronghua
 * @Description  :
-->
<template>
  <view class="container">
    <view class="content">
      <z-paging ref="pagingRef" v-model="dataList" @query="queryList">
        <template #top>
          <up-navbar
            :placeholder="true"
            bg-color="#F8EFF2"
            title="添加对比"
            autoBack
          />
          <view class="search-wrapper">
            <view class="search-box">
              <up-search v-model="keyword" shape="square" bgColor="#FFFFFF" :showAction="false" height="88rpx" placeholder="请输入院校名称" />
            </view>
            <view class="condition">
              <view class="condition-item" @click="provincePopup = true">
                <text class="mr-10rpx">
                  {{ currentMajor }}
                </text>
                <up-icon name="arrow-down-fill" />
              </view>
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
          <view v-for="(item, index) in dataList" :key="index" class="school-item">
            <view class="top">
              <view class="top-left">
                <up-image :src="`https://ypdsc.oss-cn-shanghai.aliyuncs.com/app/${item.id}.jpg`" width="100rpx" height="100rpx" />
                <view class="school-info">
                  <view class="school-name">
                    <text>{{ item.schoolName }}</text>
                  </view>
                  <view class="tags">
                    <view class="tag tag-1">
                      {{ item.typeName }}
                    </view>
                    <view v-if="item.is985 === 1" class="tag tag-2">
                      985
                    </view>
                    <view v-if="item.is211 === 1" class="tag tag-2">
                      211
                    </view>
                    <view v-if="item.isZihuaxian === 1" class="tag tag-3">
                      A+
                    </view>
                  </view>
                </view>
              </view>
              <view v-if="item.joined === 1" class="btn-right selected">
                已添加
              </view>
              <view v-else class="btn-right unselected" @click="addSchool(item)">
                <up-icon name="plus-circle" color="#E94650" labelColor="#E94650" label="对比" />
              </view>
            </view>
            <view class="bottom">
              <view class="detail-item flex justify-between">
                <view class="item left">
                  <view class="label">
                    专业:
                  </view>
                  <text>{{ item.level3Name }}</text>
                </view>
                <view class="item right">
                  <view class="label">
                    学位类型:
                  </view>
                  <text>{{ item.degreeType }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </z-paging>
      <up-picker ref="provincePickerRef" :show="provincePopup" :columns="columns" keyName="label" @confirm="confirmProvince" @cancel="provincePopup = false" />
      <up-picker :show="levelPopup" :columns="levels" keyName="label" @confirm="confirmLevel" @cancel="levelPopup = false" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type zPaging from 'z-paging/components/z-paging/z-paging.vue';
import type { schoolVO } from '@/api/school/types';
import { insertSchoolMajor, listProvince, pageSchoolMajor } from '@/api/compare';

const keyword = ref('');

const pagingRef = ref<InstanceType<typeof zPaging> | null>(null); // 实例化z-paging组件的ref
const dataList = ref<any[]>([]); // 存放请求回来的数据
const provincePopup = ref(false); // 省份筛选弹窗
const levelPopup = ref(false); // 院校层次筛选弹窗
const currentMajor = ref('专业'); // 当前选择的专业
const currentProvince = ref('省份'); // 当前选择的省份
const currentLevel = ref('院校水平'); // 当前选择的院校层次
const provincePickerRef = ref(null);

const columns = reactive([[]]);

const levels = reactive([[
  {
    label: '全部',
    id: 0,
  },
  {
    label: '211',
    id: 1,
  },
  {
    label: '985',
    id: 2,
  },
  {
    label: '自划线',
    id: 3,
  },
  {
    label: '双一流',
    id: 4,
  },
  {
    label: '高等院校',
    id: 5,
  },
  {
    label: '科研院所',
    id: 6,
  },
]]);

/**
 * 省份数据选中事件
 * @param data
 */
const confirmProvince = (data: any) => {
  currentProvince.value = data.value[0];
  provincePopup.value = false;
  pagingRef.value.reload();
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
  const params = {
    length: 10,
    level: (currentLevel.value === '全部' || currentLevel.value === '院校水平') ? '' : levels[0].find(item => item.label === currentLevel.value)?.id,
    province: (currentProvince.value === '全部' || currentProvince.value === '省份') ? '' : currentProvince.value,
    schoolName: keyword.value,
    start: (pageNo - 1) * 10,
    level3Code: '025100',
    level3Name: '金融',
  };
  pageSchoolMajor(params).then((res: any) => {
    pagingRef.value?.complete(res.data);
  }).catch(() => {
    pagingRef.value.complete(false);
  });
}

/**
 * 添加学校并返回
 */
const addSchool = (item: schoolVO) => {
  insertSchoolMajor(item).then(() => {
    uni.navigateBack();
  });
  // uni.navigateBack({
  //   success: () => {
  //     uni.setStorageSync('intention', {
  //       ...uni.getStorageSync('intention'),
  //       school: item,
  //     }); // 保存选择的院校信息 到本地缓存
  //     uni.showToast({
  //       title: '添加成功',
  //       icon: 'none',
  //       duration: 1000,
  //     });
  //   },
  // });
};

/**
 * 获取省份数据
 */
const getProvince = () => {
  // 省份数据
  listProvince().then((res: any) => {
    const data = res && res[0] ? res[0] : [];
    const provinceData = ['全部', ...data];
    provincePickerRef.value.setColumnValues(0, provinceData);
  });
};

onLoad(() => {
  getProvince();
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
    width: 220rpx;
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
      .tag-3 {
        color: #0EAEB4;
        background-color: #E0F8F5;
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
