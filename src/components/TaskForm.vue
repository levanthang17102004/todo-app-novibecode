<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '~/stores/todo'

const todoStore = useTodoStore()
const taskName = ref('')
const toast = useToast()

const handleAdd = async () => {
  if (!taskName.value.trim()) return

  try {
    await todoStore.addTask(taskName.value)
    taskName.value = ''
    toast.add({
      title: 'Thanh cong!',
      color: 'success'
    })
  } catch (err) {
    toast.add({
      title: 'That bai!',
      color: 'error'
    })
  }
}
</script>

<template>
  <div class="flex gap-2 max-w-md w-full">
    <UInput
      v-model="taskName"
      placeholder="Nhap cang viec can lam..."
      icon="i-heroicons-pencil-square"
      class="flex-1"
      @keyup.enter="handleAdd"
    />
    <UButton
      :loading="todoStore.loading"
      color="primary"
      icon="i-heroicons-plus"
      @click="handleAdd"
    >
      Them
    </UButton>
  </div>
</template>