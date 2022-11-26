import { ref } from "vue";
import { defineStore } from "pinia";

export const useCardStore = defineStore("CardControlls", () => {
  // state
  const DisableNextbutton = ref(false);
  const ResultsCount = ref(0);
  const PagesCount = ref(0);
  const DisableControlls = ref(false);

  return { DisableNextbutton, ResultsCount, PagesCount, DisableControlls };
});