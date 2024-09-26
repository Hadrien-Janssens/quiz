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
  if (props.answerUser === props.correctAnswer) {
    props.score++;
    console.log(score);
  }
  progress.value++;
};
</script>
