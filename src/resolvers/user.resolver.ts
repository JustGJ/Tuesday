import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  Query: {
    allUsers: () => {
      return prisma.user.findMany({
        include: {
          businesses: true,
        },
      });
    },
    allBusinessHasUsers: () => {
      return prisma.business_has_users.findMany();
    },
    getSingleUser: (__: any, args: any) => {
      return prisma.user.findUnique({
        where: {
          id: args.id,
        },
        include: {
          businesses: {
            include: {
              business: true,
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
    createUser: (__: any, args: any) => {
      return prisma.user.create({
        data: {
          name: args.name,
          lastname: args.lastname,
          email: args.email,
          password: args.password,
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
