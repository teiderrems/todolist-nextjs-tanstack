'use client'
import React from 'react'
import Button from './Button'
import { Task } from '@/types/task'
import { AddTask as AddTaskAction, UpdateTask } from '@/utils/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddTask({task}:{task?:Task}) {

    const queryClient = useQueryClient()

    const {data,mutateAsync,isError}=useMutation({
        mutationFn: async (formData: FormData) => {
            const title = formData.get('title') as string
            const content = formData.get('content') as string
            const priority = formData.get('priority') as string
            const task= {
                id: +(formData.get('id') as string),
                title,
                content,
                priority: +priority
            };
            if(task.id){
                return await UpdateTask(formData)
            }
            return await AddTaskAction(formData)
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['tasksStat']});
            queryClient.invalidateQueries({queryKey: ['tasks']});
        }
    });
    if(isError){
        return <div className="text-red-500">Somethings is wrong</div>
    }
    if (task) {
        return (
            <form className="flex flex-col gap-4" action={mutateAsync}>
                <h1>Add Or Update Task</h1>
                <input type="hidden" name='id' value={task.id} />
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-gray-700">Title</label>
                    <input type="text" defaultValue={task.title} id="title" name='title' className="border shadow-md border-gray-500 rounded p-2" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="content" className="text-gray-700">Content</label>
                    <textarea id="content" defaultValue={task&&!!task.content?task.content:''} name='content' className="border shadow-md border-gray-500 rounded p-2"></textarea>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="content" className="text-gray-700">Priority</label>
                    <input id="content" type='number' defaultValue={task.priority} name='priority' min={0} max={20} className="border shadow-md border-gray-500 rounded p-2"></input>
                </div>
                <Button />
            </form>
        )
        
    }
    return (
        <form className="flex flex-col gap-4" action={mutateAsync}>
            <h1>Add Or Update Task</h1>
            <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-gray-700">Title</label>
                        <input type="text" id="title" name='title' className="border shadow-md border-gray-500 rounded p-2" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="content" className="text-gray-700">Content</label>
                        <textarea id="content" name='content' className="border shadow-md border-gray-500 rounded p-2"></textarea>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="content" className="text-gray-700">Priority</label>
                        <input id="content" type='number'  defaultValue={0} name='priority' min={0} max={20} className="border border-gray-300 rounded p-2"></input>
                    </div>
                    <Button />
        </form>
    )
}

export default AddTask
