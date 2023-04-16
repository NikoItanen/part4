const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')


describe('When there is some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
    
    test('Blogs are returned as JSON-format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})


describe('Addition of a new blog', () => {
    test('A blog can be added', async () => {
        const blogsAtStart = await helper.blogsInDb()

        await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)
    
        expect(response.body).toHaveLength(blogsAtStart.length + 1)
        expect(titles).toContain('Lisäystesti')
    })
})

describe('Deletion of a blog', () => {
    test('Deleting a blog with a valid id succeeds', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)



        //Checks that there are no duplicating titles after removing operation.
        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

afterAll(()=> {
    mongoose.connection.close()
})