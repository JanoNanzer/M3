// const bodyParser = require("body-parser");
const express = require("express");
// const routes = require('./routes')
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 0
const server = express();
server.use(express.json());
const pathPost = '/posts' 

server.post(pathPost, (req,res)=>{
    let {author, title, contents} = req.body
    if(author && title && contents){
        let post = {id: id++,author,title,contents,}
        posts.push(post)
        return res.json(post)
    } else {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
})

server.post(`${pathPost}/author/:author`, (req,res)=>{
    let {title, contents} = req.body
    let {author} = req.params
    if(!author || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    let post = {id: id++,author,title,contents,}
    posts.push(post)
    res.json(post)
})

server.get(pathPost, (req,res)=>{
    let {term} =  req.query;
    if(term){
        const termPost = posts.filter((p)=> p.title.includes(term) || p.contents.includes(term))
        return res.json(termPost);
    }
    else res.json(posts);
})

server.get(`${pathPost}/:author`, (req,res)=>{
    let {author} =  req.params;
    if(author){
        const authorPosts = posts.filter((p)=>p.author === author)
        if(authorPosts.length > 0){
            return res.json(authorPosts);
        } else {
            return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
        }
    }
    else return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
})

server.get(`${pathPost}/:author/:title`, (req,res)=>{
    let {author, title} =  req.params;
    if(author && title){
        const atPosts = posts.filter((p)=>p.author === author && p.title === title)
        if(atPosts.length > 0){
            return res.json(atPosts);
        }
        else{
            return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
        }
    }
    else return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
})

server.put(pathPost, (req,res)=>{
    let {id,title, contents} = req.body;
    if(id && title && contents){
        // const putPosts = posts.filter((p)=>p.id === p(id);
        const putPosts = posts.find(p=>p.id === parseInt(id))
        if(putPosts){
            putPosts.title = title,
            putPosts.contents = contents;
            return res.json(putPosts)
        } else {
            return res.status(STATUS_USER_ERROR).json({error: "No se encontro un id equivalente para modificar el Post"})
        }
    } else { 
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }
})

server.delete(pathPost, (req,res)=>{
    let {id} = req.body;
    const idPost = posts.find((p)=>p.id === parseInt(id))
    if(!idPost || !id){
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }
    posts = posts.filter((p)=> p.id !== parseInt(id))
    res.json({ success: true })
})

server.delete('/author', (req,res)=>{
    let {author} = req.body;
    const autPost = posts.find((p)=>p.author === author)
    if(!autPost || !author){
        return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    }
    let deletePosts = []; 
    deletePosts = posts.filter((p)=> p.author === author);
    posts = posts.filter((p)=> p.author !== author);
    return res.json(deletePosts)
    
    // let delete_authors = []
    // posts = posts.filter(p=>{
    //     if(p.author !== author){
    //         return true;
    //     }else{
    //         delete_authors.push(p)
    //     }
    // })
    // return res.json(delete_authors)
})
module.exports = { posts, server };
