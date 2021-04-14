import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

// 重新声明axios模块，给其增加一些自定义参数
declare module 'axios/' {
	interface AxiosRequestConfig {
		showLoading?: boolean;
	}
}