const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 1
    ? blogs[0].likes
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const blogLikes = blogs.map(blog => blog.likes)
  return blogs[blogLikes.indexOf(Math.max(...blogLikes))]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
