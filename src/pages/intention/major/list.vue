<!--
 * @Author       : chenyuchao c375880854@163.com
 * @Date         : 2024-08-23 18:11:31
 * @LastEditTime : 2024-08-26 16:38:57
 * @LastEditors  : jiangronghua
 * @Description  : 专业选择列表页面
 * @Remark       :
-->

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
        <up-subsection :list="list" :current="subIndex" activeColor="#E94650" inactiveColor="#858081" bgColor="#F1E9EC" keyName="label" @change="changeMajorType" />
      </view>
      <view class="major-level-1">
        <up-scroll-list :indicator="false">
          <view v-for="(item, index) in majorData" :key="item.value" class="major-level-1-item" :class="{ active: firstIndex === index }" @click="selectFirstIndex(item, index)">
            <up-image :src="`https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/${item.iconVal}.png`" width="48rpx" height="48rpx" />
            <text class="major-level-1-item-name">
              {{ item.level1Name }}
            </text>
          </view>
        </up-scroll-list>
      </view>
      <view class="sub-major">
        <view class="major-main">
          <view class="left">
            <scroll-view style="height: 100%;" scroll-y="true">
              <view v-for="(item, index) in secondList" :key="item.value" class="major-level-2-item" :class="{ 'level-2-active': secondIndex === index }" @click="selectSecondIndex(item, index)">
                {{ item.level2Name }}-{{ item.level2Code }}
              </view>
            </scroll-view>
          </view>
          <view class="right">
            <scroll-view style="height: 100%;" scroll-y="true">
              <view v-for="(item, index) in thirdList" :key="item.value" class="major-level-3-item" :class="{ 'level-3-active': thirdIndex === index }" @click="selectThirdIndex(item, index)">
                {{ item.level3Name }}-{{ item.level3Code }}
              </view>
            </scroll-view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  level1List,
  level2List,
  level3List,
  majorLeve1List,
  majorLeve2List,
  majorLeve3List,
} from '@/api/collage';

const specialityIcon = [] as any;
const list = reactive([{
  label: '专业学位',
  value: 1,
}, {
  label: '学术学位',
  value: 2,
}]);
const currentDegreeType = ref(1); // 当前学位类型
const subIndex = ref(0); // 当前索引
const firstIndex = ref(0); // 第一级别索引
const secondIndex = ref(0); // 第二级别索引
const thirdIndex = ref(0); // 第三级别索引
const level1Code = ref(0); // 第一级code
const level2Code = ref(0); // 第二级code
const level3Code = ref(0); // 第三级code
const secondList = ref<any[]>([]); // 第二级别列表
const thirdList = ref<any[]>([]); // 第三级别列表
const majorData = ref<any>([]);
const specialityIconList = ref<any>([{
  value: '01',
  icon: 'major-zx',
}, {
  value: '02',
  icon: 'major-jjx',
}, {
  value: '03',
  icon: 'major-fx',
}, {
  value: '04',
  icon: 'major-jyx',
}, {
  value: '05',
  icon: 'major-wx',
}, {
  value: '06',
  icon: 'major-ls',
}, {
  value: '07',
  icon: 'major-lx',
}, {
  value: '08',
  icon: 'major-gx',
}, {
  value: '09',
  icon: 'major-nx',
}, {
  value: '10',
  icon: 'major-yx',
}, {
  value: '11',
  icon: 'major-js',
}, {
  value: '12',
  icon: 'major-glx',
}, {
  value: '13',
  icon: 'major-ysx',
}, {
  value: '14',
  icon: 'major-jcxk',
}]); // 专业图标列表
const pageTitle = ref('专业库');
const schoolId = ref('');
// 查询学校专业列表-3级
const getLevel3Fn = async () => {
  const params = {
    degreeType: subIndex.value + 1,
    level2Code: level2Code.value,
  };
  if (schoolId.value) {
    params.schoolId = schoolId.value;
  }
  const list = schoolId.value ? await level3List(params) : await majorLeve3List(params) as any;
  thirdList.value = list || [];
};
// 查询学校专业列表-2级
const getLevel2Fn = async () => {
  const params = {
    degreeType: currentDegreeType.value,
    level1Code: level1Code.value,
  };
  if (schoolId.value) {
    params.schoolId = schoolId.value;
  }
  const list = schoolId.value ? await level2List(params) : await majorLeve2List(params) as any;
  secondList.value = list || [];
  if (list && list.length) {
    level2Code.value = list[0].level2Code || 0;
    getLevel3Fn();
  }
};
// 查询学校专业列表-1级
const getSchoolSpecialityListFn = async () => {
  const params = {
    degreeType: currentDegreeType.value,
  };
  if (schoolId.value) {
    params.schoolId = schoolId.value;
  }
  const list = schoolId.value ? await level1List(params) : await majorLeve1List(params) as any;
  list.forEach((item: any) => {
    const index = specialityIconList.value.findIndex((icon: any) => item.level1Code === icon.value);
    if (index !== -1) {
      item.iconVal = specialityIconList.value[index].icon;
    }
  });
  level1Code.value = list[0].level1Code;
  majorData.value = list;
  getLevel2Fn();
};

/**
 * 切换一级分类以后的事件
 * @param index
 */
const selectFirstIndex = (item: any, index: number) => {
  firstIndex.value = index;
  level1Code.value = item.level1Code;
  secondIndex.value = 0;
  level2Code.value = 0;
  thirdIndex.value = 0;
  level3Code.value = 0;
  getLevel2Fn();
};

/**
 * 切换二级分类以后的事件
 */
const selectSecondIndex = (item: any, index: number) => {
  secondIndex.value = index;
  level2Code.value = item.level2Code;
  thirdIndex.value = 0;
  getLevel3Fn();
};

/**
 * 点击三级分类事件
 * @param index
 */
const selectThirdIndex = (item: any, index: number) => {
  thirdIndex.value = index;
  level3Code.value = item.level3Code;
  // 院校的专业直接跳转到院校详情
  if (schoolId.value) {
    uni.navigateTo({
      url: `/pages/intention/collage/detail?level3Code=${level3Code.value}&schoolId=${schoolId.value}`,
    });
  }
  else {
    uni.navigateTo({
      url: `/pages/intention/collage/list?level3Code=${item.level3Code}&level3Name=${item.level3Name}`,
    });
  }
};
// 专业学位和学术学位切换
const changeMajorType = (index: number) => {
  subIndex.value = index;
  firstIndex.value = 0;
  secondIndex.value = 0;
  thirdIndex.value = 0;
  getSchoolSpecialityListFn();
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
  getSchoolSpecialityListFn();
};

onLoad((options: any) => {
  if (options?.id) { // 学校库进来的
    pageTitle.value = `${options.schoolName}专业`;
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
