<script setup lang="ts">
import { reactive } from 'vue';
type DialogStateType = {
  isShow: boolean
}

const dialogState = reactive<DialogStateType>({
  isShow: false
})
</script>
<template>
  <div class="text-center">
    <v-dialog v-model="dialogState.isShow" width="500">
      <v-card>
        <v-card-text>
          OMANKO
        </v-card-text>

        <v-card-text>
          OCHINCHIN
        </v-card-text>

        <v-card-text>
          UNKO
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogState.isShow = false">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>