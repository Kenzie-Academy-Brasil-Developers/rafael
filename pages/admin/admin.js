import {selecionarEmpresas,renderEmpresasDepartaments,renderUsers} from "../../script/render.js"
import {renderDepartament, listAllSectors,createElementDepatament, listUsers} from "../../script/ requisitions.js"
 async function verificationUserToken(){
    const token = localStorage.getItem("token")
    if(token){
        selecionarEmpresas()
        logoutAdmin()
        const array = await listUsers()
        renderUsers(array)
    }else{
        window.location.href = "/pages/login/login.html"
    }
    
}

async function logoutAdmin(){
    const buttonM = document.querySelector(".creatDepartament")
    buttonM.addEventListener("click", () =>{
        renderCardCreat()
    })
    const arr = await renderDepartament()
    renderEmpresasDepartaments(arr)
    const button =document.querySelector(".logout")

    button.addEventListener("click", () => {
        localStorage.clear("token")
        window.location.href = "http://127.0.0.1:5500/pages/login/login.html"
    })
}
function renderCardCreat(){
    const div = document.querySelector(".background")
    div.innerHTML = ""
    div.classList.add("aaa")
    div.insertAdjacentHTML(`afterbegin`,`
    <form class="form-creat-departament flex collum align-item justify-content" action="">
        <div class="width-80 flex reverse"><button class="buttonxx">X</button></div>
        <h1 class="">Criar Departamento</h1>
        <input class="name" placeholder="Nome do departamento" type="text" name="name departament" id="">
        <input class="desc" placeholder="Descrição" type="text" name="description">
        <div class="divvv flex space-between align-item">
        <p class="text-p">Selecionar empresa</p> <img class="img-open" src="../../acets/setaDonw.png" alt=""></div>
        <button class="envio">Criar o departamento</button>
    </form>
    <div class="div-abst">
    </div>
    `)
    div.addEventListener("click",async(event)=>{
        event.preventDefault()
        if(event.target.classList == "background aaa" || event.target.classList == "buttonxx"){
            div.classList.remove("aaa")
            div.innerHTML = ""
        }
        if(event.target.classList == "img-open"){
            const arr = await listAllSectors()
            renderEmpresas(arr)
        }
        if(event.target.classList == "envio"){
            enviar()
            div.classList.remove("aaa")
            div.innerHTML = ""
        }
    })
}
function renderEmpresas(arr){
    const div = document.querySelector(".div-abst")
    const p = document.querySelector(".text-p")
    div.classList.add("div-abs")
    div.innerHTML = ""
    const newDiv = document.createElement("div")
    newDiv.classList = "div-emp"
    div.append(newDiv)
    arr.forEach(element => {
        const button = document.createElement("button")
        button.innerText = `${element.name}`
        button.id = `${element.uuid}`
        button.classList = "creat-empresas"
        newDiv.append(button)
    });
    div.addEventListener("click", () =>{
        div.classList.remove("div-abs")
            div.innerHTML = ""
    })
    const button = document.querySelectorAll(".creat-empresas")
    button.forEach(element =>{
        element.addEventListener("click", () =>{
            p.innerText = element.innerText
            p.id = `${element.id}`
            div.classList.remove("div-abs")
            div.innerHTML = ""
        })
    })
            
}
function enviar(){
    const p = document.querySelector(".text-p")
    const name = document.querySelector(".name")
    const desc  = document.querySelector(".desc")
    const obj = {
        name: name.value,
        description: desc.value,
        company_uuid: p.id,
    }
    createElementDepatament(obj)
    setTimeout(()=>{ window.location.href = "http://127.0.0.1:5500/pages/admin/admin.html"})
}
verificationUserToken()


