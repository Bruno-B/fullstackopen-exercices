const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((accumulator,blog) => {
    return accumulator + blog.likes
  },0)

  return totalLikes;

};

const mostLiked = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const mostLikes = Math.max(...likes)
    const mostLiked = blogs.find(blog => blog.likes === mostLikes)
    const blog = {
        name:mostLiked.name
    }
    return mostLiked
    
}

module.exports = { dummy, totalLikes ,mostLiked};
