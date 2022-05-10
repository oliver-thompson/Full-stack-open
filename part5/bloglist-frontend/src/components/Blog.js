import React from 'react'

import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({blogObj}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [blog, setBlog] = useState(blogObj)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none' }

  const viewBlog = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    const newBlog = {...blog, likes: blog.likes + 1 }

    blogService.update(blog.id, newBlog)
      .then(setBlog(newBlog))
  }

  return(
    <div style={blogStyle}>

      <div style={hideWhenVisible}>
        <div>
          {blog.title} {blog.author} <button onClick={viewBlog}>view</button>
        </div>
      </div>

      <div style={showWhenVisible}>

        <div>
          {blog.title} {blog.author} <button onClick={viewBlog}>hide</button>
        </div>

        <div>
          {blog.url}
        </div>

        <div>
          likes {blog.likes} <button onClick={addLike}>like</button>
        </div>

        <div>
          {blog.user.name}
        </div>

      </div>

    </div>
  )

}
  


export default Blog