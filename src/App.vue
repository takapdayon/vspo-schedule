<template>
  <v-app class="main">
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <vue-particles
      color="#add8e6"
      :particleOpacity="0.7"
      linesColor="#add8e6"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="6"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="4"
      :hoverEffect="false"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
      retina_detect="true"
    >
    </vue-particles>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { liverCollectionMapper } from "./store/modules/LiverCollectionModule";
import { ScheduleCollectionMapper } from "./store/modules/ScheduleCollectionModule";
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const Super = Vue.extend({
  methods: {
    ...liverCollectionMapper.mapActions(["loadLiver"]),
    ...ScheduleCollectionMapper.mapActions(["loadSchedule"]),
  },
});

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Super {
  async created() {
    // 0時ジャストだと、わんちゃん日付にずれが起こる可能性が微レ存
    // 3日(5日)とってきて保持する?
    this.loadLiver();
    this.loadSchedule();
  }
}
</script>

<style scoped>
.main {
  background: none !important;
  z-index: -2;
}
#particles-js {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
