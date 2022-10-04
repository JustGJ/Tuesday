import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import types from './typeDefs';
import resolvers from './resolvers';
import { typeDefs as scalarsTypedefs, resolvers as scalarsResolvers } from 'graphql-scalars';

const schema = makeExecutableSchema({
  typeDefs: [types, ...scalarsTypedefs],
  resolvers: { ...resolvers, ...scalarsResolvers },
});
const server = new ApolloServer({ schema });
server.listen({ port: 4000 }, () => {
  console.log('connected');
});
