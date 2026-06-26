<script setup lang="ts">
import { useTodoStore } from '~/stores/todo'

const todoStore = useTodoStore()

await todoStore.fetchTasks()

const sortOptions = [
  { value: 'newest', label: 'Moi nhat' },
  { value: 'oldest', label: 'Cu nhat' }
]
</script>

<template>
  <UContainer class="py-10 max-w-xl">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UIcon name="i-heroicons-clipboard-document-check" class="text-primary-500" />
            Todo List
          </h1>
        </div>
      </template>

      <TaskForm class="mb-6" />

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center justify-between mb-6">
        <UInput
          v-model="todoStore.keyword"
          placeholder="Tim kiếe cong viec..."
          icon="i-heroicons-magnifying-glass"
          size="sm"
        />
        
        <USelect
          v-model="todoStore.sort"
          :options="sortOptions"
          size="sm"
        />
      </div>

      <div class="flex gap-1 mb-4">
        <UButton :variant="todoStore.filter === 'all' ? 'solid' : 'soft'" size="xs" @click="todoStore.filter = 'all'">Tat ca</UButton>
        <UButton :variant="todoStore.filter === 'completed' ? 'solid' : 'soft'" color="success" size="xs" @click="todoStore.filter = 'completed'">Hoan thanh</UButton>
        <UButton :variant="todoStore.filter === 'pending' ? 'solid' : 'soft'" color="error" size="xs" @click="todoStore.filter = 'pending'">Chua xong</UButton>
      </div>

      <ul v-if="todoStore.filteredTasks.length > 0" class="space-y-2 mb-6">
        <TaskItem
          v-for="task in todoStore.filteredTasks"
          :key="task._id"
          :task="task"
        />
      </ul>
      
      <div v-else class="text-center py-8 text-gray-400 dark:text-gray-500 text-sm border border-dashed border-gray-200 dark:border-gray-700 rounded-lg mb-6">
        <UIcon name="i-heroicons-inbox" class="text-3xl mb-1 block mx-auto" />
        Khong co cong viec.
      </div>

      <template #footer>
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
          <div>Tong so: <span class="text-gray-900 dark:text-white font-bold">{{ todoStore.total }}</span></div>
          <div class="text-green-500">Da xong: <span class="font-bold">{{ todoStore.completedCount }}</span></div>
          <div class="text-orange-500">Chua xong: <span class="font-bold">{{ todoStore.pendingCount }}</span></div>
        </div>
      </template>
    </UCard>

    <UNotifications />
  </UContainer>
</template>