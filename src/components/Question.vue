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
    <article>
      Temps restant :
      {{ counter }} sec
    </article>
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

const emit = defineEmits(["answerSelected", "overTime"]);
const answerSelected = (answer: string) => emit("answerSelected", answer);
const overTime = () => emit("overTime");

const counter = ref(10);

const mixedArray = computed(() => {
  return randomizeArray(props.questions[props.progress].choices);
});

onMounted(() => {
  const interval = setInterval(() => {
    counter.value--;
    if (counter.value === 0) {
      clearInterval(interval);
      overTime();
    }
  }, 1000);
});
</script>
