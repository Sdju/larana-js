<script setup lang="ts">
import { useStyleVar } from 'larana-js'
import { ref } from 'vue'
import AppHeader from '../components/app-header.vue'

const items = ref([])
const loaded = ref(false)
const loadingTick = ref(0)
const loadingText = ref('Loading')

setTimeout(() => {
  items.value = [
    { value: 100, label: '01' },
    { value: 90, label: '02' },
    { value: 60, label: '03' },
    { value: 190, label: '04' },
    { value: 60, label: '05' },
    { value: 100, label: '06' },
    { value: 120, label: '07' },
    { value: 300, label: '08' },
    { value: 500, label: '09' },
    { value: 150, label: '10' },
    { value: 100, label: '11' },
    { value: 70, label: '12' },
  ]
  loaded.value = true
}, 2000)
</script>

<template>
  <layout
    :style="{
      bg: useStyleVar('bg'),
      gap: 8,
      direction: 'column',
    }"
  >
    <AppHeader />
    <layout v-if="!loaded" :style="{ size: 1 }" >
      <text 
        text="Loading data for chart" 
        :style="{ 
          fontSize: useStyleVar('h1FontSize'), 
          fg: useStyleVar('fg'),
        }"
      />
    </layout>
    <layout :style="{ size: 9 }">
      <bar-chart 
        v-if="loaded" 
        :items="items"
        :style="{ 
          fg: useStyleVar('fg'),
          bg: '#3caa3c',
        }"
      />
      <text v-else text="Loading..." :style="{ fontSize: useStyleVar('h1FontSize'), }" />
    </layout>
  </layout>
</template>