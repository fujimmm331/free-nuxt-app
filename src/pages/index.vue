<template>
  <v-sheet>
    <div>ページ一覧</div>
    <v-list>
      <v-list-item v-for="route in routes" :key="route.name">
        <nuxt-link :to="route.path">{{ route.name }}</nuxt-link>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent, useRoute, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const router = useRouter()
    const routes = router.options.routes

    return {
      routes
    }
  }
})
</script>
