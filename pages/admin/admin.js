import {selecionarEmpresas,renderEmpresasDepartaments} from "../../script/render.js"
import {renderDepartament} from "../../script/ requisitions.js"
selecionarEmpresas()
async function logoutAdmin(){
    const arr = await renderDepartament()
    renderEmpresasDepartaments(arr)
    const button =document.querySelector(".logout")

    button.addEventListener("click", () => {
        localStorage.clear("token")
        window.location.href = "http://127.0.0.1:5500/pages/login/login.html"
    })
}
logoutAdmin()
