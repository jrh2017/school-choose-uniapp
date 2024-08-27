<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-08-27 08:02:58
 * @LastEditTime : 2024-08-27 09:16:19
 * @LastEditors  : jiangronghua
 * @Description  : 择校录入页面
-->
<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#D8575D"
      autoBack
    />
    <view class="page-title p-x-32rpx">
      <view class="text-44rpx c-#FFFFFF font-600 line-height-52rpx">
        轻松5步
      </view>
      <view class="text-44rpx c-#FFFFFF font-600 line-height-52rpx">
        生成个人择校报告
      </view>
      <view class="mt-16rpx text-28rpx c-#FCEFF2 line-height-44rpx">
        冲刺院校*3 / 稳妥院校*3 / 保底院校*3
      </view>
    </view>
    <view class="main mt-[-130rpx] min-h-800rpx bg-#FFFFFF">
      <view class="text-40rpx c-#000000 font-500 line-height-40rpx">
        目标一志愿
      </view>
      <view class="form-main">
        <up-form
          ref="uFormRef"
          :model="form"
          :rules="rules"
          label-width="150rpx"
          :border-bottom="true"
        >
          <view class="item-wrapper mt-20rpx">
            <up-form-item
              label="目标专业:"
              prop="major"
              :borderBottom="true"
              required
              @click="openMajorModal"
            >
              <up-input v-model="form.major" placeholder="请选择目标专业" border="none" disabled disabledColor="#ffffff" />
              <template #right>
                <up-icon
                  name="arrow-right"
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
    </view>
  </view>
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
import { reportListLevel1, reportListLevel2, reportListLevel3 } from '@/api/choice';

const showMajor = ref(false); // 是否显示专业选择弹窗
const list = reactive(['专业学位', '学术学位']); // 专业列表
const currentSubIndex = ref(0); // 当前选择的子项
const searchMajorList = ref<any>([]);
const showSelectMajor = ref({});
const selectMajorObj = reactive({
  level1Code: null,
  level1Name: null,
  level2Code: null,
  level2Name: null,
  level3Code: null,
  level3Name: null,
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
const form = ref({
  school: '',
  major: '',
  score: null,
});

const changeMajorType = (index: number) => {
  currentSubIndex.value = index;
};

/**
 * 以下接口写的太挫了，三级专业分三个接口查，以下代码不知道怎么写
 */
const getInitMajorList = async () => {
  const degreeType = currentSubIndex.value === 0 ? 1 : 2;
  await reportListLevel1({ degreeType }).then((res: any) => {
    searchMajorList.value[0] = res;
    selectMajorObj.level1Code = res[0].level1Code;
    selectMajorObj.level1Name = res[0].level1Name;
  });
  // 如果存在二级专业，则请求二级专业列表
  if (searchMajorList.value[0].length) {
    const { level1Code } = searchMajorList.value[0][0];
    await reportListLevel2({ degreeType, level1Code }).then((res: any) => {
      searchMajorList.value[1] = res;
      selectMajorObj.level2Code = res[0].level2Code;
      selectMajorObj.level2Name = res[0].level2Name;
    });
  }
  // 如果存在二级专业，则请求二级专业列表
  if (searchMajorList.value[1].length) {
    const { level2Code } = searchMajorList.value[1][0];
    await reportListLevel3({ degreeType, level2Code }).then((res: any) => {
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
  selectMajorObj.level1Code = item.level1Code;
  selectMajorObj.level1Name = item.level1Name;
  searchMajorList.value[1] = [];
  searchMajorList.value[2] = [];
  await reportListLevel2({ degreeType, level1Code: item.level1Code }).then((res: any) => {
    searchMajorList.value[1] = res;
    selectMajorObj.level2Code = res[0].level2Code;
    selectMajorObj.level2Name = res[0].level2Name;
  });
  // 如果存在二级专业，则请求二级专业列表
  if (searchMajorList.value[1].length) {
    const { level2Code } = searchMajorList.value[1][0];
    await reportListLevel3({ degreeType, level2Code }).then((res: any) => {
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
  selectMajorObj.level2Code = item.level2Code;
  selectMajorObj.level2Name = item.level2Name;
  searchMajorList.value[2] = [];
  await reportListLevel3({ degreeType, level2Code: item.level2Code }).then((res: any) => {
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
  showMajor.value = true;
};

watch(showMajor, (newVal) => {
  if (newVal) {
    if (searchMajorList.value && searchMajorList.value.length === 0) {
      getInitMajorList();
    }
  }
});
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #FFFFFF 50%);
  display: flex;
  flex-direction: column;
}
.page-title {
  height: 330rpx;
  background: linear-gradient( 180deg, #D8575D 0%, rgba(239,68,119,0.1) 100%);
}
.main {
  border-radius: 24rpx 24rpx 0rpx 0rpx;
  padding: 32rpx;
  box-sizing: border-box;
  .item-wrapper {
    border-bottom: 2rpx solid #F2F2F7;
  }
}
.major-popup {
  display: flex;
  flex-direction: column;
  .subsection {
    padding: 0 20rpx;
  }
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
