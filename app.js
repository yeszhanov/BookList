//Book constuctor
function Book(title, author, isbn){
    this.title = title;
    this.author= author;
    this.isbn = isbn;
}

//UI constuctor
function UI(){}


//add book to list 
UI.prototype.addbookTolist = function(book){
    const list = document.getElementById('book-list')
    //Create tr element , сначало создаем елемент , вставляем туда необходимые данные , потом вставляем уже в book-list 
    const row = document.createElement('tr')
    //insert cols
    row.innerHTML =  `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class ="delete">x<a></td>
    `;
    list.appendChild(row);    
}

//Уведомление 
UI.prototype.showAlert = function(message,className){
    //create div
    const div = document.createElement('div');
    //add class name
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form); // parentElem.insertBefore(elem, nextSibling) Вставляет elem в коллекцию детей parentElem, перед элементом nextSibling
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000)
}


//delete book 

UI.prototype.deletebook= function(target){
    if (target.className==='delete'){
        target.parentElement.parentElement.remove();
        ui.showAlert('Удалено', 'success');
    }
}
//clear forms
UI.prototype.clearForm = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Event Listeners
document.querySelector('#book-form').addEventListener('submit',function(e){
    // Значение с формы 
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

    //создаем новый обьект book        
    const book = new Book(title, author, isbn)      
    
    //создаем новый обьект UI
    const ui = new UI();

    //Validate

    if (title==='' || author === '' || isbn === ''){
        //error alert
        ui.showAlert('Заполните поля', 'error')
    }else{
        ui.addbookTolist(book);
       
        //show success
        ui.showAlert('добавлено', 'success')

        //clear forms
        ui.clearForm();
    }

    
    
    e.preventDefault();
});

//Event listener for delete

document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();

    ui.deletebook(e.target);
    
    e.preventDefault();

})