<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 17:56:35
 * @LastEditTime : 2024-09-04 15:13:23
 * @LastEditors  : jiangronghua
 * @Description  : 意向院校详情页
-->
<template>
  <view class="container">
    <up-navbar :placeholder="true" bg-color="#F8EFF2" title="" autoBack />
    <view v-if="ifSetConfig" class="content w-100%">
      <view class="p-32rpx">
        <up-subsection :list="listPage" :current="subIndex" activeColor="#E94650" inactiveColor="#858081"
          bgColor="#F1E9EC" @change="changeIndex" />
      </view>
      <template v-if="subIndex === 0">
        <Major :majorDetail="currentMajorInfo" :intention="currentIntentionInfo" @change="show = true" />
      </template>
      <template v-if="subIndex === 1">
        <School :majorDetail="currentMajorInfo" :level3Code="currentIntentionInfo.level3Code"
          :schoolId="currentIntentionInfo.schoolId" />
      </template>
    </view>
    <view v-else class="empty">
      <up-empty mode="data" text="">
        <button size="default" type="warn" class="btn-start" @click="show = true">
          点击配置报告
        </button>
      </up-empty>
    </view>
  </view>
  <up-modal :show="show" title="我的意向" :show-cancel-button="true" confirm-color="#FE6567" @cancel="show = false"
    @confirm="confirmModal">
    <view class="slot-content">
      <up-form ref="uFormRef" :model="form" :rules="rules" label-width="150rpx" :border-bottom="true">
        <view class="item-wrapper">
          <up-form-item label="意向院校:" prop="school" required @click="showSchool = true;">
            <up-input v-model="form.school" placeholder="请选择意向院校" border="none" disabled disabledColor="#ffffff" />
            <template #right>
              <up-icon name="arrow-down" />
            </template>
          </up-form-item>
        </view>
        <view class="item-wrapper mt-20rpx">
          <up-form-item label="意向专业:" prop="major" required @click="openMajorModal">
            <up-input v-model="form.major" placeholder="请选择意向专业" border="none" disabled disabledColor="#ffffff" />
            <template #right>
              <up-icon name="arrow-down" />
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
        <up-subsection :list="list" mode="subsection" :current="currentSubIndex" activeColor="#e94650"
          @change="changeMajorType" />
      </view>
      <view class="major-wrapper">
        <view class="major-main">
          <view class="level1">
            <scroll-view style="height: 100%;" scroll-y="true">
              <view v-for="(item, index) in (searchMajorList[0] || [])" :key="index" class="major-item"
                :class="{ active: selectMajorObj.level1Code === item.level1Code }" @click="setSelectMajorLevel1(item)">
                {{ item.level1Name }}({{ item.level1Code }})
              </view>
            </scroll-view>
          </view>
          <view class="level2">
            <scroll-view style="height: 100%;" scroll-y="true">
              <view v-for="(item, index) in (searchMajorList[1] || [])" :key="index" class="major-item"
                :class="{ active: selectMajorObj.level2Code === item.level2Code }" @click="setSelectMajorLevel2(item)">
                {{ item.level2Name }}({{ item.level2Code }})
              </view>
            </scroll-view>
          </view>
          <view class="level3">
            <scroll-view style="height: 100%;" scroll-y="true">
              <view v-for="(item, index) in (searchMajorList[2] || [])" :key="index" class="major-item"
                :class="{ active: selectMajorObj.level3Code === item.level3Code }" @click="setSelectMajorLevel3(item)">
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
import Major from '../components/major.vue';
import School from '../components/school.vue';
import { schoolMajorDetail } from '@/api/collage';
import {
  intentionInformationListlevel1,
  intentionInformationListlevel2,
  intentionInformationListlevel3,
  intentionInformationSubmit,
  getIntenionInfomation,
  pageSchool,
} from '@/api/userinfo';

const listPage = reactive(['意向专业排名', '意向院校分析']);
const subIndex = ref(0); // 当前索引
const ifSetConfig = ref(false); // 是否设置配置
const show = ref(false); // 是否显示模态框
const showSchool = ref(false); // 是否显示院校选择弹窗
const showMajor = ref(false); // 是否显示专业选择弹窗
const form = ref({
  school: '',
  major: '',
  score: null,
});

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

const selectSchool = ref({
  id: null,
  schoolName: null,
}); // 选择的院校

const selectMajorObj = reactive({
  level1Code: null,
  level1Name: null,
  level2Code: null,
  level2Name: null,
  level3Code: null,
  level3Name: null,
});

const keyword = ref(''); // 搜索关键字
const schoolList = ref<any>([]); // 查询到学校列表
const schoolPage = ref(1); // 学校列表页码
const schoolTotal = ref(0); // 学校列表总数
const list = reactive(['专业学位', '学术学位']); // 专业列表
const currentSubIndex = ref(0); // 当前选择的子项
const searchMajorList = ref<any>([]);
const showSelectMajor = ref({});
const currentIntentionInfo = ref(null); // 当前选择的专业信息
const currentMajorInfo = ref(null); // 当前选择的专业信息

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
      uni.showLoading({
        title: '提交中...',
        mask: true,
      });
      intentionInformationSubmit(params).then(() => {
        uni.$u.toast('提交成功');
        show.value = false;
        subIndex.value = -1
        const pages = getCurrentPages()
        // 声明一个pages使用getCurrentPages方法
        const curPage = pages[pages.length - 1]
        // 声明一个当前页面
        curPage.onLoad() // 传入参数
      }).catch((err) => {
        console.log(err, 'err');
        uni.$u.toast(err.msg || '提交失败');
      }).finally(() => {
        uni.hideLoading()
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

const changeIndex = (index: number) => {
  subIndex.value = index;
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

watch(showMajor, (newVal) => {
  if (newVal) {
    if (searchMajorList.value && searchMajorList.value.length === 0) {
      getInitMajorList();
    }
  }
});

const getCurrentCollegeInfo = () => {
  const { schoolId, level3Code } = currentIntentionInfo.value!;
  schoolMajorDetail({ schoolId, level3Code }).then((res: any) => {
    currentMajorInfo.value = res;
    console.log(res, 'currentMajorInfo');
  })
}

const getInentionDetail = () => {
  getIntenionInfomation().then((res: any) => {
    if (res) {
      ifSetConfig.value = true;
      currentIntentionInfo.value = res;
      getCurrentCollegeInfo();
    } else {
      // 没有配置的情况下显示输入配置的按钮
      ifSetConfig.value = false;
      show.value = true;
    }
  })
}

watch(currentSubIndex, () => {
  getInitMajorList();
});

const changeMajorType = (index: number) => {
  currentSubIndex.value = index;
};

onLoad(() => {
  getInentionDetail()
  nextTick(() => {
    subIndex.value = 0
  })
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
  flex: 1;
}

.content {
  min-height: 1000rpx;
  box-sizing: border-box;
}

.btn-start {
  border-radius: 40rpx;
  color: #ffffff;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
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
