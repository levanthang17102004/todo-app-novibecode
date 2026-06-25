<script setup lang="ts">
defineProps<{
    task:{
        id:number
        title:string
        completed:boolean
    }
}>()

const emit = defineEmits<{
    delete: [id: number]
}>()
</script>

<template>
    <li>
        {{task.title}}
        <button @click="emit('delete', task._id)">
            Xoa
        </button>
    </li>
</template>