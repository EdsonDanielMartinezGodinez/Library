const addButton = document.getElementById("boton");
const mainBooks = document.querySelector(".sectionBooks");
const dialog = document.querySelector(".dialog"); 
const dialogClosed = document.getElementById("closedbutton");
const form = document.querySelector(".formulario");
const myLibrary = [];

function Book(title,author,genre,pages,read,image) {
    this.id = self.crypto.randomUUID();
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Genre = genre;
    this.Read = read;
    this.Image = image;
};

function myLibraryFor(newBook){
    myLibrary.forEach((arrElement) => {
        if(newBook.id == arrElement.id){
            const bookDiv = document.createElement("div");
            const bookCover = document.createElement("img")
            const booktitle = document.createElement("p")
            bookCover.src = `${arrElement.Image}`;
            bookCover.alt = "Portada del Libro";
            booktitle.textContent = `${arrElement.Title}`;
            bookDiv.classList.add("bookBody");
            bookCover.classList.add("coverImage");
            booktitle.classList.add("titleCover");
            bookDiv.appendChild(bookCover);
            bookDiv.appendChild(booktitle);
            bookDiv.setAttribute('data-objeto', JSON.stringify(arrElement));
            bookDiv.setAttribute("data-id",arrElement.id);
            mainBooks.appendChild(bookDiv);
        }
    });
}

function addBookToLibrary(title,author,genre,pages,read,image) {
    const arrBook = new Book(title, author,genre,pages,read,image)
    myLibrary.push(arrBook);
    return arrBook;
}

mainBooks.addEventListener("click", (e) => {
    const popUptitle = document.createElement("h3");
    const x = document.createElement("button");
    const capa = document.createElement("div");
    const popUp = document.createElement("div");
    const headerPop = document.createElement("div");
    const bodyPop = document.createElement("div");
    const buttonBody = document.createElement("div");
    const contentBody = document.createElement("div");
    const removeObjt = document.createElement("button");
    const updateObjt = document.createElement("button");
    const imageObjt = document.createElement("div");
    const informationObjt = document.createElement("div");
    const tituloObjt = document.createElement("div");
    const pagesObjt = document.createElement("div");
    const genreObjt = document.createElement("div");
    const authorObjt = document.createElement("div");
    const readObjt = document.createElement("div");
 
    tituloObjt.classList.add("informativeOBJT");
    pagesObjt.classList.add("informativeOBJT");
    genreObjt.classList.add("informativeOBJT");
    authorObjt.classList.add("informativeOBJT");
    readObjt.classList.add("informativeOBJT");
    readObjt.classList.add("last");
    imageObjt.classList.add("imageContainmerPop");
    informationObjt.classList.add("informationPop");
    contentBody.classList.add("contentBody");
    buttonBody.classList.add("buttonBody")
    removeObjt.classList.add("popUpButtons");
    updateObjt.classList.add("popUpButtons");

    let nodeObjet = e.target.closest(".bookBody");
    let objet = nodeObjet.dataset.objeto;
    let objetParse = JSON.parse(objet);

    popUptitle.textContent = `MyBook`;
    popUptitle.style.color = "white";
    popUptitle.style.width = "50%";
    x.textContent = "X";
    x.classList.add("buttonX");
    capa.classList.add("backgroundBlack");
    popUp.classList.add("pop");
    headerPop.classList.add("headPop");
    bodyPop.classList.add("bodyPop");
    document.body.appendChild(capa);
    capa.appendChild(popUp);
    popUp.appendChild(headerPop);
    popUp.appendChild(bodyPop);
    removeObjt.textContent = "Remove";
    updateObjt.textContent = "Update";
    imageObjt.style.backgroundImage = `url(${objetParse.Image})`;
    contentBody.appendChild(imageObjt);
    contentBody.appendChild(informationObjt);
    bodyPop.appendChild(contentBody);
    bodyPop.appendChild(buttonBody);
    headerPop.appendChild(popUptitle);
    headerPop.appendChild(x);
    buttonBody.appendChild(updateObjt);
    buttonBody.appendChild(removeObjt);
    informationObjt.appendChild(tituloObjt);
    informationObjt.appendChild(authorObjt);
    informationObjt.appendChild(genreObjt);
    informationObjt.appendChild(pagesObjt);
    informationObjt.appendChild(readObjt);

    const titleText = document.createElement("p");
    titleText.textContent = `Title: ${objetParse.Title}`;
    tituloObjt.appendChild(titleText);
    const authorText = document.createElement("p");
    authorText.textContent = `Author: ${objetParse.Author}`;
    authorObjt.appendChild(authorText);
    const genreText = document.createElement("p");
    genreText.textContent = `Genre: ${objetParse.Genre}`;
    genreObjt.appendChild(genreText);
    const pagesText = document.createElement("p");
    pagesText.textContent = `Pages: ${objetParse.Pages}`;
    pagesObjt.appendChild(pagesText);
    const readText = document.createElement("p");
    let correctStatus = objetParse.Read == true ? "I have already read this book ✅" : "I haven´t read this book yet ❎";
    readText.textContent = correctStatus;
    readObjt.appendChild(readText);

    removeObjt.addEventListener("click", () =>{
    document.body.removeChild(capa);
    mainBooks.removeChild(nodeObjet);
    myLibrary.forEach((arrElement) =>{
        if(arrElement.id == objetParse.id){
            let objetIndex = myLibrary.indexOf(arrElement);
            myLibrary.splice(objetIndex,1);
            alert("Book has been deleted succesfully")
        }
    });
    });
    x.addEventListener("click", () =>{
    document.body.removeChild(capa);
    });
    updateObjt.addEventListener("click", () =>{
        for(let i of myLibrary){
            if(i.id == objetParse.id){
                if(i.Read == true){
                    i.Read = false;
                    correctStatus = "I have´nt read this book yet ❎" ;
                    readText.textContent = correctStatus;
                    alert("Changes have been saved successfully!");
                }else{
                    i.Read = true;
                    correctStatus = "I have already read this book ✅" ;
                    readText.textContent = correctStatus;
                    alert("Changes have been saved successfully!");
                }
            }
        }

    });
});

addButton.addEventListener("click", () => {
    dialog.showModal();
});
dialogClosed.addEventListener("click",() =>{
    dialog.close();
    form.reset();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const genre= formData.get("genre");
    const pages = formData.get("paginas");
    const checkBox = formData.get("check");
    const file = formData.get("imagen");
    let checkStatus;
    if(checkBox == "on"){
        checkStatus = true;
    }else{
        checkStatus= false;
    }
    let imageUrl = URL.createObjectURL(file);
    let newBook = addBookToLibrary(title,author,genre,pages,checkStatus,imageUrl);
    myLibraryFor(newBook);
    form.reset();
    dialog.close();
});




