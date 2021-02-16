<template>
  <v-card
    :href="this.streamURL()"
    :aspect-ratio="16 / 9"
    target="_blank"
    rel="noopener noreferrer"
    class="mx-auto"
    hover
  >
    <v-img :aspect-ratio="16 / 9" :src="this.schedule.thumbnails"></v-img>

    <v-card-title class="pa-2">
      <v-layout v-if="isLoaded" align-center>
        <v-flex>
          <v-avatar :size="56">
            <img :src="this.liver().channelIcon" />
          </v-avatar>
        </v-flex>
        <v-flex>
          <v-icon v-if="this.schedule.liveBroadcastContent === 'live'" large color="#FF0000">mdi-youtube</v-icon>
          <v-icon v-else large color="teal darken-2">mdi-alarm</v-icon>
          {{ this.streamtime() }}
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-title class="pa-2">
      <v-layout v-if="isLoaded" align-center>
        <v-flex align-self-start>
          <p class="title">{{ this.schedule.title }}</p>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LiverCard from "@/components/LiverCard.vue";
import { liverCollectionMapper } from "../store/modules/LiverCollectionModule";
import { Schedule } from "../../types/Schedule";
import dayjs from "../plugins/dayjs";

const Super = Vue.extend({
  computed: {
    ...liverCollectionMapper.mapGetters(["getLiver", "isLoaded"]),
  },
});
@Component({
  components: {
    LiverCard,
  },
})
export default class ScheduleCard extends Super {
  @Prop({ default: null })
  schedule!: Schedule;
  url = new URL("https://www.youtube.com/watch");
  streamURL() {
    this.url.searchParams.set("v", this.schedule.id);
    return this.url.href;
  }
  streamtime() {
    return dayjs(this.schedule.scheduledStartTime.toDate()).format("HH:mm");
  }
  liver() {
    return this.getLiver(this.schedule.channelId);
  }
}
</script>

<style scoped>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
