import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import dotenv from 'dotenv';

import { user } from './controller/user';
import { blog } from './controller/blog';
//reading the .env file

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string,
	},Variables:{
    userId:string
  }
}>();


app.route('/api/v1/user',user)
app.route('/api/v1/blog',blog)




export default app
