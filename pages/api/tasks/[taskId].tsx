import prisma from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const task = await prisma.task.findUnique({
        where: {
          id: Number(req.query.taskId)
        },
        include: { assignee: true }
      })

      if (task !== null) {
        let relatedTasks = []
        if (task?.relatedTasks !== null) {
          const relatedIds = task?.relatedTasks.split(',')
          const idsInt = relatedIds.map((id: any) => Number(id))
          relatedTasks = await prisma.task.findMany({
            where: {
              id: { in: idsInt }
            }
          })
        }

        res.json({ ...task, relatedTasks: relatedTasks })
      } else {
        res.status(404).send({ error: 'No Task Found' })
      }
    } else {
      res.status(405).send({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  }
}
