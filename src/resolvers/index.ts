import userResolver from './user.resolver';
import businessResolver from './business.resolver';
import projectResolver from './project.resolver';
import taskResolver from './task.resolver';
import { mergeResolvers } from '@graphql-tools/merge';

export default mergeResolvers([userResolver, businessResolver, projectResolver, taskResolver]);
