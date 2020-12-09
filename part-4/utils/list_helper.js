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
  const likes = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...likes);
  const mostLiked = blogs.find((blog) => blog.likes === mostLikes);
  const blog = {
    name: mostLiked.name,
  };
  return mostLiked;
};

const mostCommon = (array) => {
    let mf = 1;
    let m = 0;
    let item = array[0];
  
    for (let i = 0; i < array.length; i++) {
      for (let j = i; j < array.length; j++) {
        if (array[i] == array[j])
          m++;
        if (mf < m) {
          mf = m;
          item = array[i];
        }
      }
      m = 0;
    }
    return {item,mf}
  }
  

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  //get most repeated author
  const mostBlogs = mostCommon(authors)
  return {author:mostBlogs.item,blogs:mostBlogs.mf}
 
};



module.exports = { dummy, totalLikes, mostLiked,mostBlogs };
