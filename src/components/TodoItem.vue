<template>
  <div
    class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      {{ title }}
    </h5>
    <div>
      <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
        Technology
      </h3>
      <ul
        class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <li
          v-for="(checkbox, index) in checkboxes"
          :key="index"
          class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
        >
          <div class="flex items-center ps-3">
            <input
              :id="checkbox.id"
              type="checkbox"
              v-model="checkbox.checked"
              :checked="checkbox.checked"
              @change="onCheckboxChange(index, $event)"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              :for="checkbox.id"
              class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {{ checkbox.label }}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  checkboxes: {
    type: Array,
    required: true,
    default: () => [],
  },
});


const emit = defineEmits(['update:checkboxes']);

function onCheckboxChange(index, event) {
  const updatedCheckboxes = [...props.checkboxes];
  updatedCheckboxes[index].checked = event.target.checked;
  emit('update:checkboxes', updatedCheckboxes);
}
</script>

<style scoped></style>
