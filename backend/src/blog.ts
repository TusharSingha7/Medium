import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
export const blogRouter = new Hono<{
    Bindings: {
	DATABASE_URL: string;
    JWT_SECRET: string;
	},
    Variables : {
        userId : string;
    }
}>();
blogRouter.use('/*', async (c, next) => {
    //middleware
    //checkign the header 
    //if failed return a 403 to the user
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
    const response = await verify(token,c.env.JWT_SECRET);
    if(response){
        c.set("userId",response.id);
        await next();
    }
    else{
      c.status(403);
      return c.json({error: "unauthorized"});
    }
   
});
blogRouter.post('/', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    try{
        const authorId = c.get("userId");
        const body = await c.req.json();
        const blog = await prisma.post.create({
            data :{
                title:body.title,
                content:body.content,
                published:body.published,
                authorId: authorId,
            }
        });
        return c.json({
            msg : "Posted",
            id : blog.id
        })
    }
    catch(err){
        c.status(411);
        return c.json({
            msg : "error posting",
        });
    }
  })
blogRouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    try{
        const body = await c.req.json();
        const blog = await prisma.post.update({
            where : {
                id : body.id
            },
            data :{
                title:body.title,
                content:body.content,
                published:body.published,
            }
        });
        return c.json({
            msg : "Updated",
            id : blog.id
        })
    }
    catch(err){
        c.status(411);
        return c.json({
            msg : "error Updating",
        });
    }
})
blogRouter.get('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    try{
        const body = await c.req.json();
        const blog = await prisma.post.findFirst({
            where : {
                id : body.id
            }
        });
        return c.json({
            blog
        })
    }
    catch(err){
        c.status(411);
        return c.json({
            msg : "not found ",
        });
    }
})
//add pagination (fetch only 10 posts) (fetch more when scrolled down)
blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany();
    return c.json({blogs});
})
