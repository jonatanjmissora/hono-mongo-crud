import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'; 
import { logger } from 'hono/logger';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './user-controllers.js';
import { zUserValidator } from './user-validator.js';

const appUsers = new Hono().basePath('/users')
appUsers.use(poweredBy())
appUsers.use(logger())

appUsers.get('/', (c) => getAllUsers(c))
appUsers.get('/:id', (c) => getUserById(c))
appUsers.post("/", zUserValidator, (c) => createUser(c))
appUsers.patch('/:id', zUserValidator, (c) => updateUser(c))
appUsers.delete('/:id', (c) => deleteUser(c))

appUsers.onError((err, c) => c.text(`Error: ${err.message}`, 500))

export default appUsers
