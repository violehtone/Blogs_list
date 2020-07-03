const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => {
    likes += blog.likes
  })

  return likes
}

const favoriteBlog = (blogs) => {
  var favorite = blogs[0]

  blogs.forEach(blog => {
    if(blog.likes > favorite.likes) {
      favorite = Object.assign(blog)
    }
  })
  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}