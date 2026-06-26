<script setup lang="ts">
defineProps<{
    task:{
        _id:string
        title:string
        completed:boolean
    }
}>()

const emit = defineEmits<{
    delete: [id: string]
    toggle: [id: string, completed: boolean]
}>()
</script>

<template>
    <li>
        <input
        type="checkbox"
        :checked="task.completed"
        @change="
        emit(
            'toggle',
            task._id,
            task.completed
        )
        "
        />
        <span
        :style="{
            textDecoration:
            task.completed
            ? 'line-through'
            : 'none'
        }"
        >
        {{task.title}}
    </span>
        <button @click="emit('delete', task._id)">
            Xoa
        </button>
    </li>
</template>