'use server'

import { Task } from "@/generated/prisma";

async function AddTask(formData: FormData){

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const priority = formData.get('priority') as string

    const task= {
        title,
        content,
        priority: +priority
    };
    const res = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    if (!res.ok) {
        throw new Error('Failed to add task')
    }
    
    return res.json()
}

async function DeleteTask(id: number){
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE'
    })

    if (!res.ok) {
        throw new Error('Failed to delete task')
    }
    return res.json()
}


async function ToggleTask(id: number){
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'PATCH'
    })

    if (!res.ok) {
        throw new Error('Failed to toggle task')
    }
    return true;
}
    
async function UpdateTask(formData: FormData){

    const id = +(formData.get('id') as string)

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const priority = formData.get('priority') as string

    const task= {
        id,
        title,
        content,
        priority: +priority
    };

    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    if (!res.ok) {
        throw new Error('Failed to update task')
    }
    return res.json()
}
async function GetTask(id: number){
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'GET'
    })

    if (!res.ok) {
        throw new Error('Failed to get task')
    }

    return res.json()
}

async function GetTasks(limit=10,page=0):Promise<{data:Task[],message:string} | Error> {
    const res = await fetch(`http://localhost:3000/api/tasks?limit=${limit}&page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (!res.ok) {
        throw new Error('Failed to get tasks')
    }
    return res.json()
}

async function GetStats(){
    try {
        const res = await fetch('http://localhost:3000/api/tasks/stats', {
            method: 'GET'
        })
        if (res.ok) {
            return res.json();
        }
    } catch (error) {
        console.log(error);
        return {
            totalTasks:0,
            completedTasks:0,
            pendingTasks:0
        }
    }
}

export { AddTask, DeleteTask, ToggleTask, UpdateTask, GetTask,GetTasks,GetStats }