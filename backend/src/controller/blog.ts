
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import dotenv from 'dotenv';
import { createPostInput, updatePostInput } from 'rohitraj/dist/types';



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


    const decoded = await verify(jwt ,c.env.JWT_SECRET);
    const userId = decoded.id;
  
    if(!userId){
      c.status(403);
      return c.json({message:"user not logged in"})
    }else{
      c.set('userId',userId);
      await next();
    }
})

blog.post('/', async (c) => {
    const prisma = new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
    
    const body = await c.req.json();
    const user = c.get('userId');

    const zodSchema = createPostInput.safeParse(body);

if(!zodSchema.success){
  c.status(422)
  return c.json({msg:'incorrect inputs!'})
}

    console.log(user);

    try{
        const created = await prisma.post.create({
            data:{
            title:body.title,
            content: body.content,
            authorId: user,
         }})
         console.log(created.id);
         return c.json({created})
        
        }catch(e){
            return c.json({message:"something went wrong! see logs for more details",
                
            })
        }
 
  })
  
blog.put('/' , async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const user = c.get('userId');
    const zodSchema = updatePostInput.safeParse(body);

    if(!zodSchema.success){
      c.status(422)
      return c.json({msg:'incorrect inputs!'})
    }
    
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
        const posts = await prisma.post.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        console.log(posts)
        return c.json({posts});
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
        },
    select:{
        id:true,
        title:true,
        content:true,
        author:{
            select:{
                name:true
            }
        }
    }})
        return c.json(found);
    }catch(e){
        console.log(e);
        return c.json({message:"something went wrong"})
    }
  
  })
  
