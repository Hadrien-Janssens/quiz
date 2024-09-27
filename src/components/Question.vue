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
        v-for="(item, index) in mixedArray"
        :key="index"
      >
        <input
          type="radio"
          :name="questions[progress].question"
          :id="questions[progress].choices[index]"
          @change="answerSelected(item)"
        />
        {{ item }}
      </label>
    </article>
    {{ counter }}
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { Question } from "./quiz.vue";
import { randomizeArray } from "@/functions";

const props = defineProps<{
  questions: Question[];
  progress: number;
}>();

const mixedArray = computed(() => {
  return randomizeArray(props.questions[props.progress].choices);
});

const emit = defineEmits(["answerSelected"]);
const answerSelected = (answer: string) => emit("answerSelected", answer);

const counter = ref(0);

console.log(mixedArray.value);

onMounted(() => {
  const interval = setInterval(() => {
    counter.value++;
    console.log(mixedArray.value);
  }, 1000);
});
</script>
