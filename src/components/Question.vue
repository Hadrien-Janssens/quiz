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
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { Question } from "./quiz.vue";

const props = defineProps<{
  questions: Question[];
  progress: number;
}>();

const randomizeArray = (array: string[]): string[] => {
  // créer un tableau intermédiaire de 0 à nombreOfElements. ex: [0,1,2,3]
  let newArray: number[] = [];
  let returnArray: string[] = [];
  let arrayLength = array.length;

  for (let i = 0; i < array.length; i++) {
    newArray.push(i);
  }
  while (arrayLength > 0) {
    // prendre un element au hasard dans le tableau. ex : 2
    let randomIndex = Math.floor(Math.random() * arrayLength);
    // prendre l'element du tableau de départ a l'index 2 et le push dans le tableau final
    let randomElement = array.splice(randomIndex, 1);
    returnArray.push(randomElement[0]);
    arrayLength--;
  }
  return returnArray;
};

const mixedArray = computed(() => {
  return randomizeArray(props.questions[props.progress].choices);
});

const emit = defineEmits(["answerSelected"]);
const answerSelected = (answer: string) => emit("answerSelected", answer);
</script>
