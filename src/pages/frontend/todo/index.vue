<!--
 * @Author       : zuohy
 * @Date         : 2024-08-29 09:04:36
 * @LastEditTime : 2024-08-29 17:43:40
 * @LastEditors  : zuohy
 * @Description  : 
-->

<template>
  <Header></Header>
  <main class="container max-w-screen-xl mx-auto p-4 px-6">
    <button
      data-drawer-target="sidebar-multi-level-sidebar"
      data-drawer-toggle="sidebar-multi-level-sidebar"
      aria-controls="sidebar-multi-level-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span class="sr-only">Open sidebar</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>

    <aside
      id="sidebar-multi-level-sidebar"
      class="fixed top-70 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path
                  d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
                />
                <path
                  d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
                />
              </svg>
              <span class="ms-3">Dashboard</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>

    <div class="p-4 sm:ml-64">
      <div
        class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div
            class="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800"
          >
            <TodoItem  title="task1"
            @update:checkboxes="onCheckboxesUpdate"
            :checkboxes="checkboxes"></TodoItem>
          </div>
          <div
            class="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800"
          >
           
            <TaskContent></TaskContent>
          </div>
        </div>
      </div>
    </div>
  </main>

</template>

<script setup>
import Header from "@/layouts/frontend/components/Header.vue";
import Footer from "@/layouts/frontend/components/Footer.vue";
import TodoItem from "@/components/TodoItem.vue";
import TaskContent from "@/components/TaskContent.vue"
import { ref } from 'vue';

const checkboxes = ref([
  { id: 'vue', label: 'Vue JS', checked: false },
  { id: 'react', label: 'React', checked: false },
  { id: 'angular', label: 'Angular', checked: false },
  { id: 'laravel', label: 'Laravel', checked: false }
]);

function onCheckboxesUpdate(updatedCheckboxes) {
  console.log("updatedCheckboxes", updatedCheckboxes)
  checkboxes.value = updatedCheckboxes;
}
</script>
