<template>
  <button @click="valideAndNext">Valider</button>
</template>

<script setup lang="ts">
const props = defineProps<{
  correctAnswer: string;
  score: number;
  answerUser: string;
}>();

const valideAndNext = () => {
  if (answerUser.value === props.correctAnswer) {
    score.value++;
    console.log(score);
  }
  progress.value++;
};
</script>
