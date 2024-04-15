import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import dotenv from 'dotenv';
//reading the .env file
dotenv.config();


const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

app.get('api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

app.get('api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})

app.post('api/v1/user/signup',(c) => {
  return c.text('hello')
})
app.post('api/v1/user/signin',(c) => {
  return c.text('hello')
})

app.post('api/v1/blog',(c) => {
  return c.text('hello')
})

app.put('api/v1/blog',(c) => {
  return c.text('hello')
})
export default app
