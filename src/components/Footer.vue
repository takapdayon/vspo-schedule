<template>
  <v-footer app dark padless inset>
    <v-card class="flex" flat tile>
      <v-card-title class="blue-grey darken-3">
        <v-spacer></v-spacer>
        <v-dialog v-model="isOpenDialog" max-width="400px">
          <about-site @close-dialog="this.closeDialog" />
        </v-dialog>
        <v-btn
          href="https://twitter.com/takapdayon"
          target="_blank"
          rel="noopener noreferrer"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">mdi-twitter</v-icon>
        </v-btn>
        <v-btn @click="openDialog()" class="mx-4" dark icon>
          <v-icon size="24px">mdi-help-circle-outline</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AboutSite from "./AboutSite.vue";
import { Icon } from "../../types/components";

@Component({
  components: {
    AboutSite,
  },
})
export default class Footer extends Vue {
  isOpenDialog = false;
  closeDialog() {
    this.isOpenDialog = false;
  }
  openDialog() {
    this.isOpenDialog = true;
  }
}
</script>
