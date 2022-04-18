var navbtn = document.querySelector('.mobilenav');
var modal = document.querySelector('.modal');
var box = document.querySelector('.box');
var link = document.querySelectorAll('.link');


navbtn.addEventListener('click', function(){
    modal.style.display= 'block'
    console.log(link)
    link =Array.from(link)
    arr = link.map((link)=>{
        return link.outerHTML
    })
    console.log(arr)
    box.innerHTML=arr

} )