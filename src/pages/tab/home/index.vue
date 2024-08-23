<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title="研攀登"
      left-icon=""
    />
    <view class="content w-100% flex flex-col items-start justify-start">
      <view v-if="showConfig" class="description">
        <view class="btn-wrapper">
          <up-button
            text="立即配置获取报告"
            :custom-style="{
              width: '590rpx',
              height: '108rpx',
              color: '#FFFFFF',
              fontSize: '36rpx',
              background: 'linear-gradient( 89deg, #FF7F87 0%, #E94650 52%, #FE727A 100%)',
              boxShadow: 'inset 0 2 2 0 rgba(255,255,255,0.6), 0 8 20 0 rgba(109,86,88,0.2)',
              borderRadius: '54rpx 54rpx',
              border: '2rpx solid rgba(250,166,167,0.8)',
            }"
            @click="show = true"
          />
        </view>
      </view>
      <view v-else class="echart-container" @click="toSchoolLibrary">
        <view class="title mb-10rpx">
          24届专业录取排名 <up-icon name="arrow-right" size="10" style="margin-left: 40rpx;" />
        </view>
        <qiun-data-charts type="area" :opts="opts" :chart-data="chart" />
      </view>
      <view class="w-100%">
        <QuickStart />
      </view>
      <view class="news mt-40rpx flex items-center justify-between" @click="toSchoolRank">
        <view class="left flex items-center">
          <view class="tag">
            最新版
          </view>
          <view class="name flex">
            大学排名 <up-icon name="arrow-right" size="10" style="margin-left: 40rpx;" />
          </view>
        </view>
        <text class="right">
          全国大学完整榜单
        </text>
      </view>
      <view class="steps-wrapper mt-40rpx w-100%">
        <steps />
      </view>
    </view>
  </view>
  <up-modal
    :show="show"
    title="我的意向"
    :show-cancel-button="true"
    confirm-color="#FE6567"
    @cancel="show = false"
    @confirm="confirmModal"
  >
    <view class="slot-content">
      <up-form
        ref="uFormRef"
        :model="form"
        :rules="rules"
        label-width="150rpx"
        :border-bottom="true"
      >
        <view class="item-wrapper">
          <up-form-item
            label="意向院校:"
            prop="school"
            required
            @click="showSchool = true;"
          >
            <up-input v-model="form.school" placeholder="请选择意向院校" border="none" disabled disabledColor="#ffffff" />
            <template #right>
              <up-icon
                name="arrow-down"
              />
            </template>
          </up-form-item>
        </view>
        <view class="item-wrapper mt-20rpx">
          <up-form-item
            label="意向专业:"
            prop="major"
            required
            @click="openMajorModal"
          >
            <up-input v-model="form.major" placeholder="请选择意向专业" border="none" disabled disabledColor="#ffffff" />
            <template #right>
              <up-icon
                name="arrow-down"
              />
            </template>
          </up-form-item>
        </view>
        <view class="item-wrapper mt-20rpx">
          <up-form-item label="预估分数:" prop="score" required>
            <up-input v-model="form.score" type="number" placeholder="请选输入预估分数">
              <template #suffix>
                <text>分</text>
              </template>
            </up-input>
          </up-form-item>
        </view>
      </up-form>
    </view>
  </up-modal>
  <up-popup :show="showSchool" closeable :safeAreaInsetBottom="false" @close="showSchool = false">
    <view class="schools-popup h-600rpx">
      <view class="search-wrapper">
        <up-search v-model="keyword" placeholder="请输入学校名称" :show-action="false" @search="getSchoolList" />
      </view>
      <view class="schools-wrapper">
        <view v-if="schoolList.length > 0" class="scrool-main">
          <scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="loadmore">
            <view v-for="(item, index) in schoolList" :key="index" class="school-item" @click="setSelectSchool(item)">
              {{ item.schoolName }}
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </up-popup>
  <up-popup :show="showMajor" closeable :safeAreaInsetBottom="false" @close="showMajor = false">
    <view class="major-popup h-700rpx">
      <view class="subsection mt-80rpx">
        <up-subsection :list="list" mode="subsection" :current="currentSubIndex" activeColor="#e94650" @change="changeMajorType" />
      </view>
      <view class="major-wrapper">
        <view class="major-main">
          <view class="level1">
            <scroll-view style="height: 100%;" scroll-y="true">
              <view v-for="(item, index) in (searchMajorList[0] || [])" :key="index" class="major-item" :class="{ active: selectMajorObj.level1Code === item.level1Code }" @click="setSelectMajorLevel1(item)">
                {{ item.level1Name }}({{ item.level1Code }})
              </view>
            </scroll-view>
          </view>
          <view class="level2">
            <scroll-view style="height: 100%;" scroll-y="true">
              <view v-for="(item, index) in (searchMajorList[1] || [])" :key="index" class="major-item" :class="{ active: selectMajorObj.level2Code === item.level2Code }" @click="setSelectMajorLevel2(item)">
                {{ item.level2Name }}({{ item.level2Code }})
              </view>
            </scroll-view>
          </view>
          <view class="level3">
            <scroll-view style="height: 100%;" scroll-y="true">
              <view v-for="(item, index) in (searchMajorList[2] || [])" :key="index" class="major-item" :class="{ active: selectMajorObj.level3Code === item.level3Code }" @click="setSelectMajorLevel3(item)">
                {{ item.level3Name }}({{ item.level3Code }})
              </view>
            </scroll-view>
          </view>
        </view>
      </view>
    </view>
  </up-popup>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import QuickStart from './components/quick-start.vue';
