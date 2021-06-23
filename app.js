let myLibrary = [];

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const addBook = document.getElementById('add-book')
const displayArea = document.querySelector('.display-book')

let cover = [{name:'blue',headFontColor:'#ac539e', titleFontColor:'#539eac', authorFontColor:'#be4d25', neckBorder:'#154768'},{name:'pinkfog',headFontColor:'#faf783', titleFontColor:'#be4d25', authorFontColor:'#edfdd9', neckBorder:'#d5a9d6'},{name:'japanesewall',headFontColor:'#2596be', titleFontColor:'#9925be', authorFontColor:'#2596be', neckBorder:'#490c00'}] 

updateStats()

function Book(title,author,pages,read,bookId/*,pagesRead*/) {
    this.title=title
    this.author=author
    this.pages=pages
    this.read=read
    this.bookId=bookId
//    this.pagesRead=pagesRead
}

openModalButtons.forEach(button => {                                            // opens modal
    button.addEventListener('click',()=>{
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})
overlay.addEventListener('click',()=>{                                          // overlay
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal =>{
        closeModal(modal)       
    })
})
closeModalButtons.forEach(button => {                                           //closes modal
    button.addEventListener('click',()=>{
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})
// document.querySelector('.radyes').addEventListener('click',()=>{
//     if(document.querySelector('.read-pages').classList.contains('active'))
//     {
//         document.querySelector('.read-pages').classList.remove('active')
//     }

// })
// document.querySelector('.radno').addEventListener('click',()=>{
//     document.querySelector('.read-pages').classList.add('active')
// })

addBook.addEventListener('click',()=>{
    const modal = document.getElementById('modal')
    var title = naming(document.getElementById('title').value)
    var author = naming(document.getElementById('author').value)
    var pages = document.getElementById('pages').value
    var read = document.querySelector('input[name="status"]:checked').value
    // var pagesRead
    // if(read=='yes')
    // {
    //     pagesRead = pages    
    // }
    // else
    // {
    //     pagesRead = document.querySelector('.read-pages').value
    // }


    if((title=='')||(author=='')||(pages==''))
    {
        alert("empty entries not allowed")
    }                                          // add book button
    else
    {
        var find
        var bookId = classAdd(title,author,pages)
        myLibrary.find((post, index)=> {post.title == title ? find = true : find = false})
        if (find)                                                                        
        {
            alert("THIS BOOK ALREADY EXISTS")
        }
        else
        {
            addBookToLibrary(title,author,pages,read,bookId)
            document.querySelector('.grid-container').classList.add('active')
            createBook(title,author,pages,read,bookId)
        }
    }
    closeModal(modal)
})

document.addEventListener('click',function(e){
    if(e.target && e.target.classList== 'remove'){
          removeBook(e.target.id);
     }
 });

 document.addEventListener('click',function(e){
    if(e.target && e.target.classList.contains('tog-but'))
    {   
        var bId = e.target.id.replace('btn','')

        e.target.classList.toggle('active')
        if(e.target.textContent=='Mark it as unread')
        {
            e.target.textContent = 'Mark it as read'
        }
        else
        {
            e.target.textContent = 'Mark it as unread'
        }  
        var bInd = (myLibrary.findIndex(post => post.bookId == bId))
        if(myLibrary[bInd].read=='yes')
        {
            myLibrary[bInd].read = 'no'
        }
        else
        {
            myLibrary[bInd].read = 'yes'
        }   
        updateStats()
        locStore()
        // console.table(myLibrary)   
    }
 });


function openModal(modal){
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal){
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

function addBookToLibrary(title,author,pages,read,bookId) {
    var newBook = new Book(title,author,pages,read,bookId)
    myLibrary.push(newBook)
    locStore() 
    updateStats()
    // console.table(myLibrary)
  }

function createBook(title,author,pages,read,bookId)
{  
    var rand = parseInt(3*(Math.random()))
    document.querySelector('.grid-image').classList.add('active')
    const newBook = document.createElement('div')
    newBook.classList.add(classAdd(title,author,pages))
    newBook.style.cssText = "transition: 500ms ease-in-out;"
    const mainframe = document.createElement('div')
    mainframe.style.cssText = 'display:flex;'
    const box = document.createElement('div')
    box.style.cssText = "background:url('./images/"+ cover[rand].name+".jpg');width:190px; min-height:220px; border:solid 3px"+cover[rand].neckBorder+";border-top-right-radius: 10px 10px; border-bottom-right-radius: 10px 10px;border-left-color:"
    
    const header = document.createElement('div')
    header.style.cssText="text-shadow: -1px -1px 0 #000, 2px -1px 0 #000, -1px 2px 0 #000, 2px 2px 0 #000;display:grid; grid-template-columns:2fr 1fr;font-size: 20px;color:"+cover[rand].headFontColor+";" //excluded fraction for addpage btn
    
    const bookDetail = document.createElement('div')
    bookDetail.style.cssText='display:flex;justify-content:flex-start;'
    // bookDetail.style.cssText="font-size:15px;"
    bookDetail.innerHTML = 'Pages:<span><b>'+pages+'</b></span>'

    // const addPagesRead = document.createElement('div')
    // const addPageBtn = document.createElement('button')
    // addPageBtn.style.cssText="border: none; outline: none; background: none; font-size: 20px; font-weight: bold;"
    
    // addPagesRead.append(addPageBtn)
    
    const removeBook = document.createElement('div')
    removeBook.style.cssText='display: flex; justify-content: flex-end;'
    const removeBookBtn = document.createElement('button')
    removeBookBtn.classList.add('remove')
    removeBookBtn.setAttribute('id',classAdd(title,author,pages))
    removeBookBtn.style.cssText = "cursor: pointer; border: none; outline: none; background: none; font-size: 20px; font-weight: bold;color:"+cover[rand].headFontColor+";"
    removeBookBtn.innerHTML="&times;"
    removeBook.append(removeBookBtn)

    header.append(bookDetail/*,addPagesRead*/,removeBook)
   
    box.append(header)
    
    const name = document.createElement('div')
    name.style.cssText = "margin-top:60px; text-shadow: -1px -1px 0 #000, 2px -1px 0 #000, -1px 2px 0 #000, 2px 2px 0 #000;word-wrap:break-word;color:"+cover[rand].titleFontColor+";"
    name.innerHTML= "<span><b>"+title+"<b><span>"
    const writer = document.createElement('div')
    writer.style.cssText="display:flex; justify-content:flex-end; margin-top:30px; margin-right:10px; word-wrap:break-word; text-shadow: -1px -1px 0 #000, 2px -1px 0 #000, -1px 2px 0 #000, 2px 2px 0 #000; font-size:20px; color:"+cover[rand].authorFontColor+";"
    writer.innerHTML="<span><b>-"+author+"<b><span>"
    box.append(name)
    box.append(writer)
    const neck = document.createElement('div')
    neck.style.cssText = "background:url('./images/"+ cover[rand].name+".jpg');width:10px; min-height:220px;border:solid 3px"+cover[rand].neckBorder+"; border-right:0; border-top-left-radius: 50px 20px; border-bottom-left-radius: 50px 20px;"
    
    const readStatus = document.createElement('div')
    readStatus.style.cssText = 'margin-bottom:0px; display:grid; grid-template-columns: 1fr 1fr;'
    const togBut = document.createElement('button')
    togBut.setAttribute('id','btn'+bookId)
    readStatus.append(togBut)
    box.append(readStatus)

    mainframe.append(neck)
    mainframe.append(box)
    newBook.append(mainframe)
    displayArea.append(newBook)
    readstatus(read,bookId) 
}

function classAdd(str1,str2,str3)
{   
    str1 = str1+str2+str3
    str1 = str1.replace(/\s/g, '')
    str1 = str1.replace(/[^a-zA-Z0-9]/g, "")
    return str1.toLowerCase()
}

 function naming(string)
 {
    string = string.toLowerCase().split(' ');
    for (var i = 0; i < string.length; i++) {
        string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1); 
    }
    return string.join(' ');
 }

 function removeBook(BtnId)
 {
    myLibrary = myLibrary.filter(function(book){
        return book.bookId !== BtnId
    }) 
    BtnId='.'+BtnId
    document.querySelector(BtnId).remove()
    // console.table(myLibrary)
    updateStats()
    locStore()
    if(myLibrary.length==0)
    {
        document.querySelector('.grid-container').classList.remove('active')
        document.querySelector('.grid-image').classList.remove('active')
    }
 }

 function readstatus(read,bid)
 {
    var btnid = 'btn'+bid
    if(read=='yes')
    {
        document.getElementById(btnid).classList.add('tog-but')
        document.getElementById(btnid).classList.add('active')
        document.getElementById(btnid).textContent='Mark it as unread'
    }  
    else
    {
        document.getElementById(btnid).classList.add('tog-but')
        document.getElementById(btnid).textContent='Mark it as read'
    }
 }
function updateStats()
{
    if(myLibrary.length==0)
    {
        document.getElementById('number-of-books').textContent='0'
        document.getElementById('completed-books').textContent='0'
        document.getElementById('incomplete-books').textContent='0'
        document.getElementById('last-added').textContent='none'
    }
    else
    {
        document.getElementById('number-of-books').textContent= myLibrary.length
        var count = myLibrary.filter(book=>{return book.read=='yes'}).length
        document.getElementById('completed-books').textContent= count
        document.getElementById('incomplete-books').textContent=myLibrary.length - count  
        document.getElementById('last-added').textContent=myLibrary[myLibrary.length-1].title
    }
}
function locStore()
{
    localStorage.setItem("myLibrary",JSON.stringify(myLibrary))
}
function restoreLoc() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    if (myLibrary === null)
    {
        myLibrary = [];
    } 
    else
    {
        myLibrary.forEach(post=>{
            createBook(post.title,post.author,post.pages,post.read,post.bookId)
        })
    }
    updateStats()
  }
//   function coverPicker(){
//     // var coverIndex = 4*(Math.random())
    
//   }
  restoreLoc()