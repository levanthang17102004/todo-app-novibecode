<script setup lang="ts">
import { ref } from "vue";

interface Task{
    id: number
    title: string
    completed: boolean
}

const tasks = ref<task[]>([])

const addTask = (title: string) => {

    tasks.value.push({
        id: Date.now(),
        title,
        completed:false
    })
}

const deleteTask = (id: number) => {
  tasks.value = tasks.value.filter(
    task => task.id !== id
  )
}

</script>

<template>
<div>
    <h1>Todo List</h1>

    <TaskForm @add="addTask"/>

    <ul>
        <li
        v-for="task in tasks"
        :key="task.id"> 
        {{task.title}}
    </li>
</ul>
<ul>
  <TaskItem
    v-for="task in tasks"
    :key="task.id"
    :task="task"
    @delete="deleteTask"
  />
</ul>
</div>
</template>