import steps from './components/steps.vue';
import {
  chartIntention,
  intentionInformationListlevel1,
  intentionInformationListlevel2,
  intentionInformationListlevel3,
  intentionInformationSubmit,
  pageSchool,
} from '@/api/userinfo';

const chart = ref();
const showConfig = ref(false); // 是否显示配置面板
const show = ref(false); // 是否显示模态框
const showSchool = ref(false); // 是否显示院校选择弹窗
const showMajor = ref(false); // 是否显示专业选择弹窗
const list = reactive(['专业学位', '学术学位']); // 专业列表
const currentSubIndex = ref(0); // 当前选择的子项
const selectSchool = ref({
  id: null,
  schoolName: null,
}); // 选择的院校
const searchMajorList = ref<any>([]);
const selectMajorObj = reactive({
  level1Code: null,
  level1Name: null,
  level2Code: null,
  level2Name: null,
  level3Code: null,
  level3Name: null,
});
const showSelectMajor = ref({});
const rules = reactive({
  school: [
    { required: true, message: '请选择院校', trigger: 'change' },
  ],
  major: [
    { required: true, message: '请选择专业', trigger: 'change' },
  ],
  score: [
    { required: true, message: '请填写预估分数', trigger: 'blur' },
  ],
});
const form = ref({
  school: '',
  major: '',
  score: null,
});
const chartData = reactive({
  categories: ['2018', '2019', '2020', '2021', '2022', '202'],
  series: [
    {
      name: '成交量A',
      data: [35, 8, 25, 37, 4, 20],
    },
  ],
});
const opts = reactive({
  color: ['#FF9D9D'],
  padding: [15, 40, 20, 0],
  enableScroll: false,
  legend: {
    show: false,
  },
  dataLabel: false,
  dataPointShape: false,
  xAxis: {
    disableGrid: true,
    boundaryGap: 'justify',
    labelCount: 2,
    title: '分数',
    titleOffsetX: 15,
  },
  yAxis: {
    disableGrid: true,
    gridType: 'dash',
    splitNumber: 1,
    dashLength: 2,
    showTitle: true,
    data: [{
      title: '录取人数',
      calibration: false,
      titleOffsetX: 5,
    }],
  },
  extra: {
    area: {
      type: 'curve',
      opacity: 0.9,
      addLine: true,
      width: 2,
      gradient: true,
      activeType: 'hollow',
    },
  },
});

/**
 * 获取图表信息
 */
const getChatData = () => {
  // chartIntention().then((res: any) => {
  //   chart.value = chartData;
  // }).catch(() => {
  //   // 没有配置的情况下显示输入配置的按钮
  //   showConfig.value = true;
  // });
  showConfig.value = true;
};

const toSchoolLibrary = () => {
  uni.navigateTo({
    url: '/pages/intention/detail/index',
  });
};

/**
 * 跳转到学校排名
 */
const toSchoolRank = () => {
  uni.navigateTo({
    url: '/pages/intention/rank/index',
  });
};

// 表单引用
const uFormRef = ref<any>({});
const confirmModal = () => {
  uFormRef!.value.validate().then((valid: any) => {
    if (valid) {
      const params = {
        assessScore: Number(form.value.score),
        schoolId: selectSchool.value.id,
        schoolName: selectSchool.value.schoolName,
        level3Code: selectMajorObj.level3Code,
        level3Name: selectMajorObj.level3Name,
      };
      intentionInformationSubmit(params).then(() => {
        uni.$u.toast('提交成功');
        show.value = false;
        showConfig.value = true;
        setTimeout(() => {
          getChatData();
        }, 1000);
      }).catch(() => {
        uni.$u.toast('提交失败');
      });
    }
    else {
      uni.$u.toast('请填写正确的信息');
    }
  }).catch(() => {
    uni.showToast({
      title: '请正确填写信息',
      icon: 'none',
    });
  });
};

