import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  Query: {
    allBusiness: () => {
      return prisma.business.findMany({
        include: {
          users: true,
          projects: true,
        },
      });
    },
    allBusinessHasUsers: () => {
      return prisma.business_has_users.findMany();
    },
    getSingleBusiness: (__: any, args: any) => {
      return prisma.business.findUnique({
        where: {
          id: args.id,
        },
        include: {
          projects: true,
          users: {
            include: {
              user: true,
            },
          },
        },
      });
    },
    getUserBusinesses: (__: any, args: any) => {
      return prisma.business_has_users.findMany({
        where: {
          userId: args.userId,
        },
        include: {
          business: true,
        },
      });
    },
  },
  Mutation: {
    createBusiness: (__: any, args: any) => {
      return prisma.business.create({
        data: {
          name: args.name,
        },
      });
    },
    createBusinessHasUsers: (__: any, args: any) => {
      return prisma.business_has_users.create({
        data: {
          userId: args.userId,
          businessId: args.businessId,
          isAdmin: args.isAdmin,
        },
      });
    },
  },
};
