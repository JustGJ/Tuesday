import  {faker}  from '@faker-js/faker';


export const users = [
  {
    name: `${faker.name.firstName()}`,
    lastname: `${faker.name.lastName()}`,   
    email:  `${faker.internet.email()}`  , 
    password: 'test123'
  },
  {
    name: `${faker.name.firstName()}`,
    lastname: `${faker.name.lastName()}`,   
    email:  `${faker.internet.email()}`  , 
    password: 'test123'
  },
  {
    name: `${faker.name.firstName()}`,
    lastname: `${faker.name.lastName()}`,   
    email:  `${faker.internet.email()}`  , 
    password: 'test123'
  }
]
export const businesses = [
  {
    name: `${faker.company.name()}`,
  },
  {
    name: `${faker.company.name()}`,
  },
  {
    name: `${faker.company.name()}`,
  }
]

export const relation_businesses = [
  {
    isAdmin: true,
    userId: 1,
    businessId: 1,
  },
  {
    isAdmin: true,
    userId: 2,
    businessId: 2,
  },
  {
    isAdmin: true,
    userId: 3,
    businessId: 3,
  }
]
export const projects = [
  {
    name: `${faker.animal.type()}`,
    businessId: 1,
  },
  {
    name: `${faker.animal.type()}`,
    businessId: 2,
  },
  {
    name: `${faker.animal.type()}`,
    businessId: 3,
  }
]
export const tasks = [
  {
    name: `${faker.commerce.productName()}`,
    projectId: 1,
    description: `${faker.commerce.productDescription()}`,
    status: `Todo`
  },
  {
    name: `${faker.commerce.productName()}`,
    projectId: 2,
    description: `${faker.commerce.productDescription()}`,
    status: `Todo`
  },
  {
    name: `${faker.commerce.productName()}`,
    projectId: 3,
    description: `${faker.commerce.productDescription()}`,
    status: `Todo`
  },
]