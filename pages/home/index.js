import { renderCards } from "../../script/render.js";
import { listAllSectors } from "../../script/ requisitions.js"
const request = await listAllSectors()
renderCards(request)
const ancora = document.querySelector(".sumir")
    ancora.addEventListener("click",(event)=>{
        if(event.target.classList == "home"){
            window.location.href = "/pages/login/login.html"
        }else if(event.target.classList == "cadastrar"){
            window.location.href = "/pages/register/register.html"
        }
    })