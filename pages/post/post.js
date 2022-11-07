import {renderInformUser} from '../../script/render.js';
import {verificationUserTokenAdmim} from '../../script/ requisitions.js'

async function logout (){
    const user = await verificationUserTokenAdmim()
    const token = localStorage.getItem("token")
    if(user.is_admin == true){
        return window.location.href = "/pages/admin/admin.html"
    }
    if(!token){
        window.location.href = "/pages/login/login.html"
    }
    const button = document.querySelector(".logout")
    button.addEventListener("click", () => {
        localStorage.clear("token")
        window.location.href = "/pages/login/login.html"
    })  
}
logout()
renderInformUser()
