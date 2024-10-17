<script setup>
import { useStyleVar } from 'larana-js'

import AppHeader from '../components/app-header.vue'

</script>

<template>
  <layout 
    :style="{ 
      bg: useStyleVar('bg'), 
      gap: 8, 
      direction: 'column' 
    }"
  >
    <AppHeader :style="{ size: 1 }" />
    <layout :style="{ size: 9 }">
      <text text="Home" />
    </layout>
  </layout>
</template>

<script>

</script>