const keyword = ref(''); // 搜索关键字
const schoolList = ref<any>([]); // 查询到学校列表
const schoolPage = ref(1); // 学校列表页码
const schoolTotal = ref(0); // 学校列表总数

const querySchoolList = () => {
  uni.showLoading({
    title: '加载中',
  });
  const params = {
    length: 10,
    schoolName: keyword.value,
    start: (schoolPage.value - 1) * 10,
  };
  pageSchool(params).then((res: any) => {
    schoolList.value = [...schoolList.value, ...res.data];
    schoolTotal.value = res.recordsTotal;
  }).finally(() => {
    uni.hideLoading();
  });
};

const getSchoolList = () => {
  schoolList.value = [];
  querySchoolList();
  schoolPage.value = 1;
};

const loadmore = () => {
  if (schoolList.value.length < schoolTotal.value) {
    schoolPage.value++;
    querySchoolList();
  }
};

/**
 * 当选择的院校发生变化时，重置选中的专业
 */
const resetSelectMajor = () => {
  form.value.major = '';
  selectMajorObj.level1Code = null;
  selectMajorObj.level1Name = null;
  selectMajorObj.level2Code = null;
  selectMajorObj.level2Name = null;
  selectMajorObj.level3Code = null;
  selectMajorObj.level3Name = null;
  showSelectMajor.value = selectMajorObj;
  currentSubIndex.value = 0;
  searchMajorList.value = [];
};

/**
 * 设置选中的院校
 * @param item
 */
const setSelectSchool = (item: any) => {
  selectSchool.value = item;
  form.value.school = item.schoolName;
  // 重置选中的专业
  resetSelectMajor();
  showSchool.value = false;
};

/**
 * 以下接口写的太挫了，三级专业分三个接口查，以下代码不知道怎么写
 */
const getInitMajorList = async () => {
  const degreeType = currentSubIndex.value === 0 ? 1 : 2;
  const schoolId = selectSchool.value.id;
  await intentionInformationListlevel1({ degreeType, schoolId }).then((res: any) => {
    searchMajorList.value[0] = res;
    selectMajorObj.level1Code = res[0].level1Code;
    selectMajorObj.level1Name = res[0].level1Name;
  });
  // 如果存在二级专业，则请求二级专业列表
  if (searchMajorList.value[0].length) {
    const { level1Code } = searchMajorList.value[0][0];
    await intentionInformationListlevel2({ degreeType, schoolId, level1Code }).then((res: any) => {
      searchMajorList.value[1] = res;
      selectMajorObj.level2Code = res[0].level2Code;
      selectMajorObj.level2Name = res[0].level2Name;
    });
  }
  // 如果存在二级专业，则请求二级专业列表
  if (searchMajorList.value[1].length) {
    const { level2Code } = searchMajorList.value[1][0];
    await intentionInformationListlevel3({ degreeType, schoolId, level2Code }).then((res: any) => {
      searchMajorList.value[2] = res;
      selectMajorObj.level3Code = res[0].level3Code;
      selectMajorObj.level3Name = res[0].level3Name;
    });
  }
};

/**
 * 选择一级目录
 */
const setSelectMajorLevel1 = async (item: any) => {
  const degreeType = currentSubIndex.value === 0 ? 1 : 2;
  const schoolId = selectSchool.value.id;
  selectMajorObj.level1Code = item.level1Code;
  selectMajorObj.level1Name = item.level1Name;
  searchMajorList.value[1] = [];
  searchMajorList.value[2] = [];
  await intentionInformationListlevel2({ degreeType, schoolId, level1Code: item.level1Code }).then((res: any) => {
    searchMajorList.value[1] = res;
    selectMajorObj.level2Code = res[0].level2Code;
    selectMajorObj.level2Name = res[0].level2Name;
  });
  // 如果存在二级专业，则请求二级专业列表
  if (searchMajorList.value[1].length) {
    const { level2Code } = searchMajorList.value[1][0];
    await intentionInformationListlevel3({ degreeType, schoolId, level2Code }).then((res: any) => {
      searchMajorList.value[2] = res;
      selectMajorObj.level3Code = res[0].level3Code;
      selectMajorObj.level3Name = res[0].level3Name;
    });
  }
};

