import jwt from 'jsonwebtoken';
import { prisma } from '../prismaclient'
import '../../prisma/middleware/user.middleware'
import { main } from '../forgottenPassword';

export const resolvers = {
  Query: {
    forgottenPassword: async (_: any, args: any, context: any) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      console.log(user)
      if (!user) {
        throw new Error('No user with that email');
      }

      const token = jwt.sign({ email: args.email }, process.env.TOKEN as string, { expiresIn: '1h' });
      const success = await main(token, args.email);

      return { success: success, email: args.email };
    }
  }
}

export default resolvers;












