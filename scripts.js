function displayBook({book, author}){
    let tableBody = document.querySelector('#table-body');
    let tableRow = document.createElement('tr');
    tableRow.id = 'table-row'
    let textNode = `
        <td> ${book} </td>
        <td> ${author} </td>
        <td>
            <button class="btn btn-sm btn-danger delete">X</button>
        </td>
    `;

    tableRow.innerHTML = textNode;
    tableBody.appendChild(tableRow);
}

// Store Class: Handles Storage/Local Storage
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(bookName) {
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.book === bookName.trim()){

                books.splice(index, 1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

  }

document.querySelector('#submit').addEventListener('click', (e) => {
    e.preventDefault();
    
    let book = document.querySelector('#book').value;
    let author = document.querySelector('#author').value;

    if(book === '' || author === ''){

        message('Please fillup all fields!', 'danger');
    }else{

        displayBook({book, author});
        Store.addBook({book, author});
        message('Book added!', 'success');
        document.querySelector('#book').value = '';
        document.querySelector('#author').value = '';
    }

})

function message(message, color){
    let container = document.querySelector('#form-container');
    let form = document.querySelector('#form')
    let div = document.createElement('div');
    div.id = 'message';
    div.classList = `bg-${color} text-white`;
    div.innerHTML = `${message}`;

    container.insertBefore(div, form)

    setTimeout(() => {
        let message = document.querySelector('#message');
        message.remove()
    }, 3000);
};

document.querySelector('#table-body').addEventListener('click', (e) => {
    
    if(e.target.classList.contains('delete')){
        Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        e.target.parentElement.parentElement.remove();
        // Remove from Store
        message('Book deleted!', 'success')
    }
})

let bookNewArr = Store.getBooks();
bookNewArr.forEach(book => displayBook(book));