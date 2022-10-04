import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    allBusiness: () => {
      return prisma.business.findMany({
        include: {
          users: true,
          projects: true,
        },
      });
    }, 
    allUsers: () => {
      return prisma.user.findMany({
        include: {
          businesses: true
        }
      });
    },
    allBusinessHasUsers: () => {
      return prisma.business_has_users.findMany();
    },
    getSingleUser: (__ : any, args: any) => {
      return prisma.user.findUnique({
        where: {
          id: args.id
        },
        include: {
          businesses: {
            include: {
              business: true
            }
          }
        }
      })
    },
    getProject: (__ : any, args: any) => {
      return prisma.project.findUnique({
        where: {
          id: args.id
        },
        include: {
          business: true,
          tasks: true,
          users: true
        }
      })  
    },
    getSingleBusiness: (__ : any, args: any) => {
      return prisma.business.findUnique({
        where: {
          id: args.id
        },
        include: {
          projects : true,
          users: {
            include: {
              user: true
            }
          }
        }
      })
    },
    getUserBusinesses: (__ : any, args: any) => {
      return prisma.business_has_users.findMany({
        where: {
          userId: args.userId
        },
        include: {
          business: true
        }
      })
    }
  },
  Mutation: {
    createUser: (__ : any, args : any) => {
      return prisma.user.create({
        data: {
          name: args.name,
          lastname: args.lastname,
          email: args.email,
          password: args.password,
        }
      })
    }, 
    createBusiness: (__ : any, args : any) => {
      return prisma.business.create({
        data: {
          name: args.name, 
        }
      })
    },
    createProject: (__ : any, args : any) => {
      return prisma.project.create({
        data: {
          name: args.name,
          business : {
            connect: {
              id: args.businessId
            }
          }
        }
      })
    },
    createTask: (__ : any, args : any) => {
      return prisma.task.create({
        data: {
          name: args.name,
          description: args.description,
          status: args.status,
          project: {
            connect: {
              id: args.projectId
            }
          }
        }
      })
    },
    createBusinessHasUsers: (__ : any, args : any) => {
      return prisma.business_has_users.create({
        data: {
          userId: args.userId,
          businessId: args.businessId,
          isAdmin: args.isAdmin
        }
      })
    }, 
    createBusinessAndUser: async (__ : any, args : any) => {
    const business = await prisma.business.create({
      data: { 
        name: args.businessName 
      }
    })
    const user = await prisma.user.create({
      data: {
        name: args.name,
        lastname: args.lastname,
        email: args.email,
        password: args.password,
    }})
    return prisma.business_has_users.create({
      data: {
        userId: user.id,
        businessId: business.id,
        isAdmin: true
    }})
  }, 
}
}
