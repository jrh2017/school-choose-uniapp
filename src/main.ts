import { createSSRApp } from 'vue';

// 引入UnoCSS
import 'virtual:uno.css';

// 引入uview-plus
import uviewPlus, { setConfig } from 'uview-plus';
import App from '@/App.vue';

// 引入状态管理
import setupStore from '@/store';

// 引入请求封装
import setupRequest from '@/utils/request';

// 权限管理
import '@/permission';

// #ifdef VUE3
export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  setConfig({
    // 修改$u.props对象的属性
    props: {
      // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
      input: {
        border: 'none',
      },
    },
  });
  // 状态管理
  setupStore(app);
  // 网络请求
  setupRequest();

  return {
    app,
  };
}
// #endif
