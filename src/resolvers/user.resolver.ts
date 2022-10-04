
import { prisma } from '../prismaclient'
import '../../prisma/middleware/user.middleware'
import bcrypt from "bcrypt";

const comparePassword = (password: string, hash: string, email:string) => {

  return new Promise((resolve, reject) => {
    let res = {
      email: email,
      success: false
    }
    bcrypt.compare(password, hash, function(err, result) {
      if(result) {
        res.success = true
        resolve(res)
      } else {
        reject(res)
      }
    });
  })}

const resolvers = {
  Query: {
    authentificate: async (_: any, args: any) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email
        }
      })
      if (!user) {
        throw new Error('No user with that email')
      }
      const hash = user?.password || ''

      return await comparePassword(args.password, hash, args.email)
      
    },
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
    changePassword: async (_: any, args: any) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email
        }
      })
      if (!user) {
        throw new Error('No user with that email')
      }
      const hash = user?.password || ''
      const result: any  = await comparePassword(args.password, hash, args.email)
      if(result.success) {
        await prisma.user.update({
          where: {
            email: args.email
          },
          data: {
            password: args.newPassword
          }
        })
        return "Password changed"
      } else {
        return "Wrong password"
      }
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

export default resolvers;