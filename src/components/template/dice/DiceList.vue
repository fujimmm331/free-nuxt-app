<script setup lang="ts">
import Dice from '@/components/molecules/dice/index.vue';
import { useDialogStore } from '@/store';
import useHandJudgeHand from '@/store/HandStore/actions/useHandJudgeHand';
import { DiceStatusType, TimerType } from '@/types';
import { reactive, watch } from 'vue';
type DiceListProps = {
  length: number
  status: DiceStatusType
}

type DiceListStateType = {
  index: number
  statuses: DiceStatusType[]
  timer: TimerType
}

const props = defineProps<DiceListProps>()
const diceListState = reactive<DiceListStateType>({
  index: 0,
  statuses: Array.from({ length: props.length }, () => props.status),
  timer: {
    ms: 500,
    id: null
  }
})

const dialogStore = useDialogStore()
const judgeHands = useHandJudgeHand()

const initializeIndex = () => {
  diceListState.index = 0
}

const incrementIndex = () => {
  diceListState.index++
}

const setStart = () => {
  diceListState.statuses = diceListState.statuses.map(() => 'START')
}

const setStatusesEvenlyTimerMs = () => {
  diceListState.statuses = diceListState.statuses.map((status, i) => i === diceListState.index ? 'STOP' : status)
}

watch(
  () => props.status,
  () => {
    if (props.status === 'STOP') {
      // サイコロを順番に止めていく処理
      diceListState.timer.id = setInterval(() => {
        if (props.length === diceListState.index && diceListState.timer.id) {
          clearInterval(diceListState.timer.id)
          judgeHands()
          dialogStore.actions.openDialog()
        }
        setStatusesEvenlyTimerMs()
        incrementIndex()
      }, diceListState.timer.ms)
    }

    if (props.status === 'START') {
      initializeIndex()
      setStart()
    }
  }
)

</script>
<template>
  <div class="d-flex justify-space-around flex-wrap pa-6">
    <Dice v-for="status, index in diceListState.statuses" :status="status" :key="index" />
  </div>
</template>