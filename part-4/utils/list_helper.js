const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((accumulator,blog) => {
    return accumulator + blog.likes
  },0)

  return totalLikes;

};
module.exports = { dummy, totalLikes };
