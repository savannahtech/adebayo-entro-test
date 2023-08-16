import prisma from "../../../lib/prisma";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handle(req, res) {

    try {
        if (req.method === "GET") {
            const task = await prisma.task.findUnique({
                where: {
                    id: Number(req.query.taskId),
                },
                include: { assignee: true }
            });
      
            if(task !== null) {
              res.json(task);
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
        res.status(500).send({ error });
    }
    
  
}