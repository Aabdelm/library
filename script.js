let addBtn = document.querySelector('#add');
//Initialize query Selectors for form pop up
let promptBg = document.querySelector('.prompt-bg');
let promptBox = document.querySelector('.prompt-box');
let exit = document.querySelector('#exit');
//Create popup animation for form creation
addBtn.addEventListener(`click`, ()=>{
    promptBg.classList.toggle('active');
    promptBox.style.transition = '0.3s';
    promptBox.style.transform = `translateY(5px)`;

});
//Create pop animation for exiting form
exit.addEventListener(`click`, ()=>{
    promptBg.classList.toggle('active');
    promptBox.style.transition = '0.1s';
    promptBox.style.transform = `translateY(-5px)`;
});

//Initialize library array and Object
let myLibrary = [];
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

/*
    creates and appends a new book to the library based on input responses
*/
function addBookToLibrary(book){
    myLibrary.push(book);
    displayBook(book);
    
}
/*
    Displays Books from the myLibraryArray
    @params book - the book object
*/
function displayBook(book){
    //initialize querySelector for content/body
    let contentBody = document.querySelector('.content');

    //Create parent box element
    let boxDiv = document.createElement("div");

    //Assign box class
    boxDiv.classList.add('box');

    // create Header
    let header = document.createElement('header');

    // create header children
    // create and append first child
    let heroDiv = document.createElement('div');
    heroDiv.classList.add('Hero');
    heroDiv.textContent = book.title;
    header.appendChild(heroDiv);

    // create and append second child
    let authorDiv = document.createElement('div');
    authorDiv.classList.add('author');
    authorDiv.textContent = book.author;
    header.appendChild(authorDiv);

    // create body
    let body = document.createElement('div');
    body.classList.add('body');

    // create and append first child
    let pages = document.createElement('div');
    pages.classList.add('pages');
    pages.textContent = `Pages: ${book.pages}`;
    body.appendChild(pages);

    // create and append second child
    let readText = document.createElement('div');
    readText.classList.add('read-text');
    readText.textContent = 'Read';
    
    // also add a switch for readText (will be modified later)
    let textInp = document.createElement('input');

    // set attributes for textInp
    textInp.setAttribute('type', 'checkbox');
    textInp.setAttribute('name', 'read');
    textInp.checked = book.read;
    textInp.id = 'read';

    // append textInp to readText
    readText.appendChild(textInp);

    // append second child
    body.appendChild(readText);

    //append both children to box
    boxDiv.appendChild(header);
    boxDiv.appendChild(body);

    //append new box to body
    contentBody.appendChild(boxDiv);
}

// get inputs from user
let form = document.querySelector('form');
form.addEventListener(`submit`, (e)=>{
    // add animation for scrolling up
    promptBg.classList.toggle('active');
    promptBox.style.transition = '0.1s';
    promptBox.style.transform = `translateY(-5px)`;

    //create new book
    let title = form.title.value;
    let author = form.author.value;
    let pages = form.pages.value;
    let read = form.read.checked;
    addBookToLibrary(new Book(title, author, pages, read));
    // prevent default
    form.reset();
    e.preventDefault();
    

});