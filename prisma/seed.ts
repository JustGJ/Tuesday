// @ts-nocheck
import {PrismaClient} from '@prisma/client'
import { users,businesses, relation_businesses ,projects, tasks } from './datas';
const prisma = new PrismaClient();


// Todo
//------------------------------------------------------------------------------------//
//command for generate seed npx prisma db push --force-reset && npx prisma db seed
//-----------------------------------------------------------------------------------// 
const load = async () => {
  try {

  await prisma.$transaction(
  users.map((user) => prisma.user.create({ data: user })),
   );
    console.log(`Added users`);

  await prisma.$transaction(
  businesses.map((business) => prisma.business.create({ data: business })),
   );
    console.log(`Added businesses`);

  await prisma.$transaction(
    relation_businesses.map((relation) => prisma.Business_has_users.create({ data: relation })),
   );
    console.log(`Added businesses_has_users`);
    
  await prisma.$transaction(
    projects.map((project) => prisma.project.create({ data: project })),
   );
    console.log(`Added projects`);

  await prisma.$transaction(
    tasks.map((task) => prisma.task.create({ data: task })),
   );
    console.log(`Added tasks`);

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
load();

