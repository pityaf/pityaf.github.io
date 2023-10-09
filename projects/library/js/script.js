class Book {
    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
    }

    get info() {
        return `${this.title} by ${this.author}, ${this.read}`;
    }

    get name() {
        return this.title;
    }
    get writer() {
        return this.author;
    }
    get status() {
        return this.read;
    }

    changeStatus() {
        console.log('change')
        switch(this.status) {
            case 'Read':
                this.read = 'Not read'
                break;
            case 'Not read':
                this.read = 'Read';
                break;
        }
    }
}

class Library {
    constructor() {
        this.library = [];
    }

    addBook(newBook) {
        if(!this.isIn(newBook.name)) {
            this.library.push(newBook);
        }
    }

    deleteBook(currentBook) {
        this.library.splice(currentBook, currentBook + 1);
      }

    isIn(title) {
        return this.library.some(book => book.title === title);
    }

    find(title) {
        let temp;
        this.library.forEach(book =>  {
           if(book.name === title) {
            temp = book;
           }
        })
        return temp;
    }

    look() {
        return this.library;
    }
}


document.addEventListener('DOMContentLoaded', () => {

    const insertBook = document.getElementById('insert-book');

    const library = new Library();

    const libraryTable = document.getElementById('library-table');

    library.addBook(new Book('Siddharta', 'Hermann Hesse', 'Read'));

    updateTable();

    insertBook.addEventListener('submit', (e) => {
        e.preventDefault();

        const bookName = document.getElementById('book').value;
        const bookAuthor = document.getElementById('author').value;
        const status = document.getElementById('status').value;

        library.addBook(new Book(bookName, bookAuthor, status));

        updateTable();
    })

    function updateTable() {
        libraryTable.innerHTML = '';
        library.look().forEach(book => {
            const htmlBook = `
            <tr>
                <td>${book.name}</td>
                <td>${book.writer}</td>
                <td><button class="status-button">${book.status}</button></td>
                <td><button id="delete-button">delete</button></td>
            </tr>
            `;
            libraryTable.insertAdjacentHTML("afterbegin", htmlBook);
            libraryTable.insert;
        })
    }

    document.querySelector('#table').addEventListener('click', e => {
        const currentTarget = e.target.parentNode.parentNode.childNodes[1];

        if(e.target.classList.contains('status-button')) {
           library.find(currentTarget.innerText).changeStatus();
           updateTable();
        }

        if (e.target.innerHTML == "delete") {
            if (confirm(`are you sure you want to delete ${currentTarget.innerText}`))
              library.deleteBook(find(currentTarget.innerText));
              updateTable();
          }

    });

});