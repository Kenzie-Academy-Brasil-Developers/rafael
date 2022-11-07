import {listAllSectors,listSetores,verificationUserToken,editUser,listDepartments,editDepartamento
, deletarDepartamento,renderDepartament,userDesepremgado,contratar,listUsers,demitirFuncionario,editUserAdmin,deleteUserEDemitir} from "./ requisitions.js"
let newObj = {}
let idd = ""
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
                section.innerHTML = ""
                section.remove()
            }
            else if(event.target.classList == "end-x"){
                section.innerHTML = ""
                section.remove()
            }else if(event.target.innerText == "Editar perfil"){
                setTimeout(()=>{button.classList.toggle("green")},500)
                alerarInfosUser()
                setTimeout(()=>{
                    section.innerHTML = ""
                    section.remove()
                    
                },1000)
            }
        })
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
    const fundo = document.querySelector(".newDiv")
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
    form.insertAdjacentHTML("afterbegin",`
    <button class="empresa">Todos</button>
    `)
    fundo.addEventListener("click",async(event)=>{
        if(event.target.classList == "newDiv aaa"){
            fundo.classList.remove("aaa")
            fundo.innerHTML = ""
        }else if(event.target.innerText == "Todos"){
            const arr = await renderDepartament()
            renderEmpresasDepartaments(arr)
            fundo.classList.remove("aaa")
            fundo.innerHTML = ""
        }
    })
    const buttons = document.querySelectorAll(".empresa")
    buttons.forEach((element)=>{
        element.addEventListener("click",async(event)=>{
            event.preventDefault()
            fundo.classList.remove("aaa")
            fundo.innerHTML = ""
            const id = event.target.id
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
                <h3 class="subTitle-h3">${element.name}</h3>
                <p class="description-p">${element.description}</p>
                <p class="paragrafo">${element.companies.name}</p>
                <div class="div-functions flex width-80 align-item justify-content">
                    <img  id= "${element.uuid}"class="olho" src="../../acets/visualizar.png" alt="vizualizar">
                    <img id="${element.uuid}" class="pen" id="${element.uuid}" src="../../acets/editar.png" alt="editar">
                    <img id="${element.uuid}" class="lixeira" src="../../acets/delet.png" alt="">
                </div>
            </li>        
        `)        
        })
    functionDepartaments()
}
function functionDepartaments(){
    const list = document.querySelectorAll(".list-li-admin")
    const p    = document.querySelectorAll(".description-p")
    const h3   = document.querySelectorAll(".subTitle-h3")
    const pp   = document.querySelectorAll(".paragrafo")
    list.forEach((element,i)=>{
        element.addEventListener("click",async(event)=>{
            if(event.target.classList == "pen"){
                editDepartamentos(event.target.id,p[i].innerText)
            }
            if(event.target.classList == "lixeira"){
                const id = event.target.id
                renderCardDelet(id,h3[i].innerText)
            }
            if(event.target.classList == "olho"){
                const obj = {
                    name:h3[i].innerText,
                    description:p[i].innerText,
                    paragraph: pp[i].innerText,
                }
                createModalContratar(event.target.id, obj)
                newObj = obj
                idd = event.target.id
            }
            
        })
    })
}
async function createModalContratar(id, arr){
    const div = document.querySelector(".background")
    div.innerHTML = ""
    div.classList.add("aaa")
    div.insertAdjacentHTML("afterbegin",`
    <div class="div-users flex collum align-item">
        <div class="width-80">
            <div class="width-100 flex reverse"><button class="xxx">X</button></div>
            <h1>${arr.name}</h1>
        <div class="flex space-between width-80">
            <div>
                <h3 class="subTitle-user-h3">${arr.description}</h3>
                <p class="campany">${arr.paragraph}</p>
            </div>
            <div class="flex collum end">
                <div class="select-user">
                    <p class="ppp">User</p>
                    <img class="select22" src="../../acets/setaDonw.png" alt="selecinar user">
                </div>
                
                <div class="users1 flex align-item justify-content"></div>
                <button id="${id}" class="contrato">Contratar</button>
            </div>
        </div>
        <ul class="ul-list-user flex align-item">
        </ul>
    </div>         
    `)
    renderUsersDepartament(id)

    div.addEventListener("click",async(event)=>{
        event.preventDefault();
        if(event.target.classList == "background aaa" || event.target.classList == "xxx"){
            div.classList.remove("aaa")
            div.innerHTML = ""
        }else if(event.target.classList == "select22" || event.target.classList == "select-user"){
            renderEmpresasAdmin()
        }
    })
}
async function renderEmpresasAdmin(){
    const arr = await userDesepremgado()
    const div = document.querySelector(".users1")
    const newDiv  = document.createElement("div")
    div.innerHTML = ""
    div.append(newDiv)
    newDiv.classList = "users-but flex collum"
    div.classList.add("users")
    arr.forEach(element =>{
        newDiv.insertAdjacentHTML("afterbegin",`
            <button id="${element.uuid}" class="nameUser">${element.username}</button>
        `)
    })
    const name = document.querySelectorAll(".nameUser")
    const p = document.querySelector(".ppp")
    name.forEach(element =>{
        element.addEventListener("click",async(event)=>{
            p.innerText = event.target.innerText
            p.id = event.target.id
        })
    })
    div.addEventListener("click",()=>{
        div.classList.remove("users")
        div.innerHTML = ""
    })
    contratarUSer()
}
function renderCardDelet(id,string){
    const back = document.querySelector(".background")
    back.innerHTML = ""
    back.classList.add("aaa")
    back.insertAdjacentHTML("afterbegin",`
        <div class="delet flex align-item justify-content collum">
            <div class="width-80 flex reverse"><button class="fechar-xx">X</button></div>
            <h1>Realmente deseja deletar o Departamento ${string} e demitir seus funcionários?</h1>
            <button class="check">Confirmar</button>
        </div>  
    `)
    back.addEventListener("click", (event)=>{
        if (event.target.classList == "check"){
            deletarDepartamento(id)
            setTimeout(()=>{window.location.href = "/pages/admin/admin.html"})
        }
        else if(event.target.classList == "background aaa" || event.target.classList == "fechar-xx"){
            back.classList.remove("aaa")
            back.innerHTML = ""
        }
    })
}
function editDepartamentos(id,string){
    const div = document.querySelector(".background")
    div.innerHTML = ""
    div.classList.add("aaa")
    div.insertAdjacentHTML("afterbegin",`
    <form class="form-edit flex collum align-item justify-content" action="">
        <div class="flex width-80 reverse">
            <button class="end-x-edit">X</button>
        </div>
        <h1 class="width-80">Editar Departamento</h1>
        <textarea class="textDescription width-80" placeholder="Valores anteriores da descrição" name="editDepartamento" id="" cols="30" rows="10">${string}</textarea>
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
async function contratarUSer(){
    const button = document.querySelector(".contrato")
    const p      = document.querySelector(".ppp")
    button.addEventListener("click",async(event)=>{
        if(p.id !== ""){
            const obj = {
                user_uuid: p.id,
                department_uuid: `${event.target.id}`
            }
            await contratar(obj)
            const ul = document.querySelector(".ul-list-user")
            ul.innerHTML = ""
            renderUsersDepartament(event.target.id)
            const array = await listUsers()
            renderUsers(array)
        }
    })
}
async function renderUsersDepartament(id){
    const ul = document.querySelector(".ul-list-user")
    ul.innerHTML = ""
    const p = document.querySelector(".campany")
    const arr    = await listUsers()
    const newArr = arr.filter(element => element.department_uuid === id)
    newArr.forEach((element,i) => {
        if(i == 0){
            ul.innerHTML = ""
            ul.insertAdjacentHTML("afterbegin",`
            <li class="li-list-user">
                <div class="div-list--">
                    <h3 class="username">${element.username}</h3>
                    <p>${element.professional_level}/p>
                    <span>${p.innerText}</span>
                </div>
                <button class="off" id="${element.uuid}">Desligar</button>
            </li>
            `)
        }else{
            ul.insertAdjacentHTML("afterbegin",`
        <li class="li-list-user">
            <div class="div-list--">
                <h3 class="username">${element.username}</h3>
                <p>${element.professional_level}/p>
                <span>${p.innerText}</span>
            </div>
            <button class="off" id="${element.uuid}">Desligar</button>
        </li>
        `)
        }
    })
    const off = document.querySelectorAll(".off")
    off.forEach((element,i) =>{
        const user = document.querySelectorAll(".username")
        element.addEventListener("click",async(event)=>{
            modalDemitirFuncionario(user[i].innerText,event.target.id)
        })
    })
}
async function modalDemitirFuncionario(string,id){
    const back = document.querySelector(".background")
    back.innerHTML = ""
    back.classList.add("aaa")
    back.insertAdjacentHTML("afterbegin",`
        <div class="delet flex align-item justify-content collum">
            <div class="width-80 flex reverse"><button class="fechar-xx">X</button></div>
            <h1>Realmente deseja remover o usuário ${string} e demitir seus funcionários?</h1>
            <button id="${id}" class="check">Confirmar</button>
        </div>  
    `)
    const check = document.querySelector(".check")
    const div   = document.querySelector("delet")
    check.addEventListener("click",async(event)=>{
        demitirFuncionario(event.target.id)
        back.classList.remove("aaa")
        back.innerHTML = ""
        setTimeout(()=>{createModalContratar(idd,newObj)},100)
    })
}
export async function renderUsers(arr){
    const ul = document.querySelector(".ul-list-user-adm")
    const newArr = []
    arr.filter(element => {
        if(element.department_uuid !== null ){
            newArr.push(element)
        }
    })
    ul.innerHTML = ""
    newArr.forEach(element => {
        ul.insertAdjacentHTML("afterbegin",`
            <li class="li-list-user-adm">
                <div class="box_li">
                    <h2 class="subTitle-adm-h3">${element.username}</h2>
                    <p>${element.professional_level}</p>
                    <span id="${element.department_uuid}" class="span">Company Name</span>
                </div>
                <div class="bbx width-100 flex align-item justify-content">
                    <div class="penPurple" id="${element.uuid}" src="../../purple.png"></div>
                    <img id="${element.uuid}" class="lixeraUser"src="../../acets/delet.png" alt="deletar usuario">
                </div>
            </li>
        `)
    })
    deletConta()
    const pen = document.querySelectorAll(".penPurple")
    pen.forEach(element => {
        element.addEventListener("click",async(event)=>{
           createModalEditUser2(event.target.id)
        })
    })
    const span = document.querySelectorAll(".span")
    const array = await renderDepartament()
    const list = []
    let contador = 0
    array.filter((element,i) =>{
           span.forEach(e => {
                if(e.id == element.uuid){
                    e.innerText = element.name 
                }
           })
    })

}
function createModalEditUser2(id){
    const back = document.querySelector(".background")
    back.classList.add("aaa")
    back.insertAdjacentHTML("afterbegin",`
    <div class="box-div flex collum align-item justify-content">
        <div class="width-80 flex reverse divButt"><button class="eee">X</button></div>
        <h1>Editar Usuário</h1>
        <div class="select-ddd selll">
            <p class="typeWork">Selecionar modalidade de trabalho</p>
            <img class="typeM" src="../../acets/setaDonw.png" alt=""></div>
        <div class="select-ddd selll1">
            <p class="levelUp">Selecionar nível profissional</p>
            <img class="level" src="../../acets/setaDonw.png" alt=""></div>
        <button id="${id}" class="editar-user-ddd">Editar</button>
    </div>
    `)
    const boxButton = document.querySelector(".selll") 
    const box = document.querySelector(".selll1")
    const work  = document.querySelector(".typeWork")
    const p = document.querySelector(".levelUp")

    back.addEventListener("click",(event) =>{
        if(event.target.classList == "background aaa" || event.target.classList == "eee"){
            back.classList.remove("aaa")
            back.innerHTML = ""
         }else if(event.target.classList == "typeM"){
            boxButton.insertAdjacentHTML("afterbegin",`
                <div class="div-modalidade">
                    <button class="fechar1">fechar</button>
                    <button class="butt">hibrido</button>
                    <button class="butt">home office</button>
                    <button class="butt">presencial</button>
                </div>
            `)
        }else if(event.target.classList == "fechar1"){
            const caixa = document.querySelector(".div-modalidade")
            work.innerText = "Selecionar modalidade de trabalho"
            caixa.remove()
        }
        else if(event.target.classList == "butt"){
            const caixa = document.querySelector(".div-modalidade")
            work.innerText = event.target.innerText
            caixa.remove()
        }else if(event.target.classList == "level"){
            box.insertAdjacentHTML("afterbegin",`
                <div class="div-modalidade">
                    <button class="fechar">fechar</button>
                    <button class="buttLevel">júnior</button>
                    <button class="buttLevel">pleno</button>
                    <button class="buttLevel">sênior</button>
                    <button class="buttLevel">estágio</button>
                </div>
            `)
        }else if(event.target.classList == "fechar"){
            const divv = document.querySelector(".div-modalidade")
            p.innerText = "Selecionar nível profissional"
            divv.remove()
        }else if(event.target.classList == "buttLevel"){
            const divv = document.querySelector(".div-modalidade")
            p.innerText = event.target.innerText
            divv.remove()
        }else if(event.target.classList == "editar-user-ddd"){
            if(p.innerText !== "Selecionar nível profissional" || work.innerText !== "Selecionar modalidade de trabalho"){
                const button = document.querySelector(".editar-user-ddd")
                const obj = {
                    kind_of_work: `${work.innerText}`,
                    professional_level: `${p.innerText}`,
                  }
                editUserAdmin(event.target.id,obj)
                button.classList.add("green")
                button.innerText = "deu tudo certo"
                setTimeout(async()=>{
                    const array = await listUsers()
                    renderUsers(array)
                    back.classList.remove("aaa")
                    back.innerHTML = ""
                },100)


            }
        }
    })
}
function deletConta(){
    const button = document.querySelectorAll(".lixeraUser")
    const h3 = document.querySelectorAll(".subTitle-adm-h3")
    button.forEach((element,i) => {
        element.addEventListener("click",async(event)=>{
            renderCardDeletUser(event.target.id, h3[i].innerText)
        })
    })
}
function renderCardDeletUser(id,string){
    const back = document.querySelector(".background")
    back.innerHTML = ""
    back.classList.add("aaa")
    back.insertAdjacentHTML("afterbegin",`
    <div class="delet flex align-item justify-content collum">
        <div class="width-80 flex reverse"><button class="fechar-xx">X</button></div>
        <h1>Realmente deseja deletar e demitir o usuário ${string} e demitir o funcionário?</h1>
        <button class="check">Confirmar</button>
    </div>  
    `)
    back.addEventListener("click",(event)=>{
        if(event.target.classList == "background aaa" || event.target.classList == "fechar-xx"){
            back.classList.remove("aaa")
            back.innerHTML = ""
        }
    })
    const check = document.querySelector(".check")
    check.addEventListener("click",async  () =>{
        deleteUserEDemitir(id)
        back.classList.remove("aaa")
        back.innerHTML = ""
        const array = await listUsers()
        renderUsers(array)
    })
}
/* <li>
        <h3>Nome do colega</h3>
    </li> */