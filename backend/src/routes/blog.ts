import { Context, Hono } from 'hono'
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
    const header = c.req.header("Authorization") || "";
    // console.log(header);
    const token = header;
    const response = await verify(token,c.env.JWT_SECRET);
    if(response){
        // c.set("userId",response.id);
        const pyld = await decode(token).payload;
        const str = JSON.stringify(pyld);
        // console.log(userId);
        const obj = JSON.parse(str);
        const userId = obj.id;
        // console.log(userId);
        c.set("userId",userId);
        await next();
    }
    else{
      c.status(403);
      return c.json({error: "unauthorized"});
    }
   
});
blogRouter.post('/add', async(c)=>{
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
        });
    }
    catch(err){
        c.status(411);
        return c.json({
            msg : "error posting",
        });
    }
  })
blogRouter.put('/:id',async (c)=>{
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
blogRouter.get('/fetch/:id',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    try{
        const id =  c.req.param("id");
        console.log(id);
        const blog = await prisma.post.findFirst({
            where : {
                id : id
            }
        });
        if(!blog){
            c.status(412);
            return c.json({
                msg : "doesnot exist"
            });
        }
        return c.json({
            title : blog?.title,
            content : blog?.content,
            published : blog?.published
        });
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
