<template>
  <div v-if="this.schedules.length">
    <v-toolbar
      class="my-10"
      :color="this.day.isToday() ? '#4f1557' : ''"
      :dark="this.day.isToday()"
    >
      <v-spacer />
      <v-toolbar-title>
        {{ this.day.format("MM/DD(ddd)") }}
      </v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-row>
      <template v-for="schedule in this.schedules">
        <v-col cols="12" sm="6" md="6" lg="3" xl="3" :key="schedule.id">
          <schedule-card :schedule="schedule" />
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ScheduleCollectionMapper } from "../store/modules/ScheduleCollectionModule";
import { Schedule } from "../../types/Schedule";
import ScheduleCard from "./ScheduleCard.vue";
import dayjs from "../plugins/dayjs";

const Super = Vue.extend({
  computed: {
    ...ScheduleCollectionMapper.mapGetters(["getScheduleFromDate"]),
  },
});

@Component({
  components: {
    ScheduleCard,
  },
})
export default class ScheduleOfDay extends Super {
  @Prop({ default: dayjs() })
  day!: any;
  schedules: Array<Schedule> = [];

  async created() {
    this.schedules = await this.getScheduleFromDate(this.day);
    console.log(this.schedules);
  }
}
</script>

<style scoped>
.date {
  text-align: center;
}
</style>
