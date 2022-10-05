import { prisma } from '../prismaclient'
import '../../prisma/middleware/user.middleware'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const isAuthorized = (password: string, hash: string, email:string) => {

  return new Promise((resolve, reject) => {
    let res = {
      email: email,
      success: false,
      token: ''
    }

    bcrypt.compare(password, hash, function(err, result) {

      if(result) {
        const token = jwt.sign({ email }, process.env.TOKEN as string, { expiresIn: '1h' });
        res.token = token;
        res.success = true
        resolve(res)
      } else {
        reject(res);
      }
    });
  });
};

export const resolvers = {
  Query: {
    authentificate: async (_: any, args: any, context: any) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        throw new Error('No user with that email');
      }
      const hash = user?.password || '';

      const success = await isAuthorized(args.password, hash, args.email)
      return success

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
    getUserBusinesses: (__: any, args: any, context: any) => {
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
    createUser: async(__: any, args: any) => {
      const oldUser = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (oldUser) {
        throw new Error('This mail is already used');
      }

      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          lastname: args.lastname,
          email: args.email,
          password: args.password,
        },
      });

      return newUser
    },
    changePassword: async (_: any, args: any) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        throw new Error('No user with that email');
      }
      const hash = user?.password || ''
      const result: any  = await isAuthorized(args.password, hash, args.email)
      if(result.success) {
        await prisma.user.update({
          where: {
            email: args.email,
          },
          data: {
            password: args.newPassword,
          },
        });
        return 'Password changed';
      } else {
        return 'Wrong password';
      }
    },
    updateUser: async (__: any, args: any) => {
      return await prisma.user.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          lastname: args.lastname,
          email: args.email,
        },
      });
    },
    deleteUser: (__: any, args: any) => {
      return prisma.user.delete({
        where: {
          email: args.email,
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

export default resolvers;
