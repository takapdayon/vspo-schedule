import Vue from 'vue';
import Vuex from 'vuex';

import { Module, createStore as cs } from "vuex-smart-module";
import { LiverCollectionModule } from "./modules/LiverCollectionModule";
import { ScheduleCollectionModule } from "./modules/ScheduleCollectionModule";

Vue.use(Vuex);

export const createStore = () => {
  const rootModule = new Module({
    modules: {
      LiverCollectionModule,
      ScheduleCollectionModule
    }
  });

  return cs(rootModule);
}
