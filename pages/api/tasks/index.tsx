import prisma from "../../../lib/prisma";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handle(req, res) {

    try {
        if (req.method === "GET") {
            const tasks = await prisma.task.findMany({include: { assignee: true }});
      
            if (tasks.length !== 0) {
              res.json(tasks);
            } else {
              res.status(404).send({ error: "No Task Found" });
            }
          } else if (req.method === "POST") {
            const { title, description, assignee, relatedTasks } = req.body;
      
            if (!title || !description) {
              return res
                .status(400)
                .send({ error: "Missing 'title' value in request body" });
            }
            
            const result = await prisma.task.create({
              data: {
                title: title,
                description: description,
                assignee: {
                  connect: {
                    id: Number(assignee),
                  }
                  
                },
                relatedTasks: relatedTasks
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