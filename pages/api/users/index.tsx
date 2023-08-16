import prisma from "../../../lib/prisma";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handle(req, res) {

    try {
        if (req.method === "GET") {
            const user = await prisma.user.findMany();
            if (user.length !== 0) {
              res.json(user);
            } else {
              res.status(404).send({ error: "No user Found" });
            }
        }else{
            res.status(405).send({ error: "Method Not Allowed" });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
    
  
}