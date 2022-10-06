import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  Query: {
    getProject: (__: any, args: any) => {
      return prisma.project.findUnique({
        where: {
          id: args.id,
        },
        include: {
          business: true,
          tasks: true,
          users: true,
        },
      });
    },
  },
  Mutation: {
    createProject: (__: any, args: any) => {
      return prisma.project.create({
        data: {
          name: args.name,
          business: {
            connect: {
              id: args.businessId,
            },
          },
        },
      });
    },
    updateProject: async (__: any, args: any) => {
      return await prisma.project.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      });
    },
    deleteProject: (__: any, args: any) => {
      return prisma.project.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
