const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs.map(blog => blog.toJSON()))
    } catch (error) {
        next(error)
    }
})

router.post('/', async (request, response, next) => {
    const body = request.body
  
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    })
  
    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog.toJSON())
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        throw new Error('Blog not found')
    }
    response.json(blog.toJSON())
})

router.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})


router.patch('/:id', async (request, response, next) => {
    const updates = request.body
    
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updates, {new: true})
        if(!updatedBlog) {
            throw new Error('Blog not found')
        }
        response.json(updatedBlog.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = router