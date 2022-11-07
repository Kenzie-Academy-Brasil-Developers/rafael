import {login} from "../../script/ requisitions.js"

function pegaLogin(){
    const email2 = document.querySelector(".email")
    const password = document.querySelector(".password")
    const button = document.querySelector(".cadastro")
    button.addEventListener("click", async (event) =>{
        event.preventDefault()
        const obj = {
            email: `${email2.value}`,
            password: `${password.value}`
        }
        const satatus = await login(obj)
        if(satatus == 200){
            setTimeout(()=>{window.location.href = "/pages/post/posts.html"},1000)
        }else{
            button.classList.toggle("red")
            button.innerText = "seu email está errado"
            setTimeout(()=>{button.classList.remove("red")},4000)
        }
    })
}
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
            <button class="register log">Cadastrar</button>
        </div>
        `)
        back.append(x)
        fechar()
        redirecionamento()
    })
    div.addEventListener("click", (event)=>{
        if(event.target.classList == "login home"){
            window.location.href = "/index.html"
        }
        if(event.target.classList == "register"){
            window.location.href = "/pages/register/register.html"
        }
    })
    retorno.addEventListener("click",(event) =>{
        event.preventDefault()
        window.location.href = "/pages/register/register.html"
    })
    const ancora = document.querySelector(".sumir")
    ancora.addEventListener("click",(event)=>{
        if(event.target.classList == "home"){
            window.location.href = "/index.html"
        }else if(event.target.classList == "cadastrar"){
            window.location.href = "/pages/register/register.html"
        }
    })
    
}
function redirecionamento(){
    const register = document.querySelector(".home")
    const log = document.querySelector(".log")
    register.addEventListener("click",()=>{
        window.location.href = "/index.html"
    })
    log.addEventListener("click",()=>{
        window.location.href = "/pages/register/register.html"
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
pegaLogin()
options()