<template>
  <v-container class="mt-10">
    <v-row
      v-if="isLoaded"
      class="text-center"
      justify="center"
      align-content="center"
    >
      <template v-for="(day, index) in days">
        <v-col cols="12" sm="10" md="10" lg="10" xl="10" :key="index">
          <schedule-of-day :day="day" />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ScheduleCollectionMapper } from "../store/modules/ScheduleCollectionModule";
import ScheduleOfDay from "@/components/ScheduleOfDay.vue";
import dayjs from "../plugins/dayjs";

const Super = Vue.extend({
  computed: {
    ...ScheduleCollectionMapper.mapGetters(["isLoaded"]),
  },
});

@Component({
  components: {
    ScheduleOfDay,
  },
})
export default class VspoSchedule extends Super {
  today: any = dayjs();
  days: Array<any> = [
    this.today.subtract(1, "days"),
    this.today,
    this.today.add(1, "days"),
  ];
}
</script>
