import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const skip = Number(page) * Number(limit);
    const take = Number(limit);
    try {
        return Response.json({
            message: 'Tasks fetched successfully',
            data: await prisma.task.findMany({
                skip,
                take,
                orderBy: {
                    createdAt: 'desc'
                }
            })
        });
    } catch (error) {
        console.log(error)
        return new Response('Failed to fetch tasks', { status: 500 }) 
    }
}

export async function POST(request: Request) {
    const task = await request.json()

    try {
        return Response.json({
            message: 'Task created successfully',
            data: await prisma.task.create({
                data: task
            })
        });
    } catch (error) {
        console.log(error)
        return new Response('Failed to create task', { status: 500 }) 
    }
}