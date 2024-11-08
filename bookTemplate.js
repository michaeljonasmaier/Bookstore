function getBookTemplate(indexBook) {
    let bookShelf = document.getElementById('book_shelf');
    let bookPrice = styledBookPrice(indexBook);

    bookShelf.innerHTML += /*html*/`<div id="book_item">
    <div id="book_title">
        <h2>${books[indexBook].name}</h2>
    </div>
    <div id="book_img">
        <img src="./img/buch.png" alt="Book Cover">
    </div>
    <div id="book_info_div" class="pd">
        <div id="book_price_and_likes">
            <p id="book_price">${bookPrice + ' €'}</p>
            <div id="book_like_div">
                <p id="book_num_likes_${indexBook}">${books[indexBook].likes}</p>
                <button id="book_like_btn" onclick="toggleLike(${indexBook})"><img id="book_like_btn_img_${indexBook}" src="" alt=""></button>
            </div>
        </div>
        <div id="book_info">
            <table>
                <tbody>
                    <tr>
                        <td>Author</td>
                        <td id="book_author">${books[indexBook].author}</td>
                    </tr>
                    <tr>
                        <td>Erscheinungsjahr</td>
                        <td id="book_year">${books[indexBook].publishedYear}</td>
                    </tr>
                    <tr>
                        <td>Genre</td>
                        <td id="book_genre">${books[indexBook].genre}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div> 
    
    <div id="comments" class="pd">
                        <h3>Kommentare:</h3>
                        <div id="comment_table_div">
                            <table id="comment_table">
                                <tbody id="comment_table_body_${indexBook}">
                                    
                                </tbody>
                            </table>
                        </div>
                        <div id="write_comment_div">
                            <input id="comment_input_${indexBook}" class="comment-input" type="text" placeholder="Schreibe einen Kommentar...">
                            <button id="comment_btn" onclick="addComment(${indexBook})"><img id="btn_img"
                                    src="./img/papierflieger.png" alt="Senden Button"></button>
                        </div>

                    </div>`

    getComments(indexBook);
    isLiked(indexBook);

}

