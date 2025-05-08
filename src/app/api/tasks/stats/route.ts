import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const tasks = await prisma.task.findMany({});
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter((task) => task.done).length;
        const pendingTasks = totalTasks - completedTasks;

        return Response.json({
            message: 'Tasks stats fetched successfully',
            data: {
                totalTasks,
                completedTasks,
                pendingTasks,
            },
        });
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch tasks stats', { status: 500 });
    }
}