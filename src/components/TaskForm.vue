<script setup lang="ts">
const taskName = ref('')

const emit = defineEmits<{add: [title: string]}>()

const handleAdd=()=>{
    if (!taskName.value.strim()) return

    emit('add', taskName.value)

    taskName.value=''
}
</script>

<template>
    <div>
        <input
        v-model="taskName"
        placehoder="Nhap cong viec..."
        />
        <button @click="handleAdd">
            Them
        </button>
    </div>
</template>