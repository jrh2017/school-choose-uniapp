<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-21 10:11:26
 * @LastEditTime : 2024-08-26 20:38:52
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
            :title="majorName"
            autoBack
          />
          <view class="search-wrapper">
            <view class="search-box">
              <up-search v-model="keyword" shape="square" bgColor="#FFFFFF" :showAction="false" height="88rpx" placeholder="请输入院校名称" @search="searchSchool()" />
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
            <view class="right">
              <up-image src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/location.png" width="22rpx" height="22rpx" />
              <text class="area">
                {{ item.provinceName }}({{ item.provinceArea }}区)
              </text>
              <up-icon name="arrow-right" :size="12" color="#000000" />
            </view>
          </view>
        </view>
      </z-paging>
      <up-picker ref="provincePickerRef" :show="provincePopup" :columns="provinces" @confirm="confirmProvince" @cancel="provincePopup = false" />
      <up-picker :show="levelPopup" :columns="levels" keyName="label" @confirm="confirmLevel" @cancel="levelPopup = false" />
    </view>
  </view>
</template>

<script setup lang="ts">
import type zPaging from 'z-paging/components/z-paging/z-paging.vue';
import type { schoolVO } from '@/api/school/types';
import {
  majorSchoolList,
  provinceList,
  schoolPage,
} from '@/api/collage';

const keyword = ref('');

const pagingRef = ref<InstanceType<typeof zPaging> | null>(null); // 实例化z-paging组件的ref
const dataList = ref<schoolVO[]>([]); // 存放请求回来的数据
const provincePopup = ref(false); // 省份筛选弹窗
const levelPopup = ref(false); // 院校层次筛选弹窗
const currentProvince = ref('省份'); // 当前选择的省份
const currentLevel = ref('院校水平'); // 当前选择的院校层次
const majorId = ref(''); // 专业id
const majorName = ref('院校库'); // 专业名称
const provincePickerRef = ref(null);

const provinces = reactive<any[]>([[]]);

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
 * 获取省份数据
 */
const getProvince = () => {
  // 省份数据
  provinceList().then((res: any) => {
    const data = res && res[0] ? res[0] : [];
    const provinceData = ['全部', ...data];
    provincePickerRef.value.setColumnValues(0, provinceData);
  });
};

/**
 * 跳转到院校详情页面
 * @param item 院校信息
 */
const toDetail = (item: schoolVO) => {
  const { id, schoolName } = item;
  console.log('[ toDetail ] >', majorId.value);
  if (majorId.value) {
    uni.navigateTo({
      url: `/pages/intention/collage/detail?level3Code=${majorId.value}&schoolId=${id}`,
    });
  }
  else {
    uni.navigateTo({
      url: `/pages/intention/major/list?id=${id}&schoolName=${schoolName}`,
    });
  }
};

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
  pagingRef.value.reload();
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
  };
  if (majorId.value) {
    params.level3Code = majorId.value;
    params.level3Name = majorName.value;
  }

  if (majorId.value) {
    majorSchoolList(params).then((res: any) => {
      pagingRef.value?.complete(res.data);
    }).catch(() => {
      pagingRef.value.complete(false);
    });
  }
  else {
    schoolPage(params).then((res: any) => {
      pagingRef.value?.complete(res.data);
    }).catch(() => {
      pagingRef.value.complete(false);
    });
  }
}

const searchSchool = () => {
  pagingRef.value.reload();
};

onLoad((options: any) => {
  if (options?.level3Code) {
    majorId.value = options.level3Code;
  }
  if (options?.level3Name) {
    majorName.value = options.level3Name;
  }
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
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 24rpx;
        height: 100rpx;
        flex-shrink: 0;
      }
      .school-name{
        width: 335rpx;
        font-weight: 500;
        font-size: 32rpx;
        color: #000000;
        line-height: 48rpx;
        overflow:hidden;/*内容超出后隐藏*/
        text-overflow:ellipsis;/*超出内容显示为省略号*/
        white-space:nowrap;/*文本不进行换行*/
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
