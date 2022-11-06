import {register} from "./ requisitions.js"
export async function coletaDeInputs(){
    const user     = document.querySelector(".user")
    const email2    = document.querySelector(".email")
    const password = document.querySelector(".password")
    const level    = document.querySelector(".level")
    const button   = document.querySelector(".cadastro")

    let nivel = ""
    
    button.addEventListener("click",async (event) =>{
        event.preventDefault()
        if(level.value == ""){
            const result = await register({
                username: `${user.value}` ,
                password: `${password.value}`,
                email: `${email2.value}`,
              },)

        }else{
           const result = await register({
            username: `${user.value}` ,
            password: `${password.value}`,
            email: `${email2.value}`,
            professional_level: `${level.value}`,
          },)
           return result
        }
  
    })
    
}