<template>
  <div style="margin-bottom: 15px" v-if="questions && questions.length > 0">
    Question : {{ questions[progress].question }} <br />
    <div
      style="
        border: 1px solid;
        padding: 10px;
        display: flex;
        flex-direction: column;
      "
    >
      <label
        :for="questions[progress].question"
        v-for="(item, index) in questions[progress].choices"
        :key="index"
      >
        <input type="radio" :name="questions[progress].question" id="" />
        {{ item }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from "./quiz.vue";

const props = defineProps<{
  questions: Question[];
  progress: number;
}>();
</script>