/**
 * 选择二级目录
 */
const setSelectMajorLevel2 = async (item: any) => {
  const degreeType = currentSubIndex.value === 0 ? 1 : 2;
  const schoolId = selectSchool.value.id;
  selectMajorObj.level2Code = item.level2Code;
  selectMajorObj.level2Name = item.level2Name;
  searchMajorList.value[2] = [];
  await intentionInformationListlevel3({ degreeType, schoolId, level2Code: item.level2Code }).then((res: any) => {
    searchMajorList.value[2] = res;
    selectMajorObj.level3Code = res[0].level3Code;
    selectMajorObj.level3Name = res[0].level3Name;
  });
};

/**
 * 选择三级目录
 */
const setSelectMajorLevel3 = (item: any) => {
  selectMajorObj.level3Code = item.level3Code;
  selectMajorObj.level3Name = item.level3Name;
  showSelectMajor.value = selectMajorObj;
  form.value.major = `${item.level3Name}(${item.level3Code})`;
  showMajor.value = false;
};

/**
 * 打开选专业弹窗
 */
const openMajorModal = () => {
  if (form.value.school === '') {
    uni.$u.toast('请先选择院校');
    return;
  }
  showMajor.value = true;
};

watch(showMajor, (newVal) => {
  if (newVal) {
    if (searchMajorList.value && searchMajorList.value.length === 0) {
      getInitMajorList();
    }
  }
});

const changeMajorType = (index: number) => {
  currentSubIndex.value = index;
};

watch(currentSubIndex, () => {
  getInitMajorList();
});

onShow(async () => {
  getChatData();
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #FFFFFF 100%);
  flex: 1;
}
.content {
  min-height: 1000rpx;
  padding: 32rpx;
  box-sizing: border-box;
  .description {
    margin: 0 -32rpx;
    background: url('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/home-default.png') no-repeat center;
    background-size: cover;
    width: 750rpx;
    height: 528rpx;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .btn-wrapper {
      margin-bottom: 55rpx;
    }
  }
  .echart-container {
    width: 100%;
    height: 450rpx;
    box-sizing: border-box;
    padding: 32rpx 20rpx;
    background: #FFFFFF;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    .title {
      display: flex;
      height: 28rpx;
      border-left: 8rpx solid #F1878D;
      font-size: 28rpx;
      align-items: center;
      padding-left: 20rpx;
      font-weight: 600;
    }
  }
  .news {
    background: rgba(120,131,247,0.08);
    width: 100%;
    border-radius: 24rpx;
    padding: 32rpx;
    box-sizing: border-box;
    .tag {
      padding: 5rpx 12rpx;
      border-radius: 4rpx;
      background: rgba(77,89,255,0.8);
      font-size: 20rpx;
      color: #FFFFFF;
      margin-right: 32rpx;
    }
    .name {
      font-weight: 600;
      font-size: 36rpx;
    }
    .right {
      font-size: 24rpx;
      color: rgba(0,0,0,0.65);
    }
  }
}
.slot-content {
  width: 100%;
  .item-wrapper {
    border-radius: 16rpx;
    border: 2rpx solid #E7E7E7;
    padding: 0 20rpx 0 40rpx;
  }
}
.subsection {
  padding: 0 20rpx;
}
::v-deep .u-modal__content {
  padding: 12rpx 20rpx 25rpx 30rpx !important;
}
.schools-popup {
  padding: 70rpx 16rpx 0 16rpx;
  display: flex;
  flex-direction: column;
  .schools-wrapper {
    flex: 1;
    position: relative;
  }
  .scrool-main {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
  }
  .school-item {
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
    color: #333;
    border-bottom: 1rpx solid #E7E7E7;
  }
}
.major-popup {
  display: flex;
  flex-direction: column;
  .major-wrapper {
    flex: 1;
    position: relative;
    display: flex;
    .level1 {
      flex: 3;
      flex-shrink: 0;
      background-color: #F2F2F7;
    }
    .level2 {
      flex: 4;
      flex-shrink: 0;
      border-right: 2rpx solid #F2F2F7;
    }
    .level3 {
      flex: 6;
      flex-shrink: 0;
    }
  }
  .major-main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
  }
  .major-item {
    padding: 14rpx;
    font-size: 24rpx;
    line-height: 36rpx;
    min-height: 100rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .active {
    font-weight: 500;
    color: #E94650;
  }
}
</style>
