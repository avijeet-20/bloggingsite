import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import dotenv from 'dotenv';
import { signing } from 'hono/utils/jwt/jws';
import {siginInput, signupInput} from '../../node_modules/rohitraj/dist/types'
//reading the .env file
 
export  const user = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string,
	},Variables:{
    userId:string
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



user.post('signin', async (c) => {
  const prisma = await new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
 
const zodSchema = siginInput.safeParse(body);

if(!zodSchema.success){
  c.status(422)
  return c.json({msg:'incorrect inputs!'})
}

  const password = await digestMessage(body.password);

  const user = await prisma.user.findUnique({where:{
      email:body.email,
      password:password
    }})


    if(!user){
      return c.json({message:"error while singing in"})
    }
    
    const jwt = await sign({id:user?.id},c.env.JWT_SECRET);
    console.log(c.req.header);
    console.log(c.req.header('authorization'));

    return c.text(jwt);

})

user.post('signup', async (c) => {

  const prisma =  new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const body = await c.req.json();
  console.log(body);
  const zodSchema = signupInput.safeParse(body);
console.log(zodSchema)
  if(!zodSchema.success){
    c.status(422)
    return c.json({msg:"incorrect inputs!"})
  }
  
const digestHex = await digestMessage(body.password)
 console.log(digestHex)
 try{
    const creatadUser = await prisma.user.create({
      data:{
        email:body.email,
        name:body.name,
        password:digestHex
      }
    })
     
    const jwt = await sign({id:creatadUser.id},c.env.JWT_SECRET)
  
    return c.text(jwt);
    
 }catch(e){
  console.log(e)
    return c.text("error while signing up")
    
  }
})

