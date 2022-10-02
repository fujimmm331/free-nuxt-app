<script setup lang="ts">
import { useDialogStore } from '@/store';
import useHandGetState from '@/store/HandStore/selectors/useHandGetState';

const dialogStore = useDialogStore()
const handState = useHandGetState()

</script>
<template>
  <div class="text-center">
    <v-dialog v-model="dialogStore.state.isShow" width="500">
      <v-card>
        <v-card-title>結果</v-card-title>
        <template v-if="handState.result.length > 0">
          <v-card-text v-for=" hand in handState.result">
            {{ hand }}
          </v-card-text>
          <v-divider />
        </template>

        <v-card-text v-else>役なしですわ。。。。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogStore.actions.closeDialog()">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>