import prisma from "@/lib/prisma"

export async function GET(request:Request,{ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    try {
        return Response.json({
            message: 'Task fetched successfully',
            data:(await prisma.task.findUnique({
                where: {
                    id: Number(id)
                }
            }))??{}
        });
    } catch (error) {
        console.log(error)
        return new Response('Failed to fetch task', { status: 500 }) 
    }
}

export async function DELETE(request:Request,{ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    
    try {
        return Response.json({
            message: 'Task deleted successfully',
            data:await prisma.task.delete({
                where: {
                    id: Number(id)
                }
            })
        });
    } catch (error) {
        console.log(error)
        return new Response('Failed to delete task', { status: 500 }) 
    }
}
export async function PATCH(request: Request, { params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!task) {
            return new Response('Task not found', { status: 404 })
        }
        return Response.json({
            message: 'Task updated successfully',
            data:await prisma.task.update({
                where: {
                    id: Number(id)
                },
                data: {
                    done: !task.done
                }
            })
        });
    } catch (error) {
        console.log(error)
        return new Response('Failed to update task', { status: 500 }) 
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const task = await request.json();
    if (!task) {
        return new Response('Task not found', { status: 404 })
    }
    console.log(task);
    try {
        return Response.json({
            message: 'Task updated successfully',
            data:await prisma.task.update({
                where: {
                    id: Number(id)
                },
                data: task
            })
        });
    } catch (error) {
        console.log(error)
        return new Response('Failed to update task', { status: 500 }) 
    }
}