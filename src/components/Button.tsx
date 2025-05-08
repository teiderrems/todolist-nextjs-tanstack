"use client"
import { PlusOutlined } from '@ant-design/icons';
import React from 'react'
import { useFormStatus } from 'react-dom'

interface Props {}

function Button() {
    const { pending } =useFormStatus();
    return (
        <button type='submit' className='rounded-md hover:cursor-pointer bg-blue-400 hover:bg-blue-700 p-2' disabled={pending}><PlusOutlined></PlusOutlined>Add</button>
    )
}

export default Button
