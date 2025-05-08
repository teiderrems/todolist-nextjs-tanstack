'use client'
import { Task } from '@/types/task'
import { ToggleTask } from '@/utils/actions'
import React, { useEffect } from 'react'

function TaskItem({task,children}:{task:Task,children?:React.ReactNode}) {

    const [state, setState] = React.useState<Task>(task);

    const Toggle= async (id: number) => {
        const res:boolean|Error = await ToggleTask(id);
        if (res) {
            console.log(res);
            setState((prevState) => ({
                ...prevState,
                done: !prevState.done
            }));
        }
    }

    useEffect(() => {}, [state]);

    return (
        <div className="bg-white flex flex-col hover:shadow-md justify-between hover:cursor-pointer rounded-lg h-1/5 w-1/3 p-4">
            <section className='flex justify-between items-center p-1 h-1/3'>
                <h2 className="text-xl font-bold">#{state.id} {state.title}</h2>
                <label htmlFor="done" className='hover:cursor-pointer'>Completed <input type="checkbox" className='hover:cursor-pointer' onChange={()=>ToggleTask(state.id)} checked={state.done} name="done" id="done" /></label>
            </section>
            <hr />
            <section className='flex-1 pt-1'>
                <p className="text-gray-700 truncate">{state.content}</p>

            </section>
            {
                children && (
                    <section className='h-1/3 flex justify-end space-x-3 pr-1'>
                        {children}
                    </section>
                )
            }
        </div>
    )
}

export default TaskItem
