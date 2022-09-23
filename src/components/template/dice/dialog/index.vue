<script setup lang="ts">
import useDialogStoreClose from '@/store/DialogStore/actions/useDialogStoreClose';
import useDialogGetState from '@/store/DialogStore/selectors/useDialogGetState';
import useHandResetHand from '@/store/HandStore/actions/useHandResetHand';
import useHandGetState from '@/store/HandStore/selectors/useHandGetState';
import { onBeforeUpdate, onUnmounted } from 'vue';

const dialogState = useDialogGetState()
const closeDialog = useDialogStoreClose()
const handState = useHandGetState()
const resetHandState = useHandResetHand()
const onClose = () => {
  closeDialog()
  resetHandState()
}

</script>
<template>
  <div class="text-center">
    <v-dialog v-model="dialogState.isShow" width="500">
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
          <v-btn color="primary" text @click="onClose()">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>