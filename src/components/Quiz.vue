<template>
  <h2>Questionnaire : {{ questionnaire.title }}</h2>
  <div
    v-if="
      questionnaire.questions && progress !== questionnaire.questions.length
    "
  >
    <progress value="2" max="5"></progress>
    <Question
      :questions="questionnaire.questions"
      :progress="progress"
      @answerSelected="(answer) => (answerUser = answer)"
    />
    <button @click="valideAndNext">Valider</button>
  </div>
  <div v-else>Ton Score est de : {{ score }}/5</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Question from "./Question.vue";

const progress = ref(0);
const score = ref(0);
const answerUser = ref<string>("");

export interface Question {
  question: string;
  choices: string[];
  correct_answer: string;
}

interface Questionnaire {
  title: string;
  questions: Question[];
}

const questionnaire = ref<Questionnaire>([]);

onMounted(() => {
  fetch("http://localhost:5174/src/db.json")
    .then((response) => response.json())
    .then((data) => (questionnaire.value = data));
});

const valideAndNext = () => {
  if (
    answerUser.value ===
    questionnaire.value.questions[progress.value].correct_answer
  ) {
    score.value++;
  }
  answerUser.value = "";
  progress.value++;
};
</script>
