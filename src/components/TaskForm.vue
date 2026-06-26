<script setup lang="ts">
import {ref} from 'vue';


const taskName = ref('')
const emit = defineEmits<{add: [title: string]}>()

const handleAdd=()=>{
    if (!taskName.value.trim()) return

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