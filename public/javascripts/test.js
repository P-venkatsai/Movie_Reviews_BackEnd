let token;
document.querySelector("#username").addEventListener("change",(e)=>
{
    console.log("hai")
    const req=new XMLHttpRequest()
     let params=
     {
         username:"enkat",
         password:"S@"
     }
        req.addEventListener("readystatechange",(e)=>
        {
            if(e.target.readyState==4&&e.target.status==200)
            {
                //let data=JSON.parse(e.currentTarget.responseText)
                //token=data.token
                //localStorage.setItem("remtoken",token);
                //console.log(token)
                console.log(e.currentTarget.responseText)
            }
        })
        req.open("POST",`http://localhost:3000/users/login`,true)
      req.setRequestHeader('Content-type','application/json')
        req.send(JSON.stringify(params))
})
document.querySelector("#password").addEventListener("change",(e)=>
{
 let s1=e.target.value 
})
/*let s="venkat sai"
for(let i=0;i<s.length;i++)
{
    console.log(s.charCodeAt(i))
}*/
document.querySelector("#email").addEventListener("change",(e)=>
{
    const req=new XMLHttpRequest()
     req.addEventListener('readystatechange',(e)=>
     {
        if(e.target.readyState==4&&e.target.status==200)
        {
            console.log(e.currentTarget.responseText)
        }
     }) 
     req.open("GET",`http://localhost:3000/users/verifyuser`)
    let token=localStorage.getItem("token")
    req.setRequestHeader('Authorization',`Bearer ${token}`)
     req.send()
})
