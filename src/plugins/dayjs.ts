import Vue from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import isToday from 'dayjs/plugin/isToday';

dayjs.locale('ja')
dayjs.extend(isToday)
export default dayjs
/*
Object.defineProperties(Vue.prototype, {
  $date: {
    get() {
      return dayjs
    }
  }
});*/