var express = require('express');
var router = express.Router();

let booklist = [{
  id: 1,
  name: "book1",
  price: 123
},{
  id: 2,
  name: "book2",
  price: 200
},{
  id: 3,
  name: "book3",
  price : 150
}
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(booklist);
});
router.put('/', function(req, res, next){
  let book = req.body;
  book.id = getNewId(booklist)
  res.json(book);
  booklist.push(book);
})
router.delete('/:id', function(req, res, next){
  let id = parseInt(req.params.id);
  let index = booklist.findIndex(item=>{return item.id == id})
  if (index >=0 ){
    let books = booklist.splice(index ,1)
    //console.log(books[0])
    //res.send("Delete book: " + books[0].name);
    res.json({});
  } else {
    res.json({"code":500,"msg":"Can't find book id."});
  }
})

function getNewId(books){
  id = 0;
  for(book of books){
    if(book.id > id) id = book.id;
  }
  return ++id;
}
module.exports = router;
