<script setup lang="ts">
import { useTodoStore } from '~/stores/todo'

const props = defineProps<{
  task: {
    _id: string
    title: string
    completed: boolean
  }
}>()

const todoStore = useTodoStore()
const toast = useToast()

const onDelete = async () => {
  await todoStore.deleteTask(props.task._id)
  toast.add({
    title: 'Da xoa',
    color: 'neutral'
  })
}
</script>

<template>
  <li class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-all">
    <div class="flex items-center gap-3">
      <UCheckbox
        :model-value="task.completed"
        :ui="{
          base:'h-5 w-5 rounded'
        }"
        class="flex-shrink-0 cursor-pointer"
        @change="todoStore.toggleTask(task._id, task.completed)"
      />
      <span 
        :class="[
          'text-sm font-medium transition-all',
          task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'
        ]"
      >
        {{ task.title }}
      </span>
    </div>
    
    <UButton
      color="success"
      variant="ghost"
      icon="i-heroicons-trash"
      size="sm"
      square
      @click="onDelete"
    />
  </li>
</template>