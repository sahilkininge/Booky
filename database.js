const books = [
    {
     ISBN:"12345Book",
     title:"grtting started with MERN",
     pubDate:"2021-07-07",
     language:"en",
     numPage:250,
     author: [1,2],
     publication:[1],
     category: ["tech", "programming", "education", "thriller"]
    },
];

const author = [
    {
     id:1,
     name: "sahil",
     books:["12345Book", "12345secret"],
    },

    {
     id:2, 
     name: "mansee",
     books:["12345Book"],  
    },
];

const publication = [
    {
     id:1,
     name: "writex",
     books:["12345Book"],
    },
];

module.exports = {books, author, publication};
