<template>
  <article :aria-busy="state === 'loading'" v-if="state === 'loading'">
    <h2>Chargement...</h2>
  </article>
  <div v-if="state === 'success'">
    <h2>Questionnaire : {{ questionnaire.title }}</h2>
    <Progress
      :value="progress"
      :max="questionnaire.questions.length"
    ></Progress>
    <div
      v-if="
        questionnaire.questions && progress !== questionnaire.questions.length
      "
    >
      <Question
        :key="progress"
        :questions="questionnaire.questions"
        :progress="progress"
        @answerSelected="(answer) => (answerUser = answer)"
      />
      <button :disabled="answerUser === ''" @click="valideAndNext">
        Valider
      </button>
    </div>
    <article v-else>
      <h6>Ton Score est de : {{ score }}/5 {{ score > 3 ? "🎉" : "🫣" }}</h6>
      <button @click="refreshPage">Reset</button>
    </article>
  </div>
  <article v-if="state === 'error'">
    <h2>Erreur lors du chargement du questionnaire</h2>
    <button @click="refreshPage">Réessayer</button>
  </article>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Question from "./Question.vue";
import Progress from "./Progress.vue";

const progress = ref(0);
const score = ref(0);
const answerUser = ref<string>("");
const state = ref("loading");

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
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        state.value = "error";
        throw new Error("Network response was not ok.");
      }
    })
    .then((data) => {
      state.value = "success";
      questionnaire.value = data;
    });
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
