const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Testi 1',
        author: 'Testaaja 1',
        url: 'http://www.testiblogi1.com',
        likes: 10
    },
    {
        title: 'Testi 2',
        author: 'Testaaja 2',
        url: 'http://www.testiblogi2.com',
        likes: 12
    }
]

const newBlog =
    {
        title: 'Lisäystesti',
        author: 'Lisaaja 1',
        url: 'http://www.testiblogi3.com',
        likes: 12
    }


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
  
module.exports = {
    initialBlogs,
    blogsInDb,
    newBlog
}