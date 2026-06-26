<script setup lang="ts">
import { ref, computed } from "vue";

interface Task{
    _id: string
    title: string
    completed: boolean
    createdAt: string
    updatedAt: string
}

const {
  data:tasks,
  refresh
}= await useFetch<Task[]>('/api/tasks',{
  default: () =>[]
})

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
  await $fetch(`/api/tasks/${id}`,{
    method:'PATCH',
    body:{
      completed: !completed
    }
  })

refresh()

}

const keyword = ref('')
const filter = ref('all')
const sort = ref('newest')

const filteredTasks =computed(()=>{
  if(!tasks.value)return[]

let result =[...tasks.value]

if (keyword.value){
  result = result.filter(task=>
    task.title.toLowerCase().includes(keyword.value.toLowerCase())
  )
}

if(filter.value === 'completed'){
  result = result.filter(task=>task.completed)
}

if(filter.value === 'pending'){
result=result.filter(task=>!task.completed)
}

if (sort.value ==='newest'){
result.sort(
(a,b)=>new Date(b.createdAt).getTime()- new Date(a.createdAt).getTime()
)
}else{
  result.sort(
    (a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime()
  )
}

return result

})

const total = computed(() => tasks.value?.length ?? 0)

const completed = computed(()=>
tasks.value?.filter(task=> task.completed).length ?? 0
)

const pending= computed(()=> total.value - completed.value)

const loading=ref(false)

const addTask = async (title: string)=>{
loading.value=true

try{
  await $fetch('/api/tasks',{
    method: 'POST',
    body:{
      title
    }
  })
  refresh()
}catch(err){
  console.error("loi them task:",err)
}finally{
  loading.value=false
}
}

</script>

<template>
<div>
    <h1>Todo List</h1>

    <TaskForm @add="addTask"/>

<div v-if="loading">Đang xử lý...</div>    

<ul v-if="filteredTasks.length > 0">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task._id"
        :task="task"
        @delete="deleteTask"
        @toggle="toggleTask"
      />
    </ul>
    <div v-else>Ko co cv nao</div>
<input v-model="keyword" placeholder="Tim kiem...."/>
<button @click="filter='all'">Tat ca</button>
<button @click="filter='completed'">hoan thanh</button>
<button @click="filter='pending'">chua hoan thanh</button>

<p>Tong: {{ total }}</p>
<p>Hoan thanh: {{ completed }}</p>
<p>Chua hoan thanh: {{ pending }}</p>
<select v-model="sort">
    <option value="newest">Moi nhat</option>
    <option value="oldest">Cu nhat</option>
</select>
</div>
</template>