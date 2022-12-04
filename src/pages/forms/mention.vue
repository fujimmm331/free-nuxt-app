<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import FreeTextarea from '@/components/atoms/FreeTextarea/index.vue'

type InsertTextType = {
  id: number
  text: string
}

type StateType = {
  value: string
  insertTexts: InsertTextType[]
}

export default defineComponent({
  components: {
    FreeTextarea,
  },
  setup() {
    const state = reactive<StateType>({
      value:
        '確認する、シェルターシールドを貼っているな？\nシェルターは完璧なんだな？',
      insertTexts: [
        {
          id: 1,
          text: 'おはようございます',
        },
        {
          id: 2,
          text: '確認する、シェルターシールドを貼っているな？\nシェルターは完璧なんだな？',
        },
        {
          id: 3,
          text: 'おはようございます',
        },
      ],
    })

    const freeTextarea = ref<InstanceType<typeof FreeTextarea>>()

    const onCtrlEnter = () => {
      console.log('ctrl-enter!')
    }

    const onSelectText = (text: string) => {
      freeTextarea.value?.insertTexts(text)
    }

    return {
      state,
      onCtrlEnter,
      onSelectText,
      freeTextarea,
    }
  },
})
</script>

<template>
  <v-sheet class="d-flex justify-space-around">
    <v-sheet class="">
      <free-textarea
        ref="freeTextarea"
        v-model="state.value"
        @ctrl-enter="onCtrlEnter"
      />
      <pre>{{ state.value }}</pre>
    </v-sheet>

    <v-sheet>
      <v-list v-for="data in state.insertTexts" :key="data.id">
        <v-list-item @click="onSelectText(data.text)">
          <pre>{{ data.text }}</pre>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-sheet>
</template>