const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog
            .find({}).populate('user', {username:1, name:1})
        response.json(blogs.map(blog => blog.toJSON()))
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
        const user = await User.findById(body.userId)

        if(!user) {
            return response.status(400).json({ error: 'invalid userId'})
        }


        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog.toJSON())
    } catch (error) {
        next(error)
    }
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        throw new Error('Blog not found')
    }
    response.json(blog.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})


blogsRouter.patch('/:id', async (request, response, next) => {
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

module.exports = blogsRouter