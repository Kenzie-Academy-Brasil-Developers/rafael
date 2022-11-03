import {listAllSectors,listSetores,verificationUserToken,editUser,listDepartments,editDepartamento
, deletarDepartamento} from "./ requisitions.js"
export async function renderCards(arr){
    const ul =document.querySelector(".liste-home")
    ul.innerHTML = ""
    arr.forEach(element => {
        ul.insertAdjacentHTML("afterbegin",`
        <li class="list-li">
            <h2>${element.name}</h2>
            <span>${element.opening_hours} horas</span>
            <div class="flex align-item justify-content"><p>${element.sectors.description}r</p></div>
        </li>  
        `)
    })
    options()
    abrirModal(arr)
   
}
function options(){
    const button = document.querySelector('.vector');
    const div    = document.querySelector('.options');
    const back   = document.querySelector('.open-back');
    const x = document.createElement("p");
    x.innerText = "X";
    x.classList = "clear-modal";
    button.addEventListener('click',() => {
        div.classList = "options option flex align-item justify-content"
        back.innerHTML = "" 
        div.insertAdjacentHTML("afterbegin",` 
        <div class="div-options flex space-between">
            <button class="login">Login</button>
            <button class="register">Cadastro</button>
        </div>
        `)
        back.append(x)
        fechar()
        redirecionamento()
    })
    
}
function redirecionamento(){
    const register = document.querySelector(".register")
    register.addEventListener("click",()=>{
        window.location.href = "pages/register/register.html"
    })
    const login = document.querySelector(".login")
    login.addEventListener("click",()=>{
        window.location.href = "pages/login/login.html"
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
            <img class="vector" src="./acets/Vector.png" alt="">
        `)
        options()
    })
}
async function abrirModal(arr){
    const button = document.querySelector('.seta')
    const div    = document.querySelector('.select')
    button.addEventListener('click',async() =>{
        const x = document.createElement("button")
        x.innerText = "X"
        x.classList = "clear-x"
        button.remove()
        div.appendChild(x)        
        await renderFiltratos(arr)
        fecharModal()
    })
}
async function fecharModal(){
    const fechar = document.querySelector(".clear-x")
    const div    = document.querySelector('.select')
    const filter  = document.querySelector(".div-filter")
    const request = await listAllSectors()
    fechar.addEventListener("click", async () =>{
        filter.innerHTML = ""
        fechar.remove()
        const img = document.createElement("img")
        img.src = "./acets/seta.png"
        img.alt = "Ver todas seções" 
        img.classList = "seta"
        div.appendChild(img)
        abrirModal(request)
    })    
}
function renderFiltratos(arr){
    const div = document.querySelector(".div-filter")
    div.innerHTML = ""
    const setores = []
    arr.forEach(element => setores.push(element.sectors.description))
    let novaArr = setores.filter((este, i) => setores.indexOf(este) === i);
    novaArr.forEach(element =>{
        div.insertAdjacentHTML("afterbegin",`
            <button class="button-filter">${element}</button>
        `)
    })
    div.insertAdjacentHTML("afterbegin",`
        <button class="button-filter">Todos</button>
    `)
    filtraERenderizar(arr) 
}
async function filtraERenderizar(){
    let filter = []
    const array = await listAllSectors()
    const arr = await listAllSectors()
    const button = document.querySelectorAll(".button-filter");
    const div    = document.querySelector(".div-filter")
    const fechar = document.querySelector(".clear-x")
    const sectors = document.querySelector(".select")
    button.forEach(element =>{
        element.addEventListener('click',async (event)=>{
            if(event.target.innerText == "Todos"){
                div.innerHTML = ""
                fechar.remove()
                const img = document.createElement("img")
                img.src = "./acets/seta.png"
                img.classList = "seta"
                sectors.appendChild(img)
                abrirModal(arr)
                return renderCardsFilter(arr)
            }else{
                const newArr = await listSetores(event.target.innerText)
                div.innerHTML = ""
                fechar.remove()
                const img = document.createElement("img")
                img.src = "./acets/seta.png"
                img.classList = "seta"
                sectors.appendChild(img)
                abrirModal(arr)
                renderCardsFilter(newArr)
                }
            
        })
    })
   
}
function renderCardsFilter(arr){
    const ul =document.querySelector(".liste-home")
    ul.innerHTML = ""
    arr.forEach(element => {
        ul.insertAdjacentHTML("afterbegin",`
        <li class="list-li">
            <h2>${element.name}</h2>
            <span>${element.opening_hours} horas</span>
            <div class="flex align-item justify-content"><p>${element.sectors.description}r</p></div>
        </li>  
        `)
    })
}
export async function renderInformUser(){
    const user = await verificationUserToken()
    const img = document.querySelector(".edit")
    const section = document.querySelector(".section-user")
    section.insertAdjacentHTML("afterbegin",`
    <div class="width-80">
        <h2 class="subTitle-h2">${user.username}</h2>
        <div class="div-inform-user flex space-between align-item">
            <p>emael: ${user.email}</p><p>${user.professional_level}</p><p>${user.kind_of_work}</p>
        </div>
    </div> 
    `)
    img.addEventListener("click",()=>{
        console.log("Deu ruim")
        createModalEditUser()
    })
}
function createModalEditUser(){
    const body = document.querySelector(".recebe-modal")
        body.insertAdjacentHTML("afterbegin",`
        <section class="section-modal-edit width-100 height-100 flex align-item justify-content">
            <form action="submit" class="form-edit-user">
                <div class="div-x width-80 flex reverse "><button class="end-x">X</button></div>

                <div class="flex width-80"><h1 class="title-h1-modal">Editar Perfil</h1></div>
                <input class="nick" placeholder="Seu nome" type="text" name="Username" id="">
                <input class="email" placeholder="Seu e-mail" type="email" name="Email">
                <input class="password" placeholder="Sua senha" type="password" name="password">
                <button class="yesEditUser">Editar perfil</button>
            </form>
        </section>
        `)
        const button = document.querySelector(".yesEditUser")
        const section = document.querySelector(".section-modal-edit")
        section.addEventListener("click", (event) => {
            event.preventDefault()
            if(event.target.classList == "section-modal-edit width-100 height-100 flex align-item justify-content"){
                console.log("foi")
                section.innerHTML = ""
                section.remove()
            }
            else if(event.target.classList == "end-x"){
                console.log("foi")
                section.innerHTML = ""
                section.remove()
            }else if(event.target.innerText == "Editar perfil"){
                setTimeout(()=>{button.classList.toggle("green")},500)
                console.log(button)
                alerarInfosUser()
                setTimeout(()=>{
                    section.innerHTML = ""
                    section.remove()
                    
                },1000)
            }
        })
    console.log(body)
}
async function alerarInfosUser(){
    const nick     = document.querySelector(".nick")
    const emailUser    = document.querySelector(".email")
    const passwordUser = document.querySelector(".password")

    const obj = {
            username: `${nick.value}`,
            password:`${passwordUser.value}`,
            email: `${emailUser.value}`,
        }
    await editUser(obj)
    
}
export async function selecionarEmpresas(){
    const img = document.querySelector(".listar-empresas")
    const arr = await listAllSectors()
    img.addEventListener("click", () =>{
        listtNameEmpresas(arr)
    })
}
async function listtNameEmpresas(arr){
    const fundo = document.querySelector(".background")
    fundo.classList.add("aaa")
    fundo.insertAdjacentHTML("afterbegin",`
    <form class="empresas empresas2">
    </form>
    `)
    const form = document.querySelector(".empresas")
    arr.forEach((element)=>{
        form.insertAdjacentHTML("afterbegin",`
        <button id="${element.uuid}" class="empresa">${element.name}</button>
        `)
    })
    fundo.addEventListener("click",(event)=>{
        if(event.target.classList == "background aaa"){
            console.log("merda")
            fundo.classList.remove("aaa")
            fundo.innerHTML = ""
        }
    })
    const buttons = document.querySelectorAll(".empresa")
    buttons.forEach((element)=>{
        element.addEventListener("click",async(event)=>{
            event.preventDefault()
            const id = event.target.id
            console.log(id)
            const arr = await listDepartments(id)
            renderEmpresasDepartaments(arr)
        })
    })
}
export function renderEmpresasDepartaments(arr){
    const ul = document.querySelector(".list-ul-admin")
    ul.innerHTML = ""
    arr.forEach((element)=>{
        ul.insertAdjacentHTML("afterbegin",`
        <li class="list-li-admin">
            <h3>${element.name}</h3>
            <p>${element.description}</p>
            <p>${element.companies.name}</p>
            <div class="div-functions flex width-80 align-item justify-content">
                <img class="olho" src="../../acets/visualizar.png" alt="vizualizar">
                <img class="pen" id="${element.uuid}" src="../../acets/editar.png" alt="editar">
                <img id="${element.uuid}" class="lixeira" src="../../acets/delet.png" alt="">
            </div>
        </li>
        
        `)
    })
    functionDepartaments()
}
function functionDepartaments(){
    const list = document.querySelectorAll(".list-li-admin")
    list.forEach((element)=>{
        element.addEventListener("click",async(event)=>{
            if(event.target.classList == "pen"){
                editDepartamentos(event.target.id)
            }
            if(event.target.classList == "lixeira"){
                deletarDepartamento(event.target.id)
            }
            
        })
    })
}
function editDepartamentos(id){
    const div = document.querySelector(".background")
    div.innerHTML = ""
    div.classList.add("aaa")
    div.insertAdjacentHTML("afterbegin",`
    <form class="form-edit flex collum align-item justify-content" action="">
        <div class="flex width-80 reverse">
            <button class="end-x-edit">X</button>
        </div>
        <h1 class="width-80">Editar Departamento</h1>
        <textarea class="textDescription width-80" placeholder="Valores anteriores da descrição" name="editDepartamento" id="" cols="30" rows="10"></textarea>
        <button class="save-alt width-80">Salvar alterações</button>
    </form>
    `)
    const alterar = document.querySelector(".save-alt")
    const description  = document.querySelector(".textDescription")
    alterar.addEventListener("click",async(event)=>{
        const obj = {
            description: description.value,
        }
        await editDepartamento(obj,id)
        
    })
    const aaa = document.querySelector(".aaa")
    aaa.addEventListener("click", (event) => {
        if(event.target.classList == "background aaa" || event.target.classList == "end-x-edit"){
            div.innerHTML = ""
            div.classList.remove("aaa")
        }
    })
}
/* <li>
        <h3>Nome do colega</h3>
    </li> */