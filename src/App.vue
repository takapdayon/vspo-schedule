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
import { MetaInfo } from "vue-meta";
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import OgImage from "@/assets/ogimage.png";

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
  metaInfo(this: App): MetaInfo {
    return {
      title: this.title,
      htmlAttrs: {
        lang: 'jp'
      },
      meta: [
        { charset: 'utf-8' },
        { vmid: 'description', property: 'description', content: this.description},
        { vmid: 'og:type', property: 'og:type', content: 'website'},
        { vmid: 'og:url', property: 'og:url', content: this.url},
        { vmid: 'og:title', property: 'og:title', content: this.title},
        { vmid: 'og:image', property: 'og:image', content: this.ogimage},
        { vmid: 'og:description', property: 'og:description', content: this.description},
        { vmid: 'twitter:image:src', name: 'twitter:image:src', content: this.ogimage},
        { vmid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image'},
        { vmid: 'twitter:site', name: 'twitter:site', content: '@takapdayon'},
        { vmid: 'twitter:creator', name: 'twitter:creator', content: '@takapdayon'},
        { vmid: 'twitter:title', name: 'twitter:title', content: this.title},
        { vmid: 'twitter:description', name: 'twitter:description', content: this.description}
      ]
    };
  },
})
export default class App extends Super {
  title = 'ぶいすぽ☆スケジュール';
  url = 'https://vspo-schedule.web.app';
  ogimage = `${this.url}${OgImage}`;
  description = 'ぶいすぽ(vspo)の非公式スケジュールサイトです。30分ごとに更新し、ライブ配信中はアイコンが変化します';

  async created() {
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
