
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import dotenv from 'dotenv';



export  const blog = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string,
	},Variables:{
    userId:string
  }
}>();


 blog.use('*', async (c,next) => {
 
    const jwt = c.req.header("authorization") || "" ;
    console.log(jwt);
    const token = jwt.split(" ")[1];
    console.log(token)
    const decoded = await verify(token ,c.env.JWT_SECRET);
    const userId = decoded.id;
  
    if(!userId){
      c.status(403);
      return c.json({message:"user not authorized"})
    }else{
      c.set('userId',userId);
      await next();
    }
})

blog.post('/', async (c) => {
    const prisma = new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
    
    const body = await c.req.json();
    const user = c.get('userId');
    console.log(user);

    try{
        const created = await prisma.post.create({
            data:{
            title:body.title,
            content: body.content,
            authorId: user
         }})
         console.log(created.id);
         return c.json({message: "blogpost created succeessfully"})
        
        }catch(e){
            return c.json({message:"something went wrong! see logs for more details"})
        }
 
  })
  
blog.put('/' , async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const user = c.get('userId');

    try{
        const updated = await prisma.post.update({
            where:{
                id:body.id,
            },
            data:{
                title: body.title,
                content: body.content
            }
        })
        return c.json({message: "post updated successfully"})
    }catch(e){
        console.log(e)
        return c.json({message:"error while updating posts! see logs for more details"})
    }
  })

  blog.get('/bulk', async (c) => {
    const prisma = await new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const posts = await prisma.post.findMany();
        console.log(posts)
        return c.json(posts);
    }catch(e){
        console.log(e)
        return c.json({message:"error fetching the blogs! see logs for more details"})
    }
    

   })
  
blog.get('/:id', async (c) => {
    const prisma = await new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const id = c.req.param('id');

    try{
        const found = await prisma.post.findUnique({where:{
            id:id,
        }})
        return c.json(found);
    }catch(e){
        console.log(e);
        return c.json({message:"something went wrong"})
    }
  
  })
  
