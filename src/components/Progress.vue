<template>
  <progress :value="min" :max="max"></progress>
</template>

<script setup lang="ts">
defineProps({
  min: Number,
  max: Number,
});
</script>
