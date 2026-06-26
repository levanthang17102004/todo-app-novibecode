import { defineStore } from 'pinia'

interface Task {
  _id: string
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    keyword: '',
    filter: 'all',
    sort: 'newest'
  }),

  getters: {
    filteredTasks(state): Task[] {
      let result = [...state.tasks]

      if (state.keyword) {
        result = result.filter(task =>
          task.title.toLowerCase().includes(state.keyword.toLowerCase())
        )
      }

      if (state.filter === 'completed') {
        result = result.filter(task => task.completed)
      } else if (state.filter === 'pending') {
        result = result.filter(task => !task.completed)
      }

      if (state.sort === 'newest') {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } else {
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      }

      return result
    },
    total(): number {
      return this.tasks.length
    },
    completedCount(): number {
      return this.tasks.filter(task => task.completed).length
    },
    pendingCount(): number {
      return this.total - this.completedCount
    }
  },

  actions: {
    async fetchTasks() {
      try {
        this.tasks = await $fetch<Task[]>('/api/tasks')
      } catch (err) {
        console.error('Loi lay danh sach task:', err)
      }
    },

    async addTask(title: string) {
      this.loading = true
      try {
        await $fetch('/api/tasks', {
          method: 'POST',
          body: { title }
        })
        await this.fetchTasks()
      } catch (err) {
        console.error('Loi them task:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteTask(id: string) {
      try {
        await $fetch(`/api/tasks/${id}`, { method: 'DELETE' })
        await this.fetchTasks()
      } catch (err) {
        console.error('Loi xoa task:', err)
      }
    },

    async toggleTask(id: string, currentStatus: boolean) {
      try {
        await $fetch(`/api/tasks/${id}`, {
          method: 'PATCH',
          body: { completed: !currentStatus }
        })
        await this.fetchTasks()
      } catch (err) {
        console.error('Loi cap nhat trang thai:', err)
      }
    }
  }
})