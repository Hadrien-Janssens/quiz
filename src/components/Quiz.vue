<template>
  <h2>Questionnaire : {{ questionnaire.title }}</h2>
  <Progress :value="progress" :max="questionnaire.questions.length"></Progress>
  <div
    v-if="
      questionnaire.questions && progress !== questionnaire.questions.length
    "
  >
    <Question
      :questions="questionnaire.questions"
      :progress="progress"
      @answerSelected="(answer) => (answerUser = answer)"
    />
    <button @click="valideAndNext">Valider</button>
  </div>
  <article v-else>
    <h6>Ton Score est de : {{ score }}/5 {{ score > 3 ? "🎉" : "🫣" }}</h6>
    <button @click="refreshPage">Reset</button>
  </article>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Question from "./Question.vue";
import Progress from "./Progress.vue";

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

const questionnaire = ref<Questionnaire>({
  title: "",
  questions: [],
});

onMounted(() => {
  fetch("http://localhost:5173/src/db.json")
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

const refreshPage = () => {
  location.reload();
};
</script>
