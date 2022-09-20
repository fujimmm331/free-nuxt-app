<script setup lang="ts">
import { useDialogStore } from '@/store';
import useDialogStoreClose from '@/store/DialogStore/actions/useDialogStoreClose';
import useDiceIndexPageGetResult from '@/store/DiceIndexPageStore/selector/useDiceIndexPageGetResult';

const dialogStore = useDialogStore()
const closeDialog = useDialogStoreClose()
const diceResult = useDiceIndexPageGetResult()

</script>
<template>
  <div class="text-center">
    <v-dialog v-model="dialogStore.state.isShow" width="500">
      <v-card>
        <v-card-text>
          {{ diceResult }}
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog()">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>