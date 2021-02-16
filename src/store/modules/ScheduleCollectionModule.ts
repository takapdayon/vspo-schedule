import firebase from "@/plugins/firebase";
import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';
import { Schedule } from "../../../types/Schedule";
import dayjs from "@/plugins/dayjs";

class ScheduleCollectionState {
  // typeで指定する
  schedules: Array<Schedule> = [];
  isLoaded = false;
}

export class ScheduleCollectionGetters extends Getters<ScheduleCollectionState> {
  getScheduleFromDate(day: any): Array<Schedule> {
    const tmpSchedules: Array<Schedule> = this.state.schedules.filter((schedule: Schedule) =>
      dayjs(schedule.scheduledStartTime.toDate()).isSame(day, "day"))!
    const dateSchedules: Array<Schedule> = tmpSchedules.sort((a, b) => a.scheduledStartTime.toDate() - b.scheduledStartTime.toDate())
    return dateSchedules
  }
  get isLoaded(): boolean {
    return this.state.isLoaded;
  }
}

export class ScheduleCollectionMutations extends Mutations<ScheduleCollectionState> {
  setSchedule(payload: Array<Schedule>) {
    this.state.schedules = payload
  }
  isLoadSchedule(payload: boolean) {
    this.state.isLoaded = payload
  }
}

export class ScheduleCollectionActions extends Actions<
  ScheduleCollectionState,
  ScheduleCollectionGetters,
  ScheduleCollectionMutations,
  ScheduleCollectionActions
  > {
  async loadSchedule(): Promise<any> {
    const scheduleCollections = await firebase.firestore().collection("schedules").get()
    this.commit("setSchedule", scheduleCollections.docs.map(x => x.data() as Schedule))
    this.commit("isLoadSchedule", true)
  }
}

export const ScheduleCollectionModule = new Module({
  state: ScheduleCollectionState,
  getters: ScheduleCollectionGetters,
  mutations: ScheduleCollectionMutations,
  actions: ScheduleCollectionActions
})

export const ScheduleCollectionMapper = createMapper(ScheduleCollectionModule);
