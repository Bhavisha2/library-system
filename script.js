// Sample books in the library
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, isAvailable: true },
    { id: 2, title: "1984", author: "George Orwell", year: 1949, isAvailable: true },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, isAvailable: true }
];

// Function to render books on the page
function displayBooks() {
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = ""; // Clear existing content

    books.forEach(book => {
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        bookDiv.innerHTML = ` 
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Status:</strong> ${book.isAvailable ? "Available" : "Borrowed"}</p>
            <button class="borrow" ${!book.isAvailable ? "disabled" : ""} onclick="borrowBook(${book.id})">Borrow</button>
            <button class="return" ${book.isAvailable ? "disabled" : ""} onclick="returnBook(${book.id})">Return</button>
        `;

        libraryDiv.appendChild(bookDiv);
    });
}

// Function to handle form submission and add a new book
document.getElementById("addBookForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get input values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = parseInt(document.getElementById("year").value);

    // Validate inputs
    if (!title || !author || !year) {
        alert("Please fill in all fields.");
        return;
    }

    // Create a new book object
    const newBook = {
        id: books.length + 1, // Generate a new ID
        title: title,
        author: author,
        year: year,
        isAvailable: true
    };

    // Add the new book to the books array
    books.push(newBook);

    // Clear the form inputs
    document.getElementById("addBookForm").reset();

    // Update the displayed books
    displayBooks();

    alert("Book added successfully!");
});

// Function to borrow a book
function borrowBook(bookId) {
    let book = books.find(b => b.id === bookId);
    if (book && book.isAvailable) {
        book.isAvailable = false; // Set the book as borrowed
        alert(`You have borrowed "${book.title}".`);
        displayBooks();
    }
}

// Function to return a book
function returnBook(bookId) {
    let book = books.find(b => b.id === bookId);
    if (book && !book.isAvailable) {
        book.isAvailable = true; // Set the book as available
        alert(`You have returned "${book.title}".`);
        displayBooks();
    }
}

// Initial display of books
displayBooks();
