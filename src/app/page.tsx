'use client'
import { Suspense, use, useState } from "react";
import AddTask from "@/components/addTask";
import { DeleteTask, GetTasks, ToggleTask } from "@/utils/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Pagination, Table } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import type {  TableProps } from 'antd';
import { PaginationType, Task } from "@/types/task";

export default  function Home() {


  const [pagination, setPagination] = useState<PaginationType>({
    limit: 10,
    page: 0,
  });
  const [task, setTask] = useState<any>(null);
  const {data:tasks, isLoading, isError} = useQuery({
          queryKey: ['tasks',pagination.limit,pagination.page],
          queryFn: ()=>GetTasks(pagination.limit,pagination.page),});

  const queryClient = useQueryClient();

  const {mutateAsync}=useMutation({
    mutationFn: async (id: number) => {
      return await ToggleTask(id)
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['tasksStat']});
      queryClient.invalidateQueries({queryKey: ['tasks']});
    }
  });

  const {mutateAsync: deleteTask}=useMutation({
    mutationFn: async (id: number) => {
      return await DeleteTask(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['tasksStat']});
      queryClient.invalidateQueries({queryKey: ['tasks']});

    }
  });

  const columns: TableProps<Task>['columns']=[
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'content',
      key: 'description',
      // hidden: true,
      render: (text, record) => (
        <div className="text-gray-500 truncate">
          {record.content}
        </div>
      ),
    },
    {
      title:'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (text, record) => (
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${record.priority === 15 ? 'bg-red-500' : record.priority < 15 && record.priority >10 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
          <span className="ml-2">{record.priority}</span>
        </div>
      ),
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.priority - b.priority,
      filters: [
        {
          text: 'High',
          value: 15,
        },
        {
          text: 'Medium',
          value: 10,
        },
        {
          text: 'Low',
          value: 5,
        },
      ]
    },
    ,
    {
      title:'Completed',
      dataIndex: 'done',
      key: 'done',
      render: (text, record) => (
        <div className="flex items-center">
          <input type="checkbox" checked={record.done} onChange={async()=>{
            record.done=!record.done;
            await mutateAsync(record.id);
          }} className="w-4 h-4 rounded-full text-green-400 border-gray-300 focus:ring-blue-500 hover:cursor-pointer" />
        </div>
      ),
    },
    {
      title:'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <div className="flex items-center">
          <span className={`text-sm font-semibold ${record.done ? 'text-green-500' : 'text-red-500'}`}>{record.done ? 'Completed' : 'Pending'}</span>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className="flex gap-2">
          <Button icon={<EditFilled />} onClick={() => setTask(record)} className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"></Button>
          <Button icon={<DeleteFilled />} danger onClick={async() => {
            await deleteTask(record.id);
          }} ></Button>
        </div>
      )
    },
  ];



  if(isError || tasks instanceof Error){
    return <div className="text-red-500">Somethings is wrong</div>
  }
  if(isLoading){
    return <div className="flex items-center h-full justify-center text-blue-300"><span>Loading...</span></div>
  }
  return (
    <div className="h-full bg-gray-100 flex overflow-hidden">
      <div className="flex-1 p-4 overflow-x-hidden overflow-y-auto">
        <Suspense fallback={<div className="flex items-center h-full justify-center text-blue-300"><span>Loading...</span></div>}>
          {
            <Table className="h-full" dataSource={tasks?.data} columns={columns} rowKey="id" pagination={
              {
                pageSize: pagination.limit,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                current: pagination.page + 1,
                onShowSizeChange: (current, size) => {
                  setPagination({
                    ...pagination,
                    limit: size,
                    page: current - 1
                  });
                },
                showLessItems: true,
                showPrevNextJumpers: true,
                showTitle: true,
                pageSizeOptions: [5, 10, 20, 50],
                position: ['bottomRight'],
                total: tasks?.data.length,
                onChange: (page, pageSize) => {
                  setPagination({
                    ...pagination,
                    page: page - 1,
                    limit: pageSize
                  });
                },
              }
            } onRow={(record) => {
              return {
                onClick: () => {
                  setTask(record);
                },
              };
            }
            }>
              
            </Table>
          }
        </Suspense>
      </div>
      <div className="w-1/4 bg-blue-100 flex flex-col justify-center px-4">
          <AddTask task={task}/>
      </div>
    </div>
  );
}
