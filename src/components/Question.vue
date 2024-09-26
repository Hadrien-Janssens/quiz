<template>
  <div style="margin-bottom: 15px" v-if="questions && questions.length > 0">
    <h6>Question : {{ questions[progress].question }}</h6>
    <article
      style="
        border: 1px solid;
        padding: 10px;
        display: flex;
        flex-direction: column;
      "
    >
      <label
        :for="questions[progress].choices[index]"
        v-for="(item, index) in questions[progress].choices"
        :key="index"
      >
        <input
          type="radio"
          :name="questions[progress].question"
          :id="questions[progress].choices[index]"
          v-model="answer"
          @change="answerSelected(item)"
        />
        {{ item }}
      </label>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Question } from "./quiz.vue";

const answer = ref<string>("");

defineProps<{
  questions: Question[];
  progress: number;
}>();

const emit = defineEmits(["answerSelected"]);
const answerSelected = (answer: string) => emit("answerSelected", answer);
</script>
