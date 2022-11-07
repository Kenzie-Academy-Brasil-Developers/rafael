export async function listAllSectors(){
    try{
        const request = await fetch("http://localhost:6278/companies",{
            method: "GET",
            headers: {
                "content-type":"application/json",
            }
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function register(obj){
    const request = await fetch("http://localhost:6278/auth/register",{
            method: "POST",
            headers: {
                "content-type":"application/json",
            },
            body: JSON.stringify(obj),
              
    }).then(result=>result.json())
    window.location.href = "/pages/login/login.html"
    .catch((err)=>{
        return alert(err)
    })

}
export async function login(obj){
    try{
        const request = await fetch("http://localhost:6278/auth/login",{
            method: "POST",
            headers: {
                "content-type":"application/json",
            },
            body: JSON.stringify(obj)
        })
        if(request.status == 200){  
           const result = await request.json()
           localStorage.setItem("token", JSON.stringify(await result))
           return await request.status
        }    
    }catch(err){
        alert(err)
    }
}
export async function listSetores(string){
    try{
        const request = await fetch(`http://localhost:6278/companies/${string}`,{
            method: "GET",
            headers: {
                "content-type":"application/json",
            },
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function verificationUserTokenAdmim(){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/auth/validate_user`,{
            method: "GET",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function verificationUserToken(){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/users/profile`,{
            method: "GET",
            headers:{
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function editUser(body){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/users`,{
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
            body: JSON.stringify(body)
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function renderDepartament(){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/departments`,{
            method: "GET",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function listDepartments(id){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/departments/${id}`,{
            method: "GET",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function demitirFuncionario(id){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/departments/dismiss/${id}`,{
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function editDepartamento(body,id){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/departments/${id}`,{
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
            body: JSON.stringify(body)
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function deletarDepartamento(id){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/departments/${id}`,{
            method: "DELETE",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function createElementDepatament(body){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/departments`,{
            method: "POST",
            headers:{
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
            body: JSON.stringify(body),
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        console.log(err)
    }
}
export async function listUsers(){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/users`,{
            method: "GET",
            headers:{
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function userDesepremgado(){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/admin/out_of_work        `,{
            method: "GET",
            headers:{
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function contratar(body){
    const div = document.querySelector(".sucesso")
    div.insertAdjacentHTML("afterbegin",`
    <div class="cardSucesso flex align-item">
        <div class="bola"></div>
        <h2>Contratado com sucesso</h2>
    </div>
    `)
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    const request = await fetch("http://localhost:6278/departments/hire/",{
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
            body: JSON.stringify(body),
              
    }).then(result=>result.json())
    .catch((err)=>{
        return alert(err)
    })
    setTimeout(()=>{div.innerHTML = ""},5000)
}
export async function editUserAdmin(id,body){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/admin/update_user/${id}`,{
            method: "PATCH",
            headers:{
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
            body: JSON.stringify(body),
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function deleteUserEDemitir(id){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    try{
        const request = await fetch(`http://localhost:6278/admin/delete_user/${id}`,{
            method: "DELETE",
            headers:{
                "content-type":"application/json",
                "Authorization": `Bearer ${newToken.token}`,
            },
        })
        if(request.status == 200){  
           const result = await request.json()
           return await result
        }    
    }catch(err){
        alert(err)
    }
}