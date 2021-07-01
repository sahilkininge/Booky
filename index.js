const express = require("express");

// Database 
const database = require("./database");

//initialisation
const booky = express();

//configuration
booky.use(express.json());

/*
 
 Route          /
 Description    Get all books
 Access         public
 Parameter      none
 Methods        Get

*/
booky.get("/", (req,res) => {
     return res.json({books: database.books});
});

/*
 
 Route          /is
 Description    Get specefic books based on ISBN
 Access         public
 Parameter      ISBN
 Methods        Get

*/
booky.get("/is/:isbn", (req,res) => {
    const getSpeceficBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    
    if(getSpeceficBook.length === 0){
        return res.json({error:`No book found for ISBN of ${req.params.isbn}`});
    }

    return res.json({book: getSpeceficBook});
});

/*
 
 Route          /c
 Description    Get specefic books based on category
 Access         public
 Parameter      category
 Methods        Get

*/
booky.get("/c/:category", (req,res) => {
  const getSpeceficBook = database.books.filter((book) => book.category.includes(req.params.category));
  if(getSpeceficBook.length === 0){
    return res.json({error:`No book found for category of ${req.params.category}`});
}

return res.json({book: getSpeceficBook});
});

/*
 
 Route          /l
 Description    Get specefic books based on language
 Access         public
 Parameter      language
 Methods        Get

*/
booky.get("/l/:language", (req,res) => {
    const getSpeceficBook = database.books.filter((book) => book.language.includes(req.params.language));
  if(getSpeceficBook.length === 0){
    return res.json({error:`No book found for language of ${req.params.language}`});
}

return res.json({book: getSpeceficBook});

});

/*
 
 Route          /author
 Description    Get all authors
 Access         none
 Parameter      language
 Methods        Get

*/
booky.get("/author", (req,res) => {
    return res.json({authors: database.author});
});


/*
 
 Route          /author/book
 Description    Get all authors based on books
 Access         none
 Parameter      ISBN
 Methods        Get

*/
booky.get("/author/book/:isbn",(req,res) => {
    const getSpeceficAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));
    if(getSpeceficAuthor.length === 0){
      return res.json({error:`No author found for book of ${req.params.isbn}`});
  }
  
  return res.json({authors: getSpeceficAuthor});
});


/*
 
 Route          /publications
 Description    Get all publications
 Access         none
 Parameter      none
 Methods        Get

*/
booky.get("/publications", (req,res) => {
    return res.json({publications:database.publication});

});


/*
 
 Route          /book/add
 Description    add new book
 Access         none
 Parameter      none
 Methods        post

*/
booky.post("/book/add",(req,res) => {
  const { newBook } = req.body;
  database.books.push(newBook);
  return res.json({books: database.books});
});

/*
 
 Route          /author/add
 Description    add new author
 Access         none
 Parameter      none
 Methods        post

*/
booky.post("/author/add",(req,res) => {
    const { newAuthor } = req.body;
  database.author.push(newAuthor);
  return res.json({authors: database.author});
});


/*
 
 Route          /book/update/title
 Description    update book title
 Access         none
 Parameter      isbn
 Methods        put

*/
booky.put("/book/update/title/:isbn",(req,res) => {
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn){
      book.title = req.body.newBookTitle;
      return;
    }
  });

  return res.json({books: database.books})
});


/*
 
 Route          /book/update/author
 Description    update/add new author for a book
 Access         none
 Parameter      isbn
 Methods        put

*/
booky.put("/book/update/author/:isbn/:authorId", (req,res) => {
   //update book database
   database.books.forEach((book) => {
      if(book.ISBN === req.params.isbn) {
        return book.author.push(parseInt(req.params.authorId));
      }
   });
   // update author database

   database.author.forEach((author) => {
     if(author.Id === parseInt(req.params.authorId))
     return author.books.push(req.params.isbn);
   });

   return res.json({books: database.books, author: database.author}); 
});



booky.listen(3000, () => console.log("server connected ✔")) 