import { useState } from 'react'

const BlogForm = ({ createBlog, currentUser }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      user: currentUser
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>title: <input value={title} onChange={({target}) => setTitle(target.value)} /></div>
        <div>author: <input value={author} onChange={({target}) => setAuthor(target.value)} /></div>
        <div>url: <input value={url} onChange={({target}) => setUrl(target.value)} /></div>

        <button type="submit">create</button>
      </form>

    </div>
  )
}



export default BlogForm