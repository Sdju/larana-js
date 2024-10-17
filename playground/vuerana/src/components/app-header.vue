<script setup lang="ts">
import { useStyleVar } from 'larana-js'

const items = [
  { label: 'Home', name: 'home' },
  { label: 'Bar chart', name: 'bar-chart' },
  { label: 'Todo list', name: 'todo-list' },
]
</script>

<template>
  <layout
		:style="{
			direction: 'row',
			gap: 8,
			bg: '#333',
		}"
	>
    <text 
			:style="{
        fontWeight: useStyleVar('fontWeight'),
        fg: useStyleVar('fg'),
        fontSize: useStyleVar('fontSize'),
        fontFamily: useStyleVar('fontFamily'),
				fontSize: useStyleVar('h1FontSize'),
				fg: useStyleVar('accent'),
			}"
			text="LaranaJS" 
		/>
  </layout>
</template>

<script lang="ts">


</script>
