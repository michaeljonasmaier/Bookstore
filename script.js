function render() {
    let bookShelf = document.getElementById('book_shelf');
    bookShelf.innerHTML = "";
    for (let index = 0; index < books.length; index++) {

        getBookTemplate(index, books);
        showAllBooks = false;
    }
    document.getElementById("liked_books_checkbox").setAttribute("onclick", "renderLikedBooksOnly()")
}

function getComments(indexBook) {
    let commentTableBody = document.getElementById(`comment_table_body_${indexBook}`);
    commentTableBody.innerHTML = "";
    for (let commentNr = 0; commentNr < books[indexBook].comments.length; commentNr++)
        commentTableBody.innerHTML += /*html*/ `
            <tr>
                <td id="comment_author">[${books[indexBook].comments[commentNr].name}]</td>
                <td id="comment">${books[indexBook].comments[commentNr].comment}</td>
            </tr>`;
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
}

function reloadLikedBooks() {
    if(document.getElementById("liked_books_checkbox").checked){
        renderLikedBooksOnly();
    }
    
}

function renderLikedBooksOnly() {
    let bookShelf = document.getElementById('book_shelf');
    bookShelf.innerHTML = "";
    for (let index = 0; index < books.length; index++) {
        if (books[index].liked == true) {
            getBookTemplate(index);
        }
    }
    document.getElementById("liked_books_checkbox").setAttribute("onclick", "render()")
}