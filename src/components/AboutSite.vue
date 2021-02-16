<template>
  <v-card>
    <v-card-title>
      <span class="headline">このサイトについて</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text-md-body-1 mt-3">
      ぶいすぽ非公式スケジュールサイトです<br>
      30分毎に更新されます<br>
      ライブ中は<v-icon color="teal darken-2">mdi-alarm</v-icon>が<v-icon color="#FF0000">mdi-youtube</v-icon>になります
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="$emit('close-dialog')">
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Icon } from "../../types/components";

@Component
export default class Footer extends Vue {}
</script>

