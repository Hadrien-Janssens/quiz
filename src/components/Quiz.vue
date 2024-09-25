<template>
  <h2>Questionnaire : {{ questionnaire.title }}</h2>
  <div
    v-if="
      questionnaire.questions && progress !== questionnaire.questions.length
    "
  >
    <Question :questions="questionnaire.questions" :progress="progress" />
    <button @click="valideAndNext">Vallider</button>
  </div>
  <div v-else>fini</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Question from "./Question.vue";

const progress = ref(0);
const scrore = ref(0);

export interface Question {
  question: string;
  choices: string[];
}

interface Questionnaire {
  title: string;
  questions: Question[];
}

const questionnaire = ref<Questionnaire>([]);

onMounted(() => {
  fetch("http://localhost:5173/src/db.json")
    .then((response) => response.json())
    .then((data) => (questionnaire.value = data));
});

const valideAndNext = () => {
  progress.value++;
};
</script>
