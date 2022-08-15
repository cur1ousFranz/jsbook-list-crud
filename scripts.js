const bookArr = [
    {
        book : 'Data Structures',
        author : 'Genshin'
    },
    {
        book : 'Java Tech',
        author : 'Jovo'
    }
];

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

bookArr.forEach(book => displayBook(book));

let submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    let book = document.querySelector('#book').value;
    let author = document.querySelector('#author').value;

    if(book === '' || author === ''){
        message('Please fillup all fields!', 'danger');
    }else{
        displayBook({book, author});
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
        e.target.parentElement.parentElement.remove();
        message('Book deleted!', 'success')
    }
})