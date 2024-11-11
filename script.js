function init() {
    getFromLocalStorage();
}

function render() {
    let bookShelf = document.getElementById('book_shelf');
    bookShelf.innerHTML = "";
    for (let index = 0; index < books.length; index++) {
        getBookTemplate(index,);
    }

    showAllBooks = false;
    document.getElementById("liked_books_checkbox").setAttribute("onclick", "renderLikedBooksOnly()")
}

function styledBookPrice(indexBook) {
    let bookPrice = books[indexBook].price.toFixed(2);
    bookPrice = "" + bookPrice;
    bookPrice = bookPrice.replace('.', ',');
    return bookPrice;
}

function isLiked(indexBook) {
    if (books[indexBook].liked) {
        document.getElementById(`book_like_btn_img_${indexBook}`).src = "./img/herz.png";
    } else {
        document.getElementById(`book_like_btn_img_${indexBook}`).src = "./img/herz_weiss.png";
    }
}

function toggleLike(indexBook) {
    let numberLikes = books[indexBook].likes;
    let isLiked = books[indexBook].liked;
    let likeImg = document.getElementById(`book_like_btn_img_${indexBook}`);
    if (books[indexBook].liked) {
        numberLikes--;
        isLiked = false;
        likeImg.src = "./img/herz_weiss.png";
        updateLikeNumber(indexBook, -1);
    } else {
        numberLikes++;
        isLiked = true;
        likeImg.src = "./img/herz.png";
        updateLikeNumber(indexBook, 1);
    }
    books[indexBook].likes = numberLikes;
    books[indexBook].liked = isLiked;
    reloadLikedBooks();
    safeToLocalStorage();
}

function updateLikeNumber(indexBook, number) {
    document.getElementById(`book_num_likes_${indexBook}`).innerHTML = books[indexBook].likes + number;
}

function addComment(indexBook) {
    let commentInput = document.getElementById(`comment_input_${indexBook}`)
    let commentValue = commentInput.value;
    let valueObj = {
        "name": "Michi",
        "comment": commentValue,
    }
    books[indexBook].comments.unshift(valueObj);
    getComments(indexBook, books);
    commentInput.value = "";
    safeToLocalStorage();
}

function reloadLikedBooks() {
    if (document.getElementById("liked_books_checkbox").checked) {
        renderLikedBooksOnly();
    }

}

function renderLikedBooksOnly() {
    console.log("sinddrin")
    let bookShelf = document.getElementById('book_shelf');
    bookShelf.innerHTML = "";
    for (let index = 0; index < books.length; index++) {
        if (books[index].liked == true) {
            getBookTemplate(index);
        }
    }
    document.getElementById("liked_books_checkbox").setAttribute("onclick", "render()")
}

function safeToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
}

function getFromLocalStorage() {
    let bookArray = JSON.parse(localStorage.getItem("books"));

    if (bookArray != null) {
        books = bookArray;
    }
}

function addBook(){
    //document.getElementById("#warning").classList.remove("showMsg");
    //document.getElementById("#adding_complete").classList.remove("showMsg");

    let newTitle = document.getElementById("name_input").value;
    let newAuthor = document.getElementById("author_input").value;
    let newYear = document.getElementById("year_input").value;
    let newGenre = document.getElementById("genre_input").value;
    let newPrice = document.getElementById("price_input").value;
    let newComment = document.getElementById("comment_input").value;

    if(newTitle == "" || newAuthor == ""){
        document.getElementById("warning").classList.add("showMsg");
    } else {   
        document.getElementById("warning").classList.remove("showMsg");
        addBookToArray(newTitle, newAuthor, newYear, newGenre, newPrice, newComment)
        document.getElementById("adding_complete").classList.add("showMsg");
    }
    
}

function addBookToArray(newTitle, newAuthor, newYear, newGenre, newPrice, newComment){
    let newBookObj = {
        "name": newTitle,
        "author": newAuthor,
        "likes": 0,
        "liked": false,
        "price": parseFloat(newPrice),
        "publishedYear": parseInt(newYear),
        "genre": newGenre,
        "comments": [
          {
            "name": "",
            "comment": ""
          }
        ]
      }

      if(newComment != ''){
        newBookObj.comments[0].name = "Michi";
        newBookObj.comments[0].comment = newComment;
      }

    books.unshift(newBookObj);
}

function openDialog() {
    document.getElementById("dialog").showModal();
}

function closeDialog() {
    clearDialog()
    document.getElementById("dialog").close();
    render();
}

function bubblingProtection(event){
    event.stopPropagation();
}

function clearDialog(){
    document.getElementById("warning").classList.remove("showMsg");
    document.getElementById("adding_complete").classList.remove("showMsg");
    document.getElementById("name_input").value = "";
    document.getElementById("author_input").value = "";
    document.getElementById("year_input").value = "";
    document.getElementById("genre_input").value = "";
    document.getElementById("price_input").value = "";
    document.getElementById("comment_input").value = "";
}