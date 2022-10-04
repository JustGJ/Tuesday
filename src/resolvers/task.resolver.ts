import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  Mutation: {
    createTask: (__: any, args: any) => {
      return prisma.task.create({
        data: {
          name: args.name,
          description: args.description,
          status: args.status,
          project: {
            connect: {
              id: args.projectId,
            },
          },
        },
      });
    },
  },
};
