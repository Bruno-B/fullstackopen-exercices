const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((accumulator, blog) => {
    return accumulator + blog.likes;
  }, 0);

  return totalLikes;
};

const mostLiked = (blogs) => {
  if (blogs.length === 0) return null;
  const likes = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...likes);
  const mostLiked = blogs.find((blog) => blog.likes === mostLikes);
  const blog = {
    title: mostLiked.title,
  };
  return mostLiked;
};

const mostCommon = (array) => {
  let mf = 1;
  let m = 0;
  let item = array[0];

  for (let i = 0; i < array.length; i++) {
    for (let j = i; j < array.length; j++) {
      if (array[i] == array[j]) m++;
      if (mf < m) {
        mf = m;
        item = array[i];
      }
    }
    m = 0;
  }
  return { item, mf };
};

const mostBlogs = (blogs) => {
  if(blogs.length === 0 )return null
  const authors = blogs.map((blog) => blog.author);
  //get most repeated author
  const mostBlogs = mostCommon(authors);
  return { author: mostBlogs.item, blogs: mostBlogs.mf };
};

const mostLikes = (blogs) => {
  const sortArray = blogs.sort((a, b) => (a.author > b.author ? 1 : -1));
  let sum = sortArray[0].likes;
  let highestLikes = 0;
  let highestAuthor;

  for (let i = 0; i < sortArray.length - 1; i++) {
    if (sortArray[i].author === sortArray[i + 1].author) {
      sum += sortArray[i + 1].likes;
    } else {
      sum = sortArray[i + 1].likes;
    }
    if (sum > highestLikes) {
      highestLikes = sum;
      highestAuthor = sortArray[i + 1].author;
    }
  }
  return { author: highestAuthor, likes: highestLikes };
};

module.exports = { dummy, totalLikes, mostLiked, mostBlogs, mostLikes };
