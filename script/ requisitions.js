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
    console.log(obj)
    const request = await fetch("http://localhost:6278/auth/register",{
            method: "POST",
            headers: {
                "content-type":"application/json",
            },
            body: JSON.stringify(obj),
              
    }).then(result=>result.json())
    .then(result => console.log(result))
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
           return await result
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
           console.log(await result)
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
           console.log(await result)
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
           console.log(await result)
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
           console.log(await result)
           return await result
        }    
    }catch(err){
        alert(err)
    }
}
export async function listDepartments(id){
    const token = localStorage.getItem("token")
    const newToken = JSON.parse(token)
    console.log(id)
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
           console.log(await result)
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
           console.log(await result)
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
           console.log(await result)
           return await result
        }    
    }catch(err){
        alert(err)
    }
}