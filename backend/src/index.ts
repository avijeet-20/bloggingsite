import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import dotenv from 'dotenv';
//reading the .env file

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();


async function digestMessage(message:string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}



app.post('api/v1/user/signup', async (c) => {

  const prisma =  new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const body = await c.req.json();

  
const digestHex = await digestMessage(body.password)
 
 try{
    const creatadUser = await prisma.user.create({
      data:{
        email:body.email,
        name:body.name,
        password:digestHex
      }
    })
     
    const jwt = sign({id:creatadUser.id},c.env.JWT_SECRET)
    return c.json({
      message: "user created successfully",
      token :  jwt
    })
    
 }catch(e){
    return c.text("error while signing up")
    console.log(e)
  }
})

app.post('api/v1/user/signin', async (c) => {
  const prisma = await new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const password = await digestMessage(body.password);

   try{
    const user = await prisma.user.findUnique({where:{
      email:body.email,
      password:password
    }})
    const jwt = sign({id:user?.id},c.env.JWT_SECRET);

    return c.json({message:"singing success"})

   }catch(e){
    return c.json({message:"error while signing in"})
   }



  return c.text('hello')
})

app.post('api/v1/blog',(c) => {
  return c.text('hello')
})

app.put('api/v1/blog',(c) => {
  return c.text('hello')
})

app.get('api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

app.get('api/v1/blog/bulk', (c) => {
 return c.text('Hello Hono!')
})

export default app
