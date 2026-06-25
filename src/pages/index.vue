<script setup lang="ts">
import { ref } from "vue";

interface Task{
    _id: number
    title: string
    completed: boolean
}

const {
  data:tasks,
  refresh
}= await useFetch('/api/tasks')

const addTask = async (title: string) => {
  await $fetch('/api/tasks', {
    method: 'POST',
    body: {
      title
    }
  })

  refresh()
}

const deleteTask = async (id: string) => {
  await $fetch(`/api/tasks/${id}`, {
    method: 'DELETE'
  })

  refresh()
}

const toggleTask =async(
  id:string,
  completed:boolean
)=>{
  await $fetch('/api/tasks/${id}',{
    method:'PATCH',
    body:{
      completed: !completed
    }
  })

refresh()

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
    :key="task._id"
    :task="task"
    @delete="deleteTask"
    @toggle="toggleTask"
  />
</ul>
</div>
</template>