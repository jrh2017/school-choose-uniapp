<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 17:56:35
 * @LastEditTime : 2024-08-29 10:09:09
 * @LastEditors  : jiangronghua
 * @Description  : 学校排行榜
-->
<template>
  <view class="container">
    <up-navbar :placeholder="true" bg-color="#F8EFF2" title="大学排名" autoBack />
    <view class="content">
      <view class="search-wrapper">
        <view class="search-box">
          <up-search v-model="keyword" shape="square" bgColor="#FFFFFF" :showAction="false" height="88rpx"
            placeholder="请输入院校名称" @change="filterSchool" />
        </view>
      </view>
      <view class="condition-wrapper">
        <view class="subsection">
          <up-subsection :list="list" :current="currentIndex" mode="subsection" activeColor="#e94650"
            @change="sectionChange" />
        </view>
        <view v-if="currentIndex == 0" class="table-box">
          <view class="left">
            <SchoolRank :list="shoolList" title="校友会" />
          </view>
          <view class="right">
            <SchoolRank :list="softList" title="软科" />
          </view>
        </view>
        <view v-else class="table-box">
          <view class="left">
            <SchoolRank :list="qsList1" title="QS-中国" />
          </view>
          <view class="right">
            <SchoolRank :list="qsList2" title="QS-世界" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { schoolRanking } from '@/api/collage';
import { groupBy } from 'lodash-es';
import SchoolRank from '../components/schoolRank.vue';

const list = ref(['中国排名', '世界排名']); // subsection分段
const currentIndex = ref(0); // 当前选择的分段
const shoolList = ref<any>([]); // 院校列表(校友会)
const softList = ref<any>([]); // 院校列表(软科)
const qsList1 = ref<any>([]); // 院校列表(QS)
const qsList2 = ref<any>([]); // 院校列表(QS-ALL)
const schoolListAll = ref<any>([]); // 用于存储所有院校列表
const filterList = ref<any>([]); // 用于存储筛选后的院校列表
const keyword = ref(''); // 搜索关键字

function sectionChange(index: number) {
  currentIndex.value = index;
}

/**
 * 执行院校筛选操作
 */
const filterSchool = () => {
  filterList.value = schoolListAll.value.filter((item: any) =>
    item.schoolName.includes(keyword.value)
  );
  const schoolGroup = groupBy(filterList.value, 'rankingType');
  shoolList.value = schoolGroup['xiaoyouhui'];
  softList.value = schoolGroup['ruanke'];
  qsList1.value = schoolGroup['qs-china'];
  qsList2.value = schoolGroup['qs-all'];
};

/**
 * 获取大学院校排名
 */
const getRankingList = async () => {
  const response: Array<any> = await schoolRanking() as unknown as Array<any>;
  response?.map(item => {
    item.number = Number(item.number)
  })
  schoolListAll.value = response
  filterSchool()
};

onLoad(() => {
  getRankingList();
});
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  box-sizing: border-box;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
  flex: 1;
  display: flex;
  flex-direction: column;

  .search-wrapper {
    padding: 24rpx 32rpx;
  }

  .condition-wrapper {
    flex: 1;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;

    .subsection {
      padding: 32rpx;
    }
  }

  .table-box {
    background-color: #ffffff;
    display: flex;
    flex: 1;

    .left {
      flex: 1;
      flex-shrink: 1;
      border-right: 1px solid #F2F2F7;
    }

    .right {
      flex: 1;
      flex-shrink: 1;
    }
  }
}
</style>
