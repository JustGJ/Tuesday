import { projects } from './../../prisma/datas';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  Query: {
    allTasksFromProject: (__: any, args: any) => {
      return prisma.task.findMany({
        where: {
          projectId: args.projectId,
        },
      });
    },
    allTasksFromUser: (__: any, args: any) => {
      return prisma.task.findMany({
        include: {
          users: {
            where: {
              userId: args.userId,
            },
          },
        },
      });
    },
  },
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
    updateTask: (__: any, args: any) => {
      return prisma.task.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          description: args.description,
          status: args.status,
        },
      });
    },
    deleteTask: (__: any, args: any) => {
      return prisma.task.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
