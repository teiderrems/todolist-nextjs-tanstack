'use client'
import { GetStats } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

function TaskStat( ){
    const {data, isLoading, isError} = useQuery({
        queryKey: ['tasksStat'],
        queryFn: GetStats,
    });
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Something went wrong</div>
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Task Statistics</h1>
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Total Tasks: {data.data?.totalTasks}</h2>
                <h2 className="text-xl font-bold">Completed Tasks: {data.data?.completedTasks}</h2>
                <h2 className="text-xl font-bold">Pending Tasks: {data.data?.pendingTasks}</h2>
            </div>
        </div>
        
    )
}

export default TaskStat
