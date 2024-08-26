import { defineStore } from 'pinia';

export const useCollege = defineStore('college', {
  state: () => ({
    collegeItem: {
      collegeId: '',
      collegeName: '',
    }, // 学院信息
    recruitType: '1', // 全日制，非全日制
  }),
  actions: {
    setCollegeItem(val: any) {
      this.collegeItem = val;
    },
    setRecruitType(val: any) {
      this.recruitType = val;
    },
  },
});
