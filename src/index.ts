import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers/resolvers';

const prisma = new PrismaClient();

const typeDefs = `
  type Business {
    name: String
    id: Int
    users: [Business_has_users]
    projects: [Project]
  }

  type User {
    name: String
    lastname: String
    email: String
    password: String
    id: Int
    businesses: [Business_has_users]
    projects: [Project_has_users]
    tasks: [User_has_tasks]
    comments: [Comment]
  }

  type Project {
    name: String
    business: Business
    tasks: [Task]
    id: Int
    users: [Project_has_users]
  }

  type Task {
    id: Int
    name: String!
    description: String
    status: String
    projectId: Int
    project: Project
    users: [User_has_tasks]
    comments: [Comment]
  }

  type Comment {
    id: Int
    content: String
    task: Task
    user: User
  }

  type Business_has_users {
    userId: Int
    businessId: Int
    isAdmin: Boolean
    user: User
    business: Business
  }

  type Project_has_users {
    userId: Int
    projectId: Int
    isLeader: Boolean
    user: User
    project: Project
  }

  type User_has_tasks {
    userId: Int
    taskId: Int
    user: User
    task: Task
    percentageDone: Int
    workedTime: Int
  }

  type Query {
    allBusiness: [Business!]!
    allUsers: [User!]!
    allTasksFromProject(projectId: Int): [Task!]!
    allTasksFromUser(userId: Int): [Task!]!
    allBusinessHasUsers: [Business_has_users!]!
    getSingleUser(id: Int!): User
    getSingleBusiness(id: Int!): Business
    getUserBusinesses(userId: Int!): [Business_has_users!]!
    getProject(id: Int!): Project
  }

  type Mutation {
    createUser(name: String!, lastname: String!, email: String!, password: String!): User!
    createBusiness(name: String!): Business!
    createBusinessHasUsers(userId: Int!, businessId: Int!, isAdmin: Boolean!): Business_has_users!
    createBusinessAndUser(businessName: String!, name: String!, lastname: String!, email: String!, password: String!): Business!
    createProject(name: String!, businessId: Int!): Project!
    createTask(name: String!, description: String, status: String, projectId: Int!): Task!
  }
`
;


const server = new ApolloServer({ resolvers, typeDefs });
server.listen({ port: 4000 });