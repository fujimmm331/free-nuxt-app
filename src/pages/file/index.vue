<template>
  <div>
    <v-file-input v-model="state.file" truncate-length="15" show-size counter multiple clearable label="File input"
      @change='onChangeFile' />

    <template v-if="state.urls && state.urls.length > 0">
      <v-img v-for="url, key in state.urls" :src="url" :key="key" width="400" />
    </template>
  </div>
</template>
<script lang="ts">
import { Nullable } from '@/types';
import { computed, defineComponent, reactive } from 'vue';


type StateType = {
  file: Nullable<File[]>
  urls: Nullable<string[]>
}
export default defineComponent({
  setup() {

    const state = reactive<StateType>({
      file: null,
      urls: null,
    })

    const onChangeFile = (files: File[]) => {
      if (state.urls) {
        state.urls.forEach((url) => {
          URL.revokeObjectURL(url)
        })
      }
      state.urls = files.map((file) => URL.createObjectURL(file))
    }

    return {
      state,
      onChangeFile
    }
  }
})
</script>