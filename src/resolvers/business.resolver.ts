import { PrismaClient } from '@prisma/client';
import { isNamedType } from 'graphql';

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
    getUserBusinesses: (__: any, args: any, context: any) => {
      return prisma.business_has_users.findMany({
        where: {
          userId: context.user.id,
        },
        include: {
          business: true,
        },
      });
    },
  },
  Mutation: {
    createBusiness: async (__: any, args: any, context: any) => {
      const oldBusiness = await prisma.business.findUnique({
        where: {
          name: args.name,
        },
      });
      if (oldBusiness) {
        throw new Error('Business already exists');
      }
      const business: any = await prisma.business.create({
        data: {
          name: args.name,
        },
      });

      await prisma.business_has_users.create({
        data: {
          businessId: business.id,
          userId: context.user.id,
          isAdmin: true,
        },
      });
      return business;
    },
    updateBusiness: async (__: any, args: any, context: any) => {
      const isAdmin = await prisma.business_has_users.findMany({
        where: {
          businessId: args.id,
          userId: context.user.id,
          isAdmin: true
        }
      })
      
      if(!isAdmin) {
        throw new Error('You are not an admin of this business')
      }

      return await prisma.business.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      });
    },
    deleteBusiness: async(__: any, args: any, context: any) => {
      const isAdmin = await prisma.business_has_users.findMany({
        where: {
          businessId: args.id,
          userId: context.user.id,
          isAdmin: true
        }
      })
      
      if(!isAdmin) {
        throw new Error('You are not an admin of this business')
      }

      return prisma.business.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
