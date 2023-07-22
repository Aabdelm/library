let addBtn = document.querySelector('#add');

//Initialize query Selectors for form pop up
let promptBg = document.querySelector('.prompt-bg');
let promptBox = document.querySelector('.prompt-box');
let exit = document.querySelector('#exit');

// Create popup animation for form creation
addBtn.addEventListener(`click`, ()=>{
    promptBg.classList.toggle('active');
    promptBox.style.transition = '0.3s';
    promptBox.style.transform = `translateY(5px)`;

});

// Create pop animation for exiting form
exit.addEventListener(`click`, ()=>{
    promptBg.classList.toggle('active');
    promptBox.style.transition = '0.1s';
    promptBox.style.transform = `translateY(-5px)`;
});

//Initialize library array and Object
let myLibrary = [];
function Book(title, author, pages, read, background){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.background = background;
}

Book.prototype.changeStatus = function(){
    this.read = !this.read;
}

/*
    creates and appends a new book to the library based on input responses
*/
function addBookToLibrary(book){
    displayBook(book);
    myLibrary.push(book);
    
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

    // Assign index number
    boxDiv.setAttribute('data-index', myLibrary.length);
    boxDiv.setAttribute('read',book.read);

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

    //Add event listener
    textInp.addEventListener(`click`, () =>{
        book.changeStatus();

        //Change border styling
        boxDiv.setAttribute('read',book.read);
    });

    // append textInp to readText
    readText.appendChild(textInp);

    // append second child
    body.appendChild(readText);

    //create button for removal
    let button = document.createElement('button');
    button.setAttribute('type','button');
    button.id = 'remove';
    button.textContent = 'Remove';

    //add event listener for removal
    button.addEventListener(`click`, ()=>{
        //retrieve data index
        let index = boxDiv.getAttribute('data-index');
        let indexBox = document.querySelector(`div[data-index='${index}']`);

        //remove child based on index
        contentBody.removeChild(indexBox);

        //update library
        myLibrary.splice(index, 1);
        updateLibrary();
    });

    //append button
    body.appendChild(button);

    //append both children to box
    boxDiv.appendChild(header);
    boxDiv.appendChild(body);

    // changes background to url
    if(book.background.length !== 0){
        boxDiv.style.background = `url('${book.background}')`
        boxDiv.style.backgroundColor = `#083344`
        boxDiv.style.backgroundSize = `cover`;
        boxDiv.style.backgroundRepeat = `no-repeat`;
        boxDiv.style.backgroundPosition = `center center`;
        boxDiv.style.backgroundBlendMode = `multiply`;
    }
    //append new box to body
    contentBody.appendChild(boxDiv);
}


/*
    Update data attributes for each user
*/
function updateLibrary(){
    //grab content parent
    let contentBody = document.querySelector('.content');

    //iterate over each child and update accordingly
    for(let i =0; i < myLibrary.length; i++){
        contentBody.children[i].setAttribute('data-index', i);
    }
}
/*
    Gain input from user
*/
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
    let background = form.background.value;
    addBookToLibrary(new Book(title, author, pages, read, background));
    // prevent default
    form.reset();
    e.preventDefault();
    

});