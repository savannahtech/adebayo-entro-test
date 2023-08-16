import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';
const secret = process.env.NEXTAUTH_SECRET;

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (req.method === "GET") {
            const task = await prisma.task.findUnique({
                where: {
                    id: Number(req.query.taskId),
                },
                include: { assignee: true }
            });
      
            if(task !== null) {
              let relatedTasks = [];
              if(task?.relatedTasks !== null){
                const relatedIds = task?.relatedTasks.split(',')
                const idsInt = [];
                for (let i = 0; i < relatedIds.length; i++) {
                  idsInt.push(Number(relatedIds[i]));
                }
                relatedTasks = await prisma.task.findMany({
                  where: {
                    id: { in: idsInt }, 
                  }
                })
              }
              
              res.json({...task, relatedTasks: relatedTasks});



            } else {
              res.status(404).send({ error: "No Task Found" });
            }
          } else if (req.method === "POST") {
            const { name } = req.body;
      
            if (!name) {
              return res
                .status(400)
                .send({ error: "Missing 'name' value in request body" });
            }
      
            const result = await prisma.task.create({
              data: {
                name: name, 
              //   author: { connect: { email: session?.user?.email } },
              },
            });
      
            res.json(result);
          } else {
            res.status(405).send({ error: "Method Not Allowed" });
          } 
    } catch (error) {
        console.log(error) 
        res.status(500).send({ error });
    }
    
  
}