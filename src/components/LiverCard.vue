<template>
  <v-card class="mx-auto">
    <v-card-title class="pa-2">
      <v-layout v-if="isLoaded" align-center justify-center>
        <v-flex>
          <v-avatar :size="56">
            <img :src="this.liver().channelIcon" />
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="ma-0 subtitle-1 linechamp">
            {{ this.liver().channelName }}
          </p>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { liverCollectionMapper } from "../store/modules/LiverCollectionModule";

const Super = Vue.extend({
  computed: {
    ...liverCollectionMapper.mapGetters(["getLiver", "isLoaded"]),
  },
});

@Component
export default class LiverCard extends Super {
  @Prop({ default: "" })
  channelId!: string;

  liver() {
    return this.getLiver(this.channelId);
  }
}
</script>

<style scoped>
.linechamp {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
