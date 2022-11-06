import {coletaDeInputs} from '../../script/register.js'
function options(){
    const button = document.querySelector('.vector');
    const div    = document.querySelector('.options');
    const back   = document.querySelector('.open-back');
    const retorno  = document.querySelector(".retornar")
    const x = document.createElement("p");
    x.innerText = "X";
    x.classList = "clear-modal";
    button.addEventListener('click',() => {
        div.classList = "options option flex align-item justify-content absolute"
        back.innerHTML = "" 
        div.insertAdjacentHTML("afterbegin",` 
        <div class="div-options flex space-between">
            <button class="login home">Home</button>
            <button class="register log">Login</button>
        </div>
        `)
        back.append(x)
        fechar()
        redirecionamento()
    })
    const ancora = document.querySelector(".sumir")
    const but = document.querySelector(".cadastrar")
    but.addEventListener("click",()=>{
        window.location.href = "/pages/login/login.html"
    })
    ancora.addEventListener("click",(event)=>{
        if(event.target.classList == "home"){
            window.location.href = "/index.html"
        }
    })
    div.addEventListener("click", (event)=>{
        if(event.target.classList == "login home"){
            window.location.href = "/index.html"
        }
        if(event.target.classList == "register log"){
            window.location.href = "/pages/login/login.html"
        }
    })
    retorno.addEventListener("click",(event) =>{
        event.preventDefault()
        window.location.href = "http://127.0.0.1:5500/index.html    "
    })
    
    
}
function redirecionamento(){
    const register = document.querySelector(".home")
    const log = document.querySelector(".log")
    register.addEventListener("click",()=>{
        window.location.href = "http://127.0.0.1:5500/index.html"
    })
    log.addEventListener("click",()=>{
        window.location.href = "http://127.0.0.1:5500/pages/login/login.html"
    })
}
function fechar(){
    const x      = document.querySelector(".clear-modal")
    const div    = document.querySelector('.options');
    const back   = document.querySelector('.open-back');
    x.addEventListener("click",()=>{
        div.classList  = "options"
        div.innerHTML  = ""
        x.remove()
        back.insertAdjacentHTML("afterbegin",`
            <img class="vector" src="../../acets/Vector.png" alt="">
        `)
        options()
    })
}
coletaDeInputs()
options()