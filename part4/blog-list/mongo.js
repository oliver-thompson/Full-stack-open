const mongoose = require('mongoose')

if (process.argv.length<3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.uaa7u.mongodb.net/blog-list?retryWrites=true&w=majority`

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})
  
const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    name: "first blog",
    author: "david dobrik",
    url: "www.youtube.com",
    likes: 500
})

blog.save().then(result => {
    console.log('blog saved!')
    mongoose.connection.close()
})

