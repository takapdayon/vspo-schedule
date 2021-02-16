<template>
  <v-app-bar short app color="#4f1557" dark>
    <v-spacer></v-spacer>
    <div class="d-flex align-center">
      <v-img
        src="../assets/vspologo.png"
        contain
        max-height="56px"
      >
      </v-img>
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Header extends Vue {}
</script>

<style scoped>
a {
  pointer-events: none;
  color: white !important;
}
</style>
