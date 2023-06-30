let addBtn = document.querySelector('#add');
let promptBg = document.querySelector('.prompt-bg');
let promptBox = document.querySelector('.prompt-box');
let exit = document.querySelector('#exit');
addBtn.addEventListener(`click`, ()=>{
    promptBg.classList.toggle('active');
    promptBox.style.transition = '0.3s';
    promptBox.style.transform = `translateY(5px)`;

})
exit.addEventListener(`click`, ()=>{
    promptBg.classList.toggle('active');
    promptBox.style.transition = '0.1s';
    promptBox.style.transform = `translateY(-5px)`;
})