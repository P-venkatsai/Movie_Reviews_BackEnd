document.querySelector("#username").addEventListener("change",(e)=>
{
    console.log("hai")
    const req=new XMLHttpRequest()
    // let params=
    // {
    //     name:`venkat sai`,
    //     email:`venkatsaivenke@gmail.com`,
    //     password:`Srilatha@1`
    // }
        req.addEventListener("readystatechange",(e)=>
        {
            if(e.target.readyState==4&&e.target.status==200)
            {
                console.log(JSON.parse(e.currentTarget.responseText))
            }
        })
        req.open("POST",`http://localhost:3000/courseusers/login`,true)
      req.setRequestHeader('Content-type','application/json')
      req.setRequestHeader("Authorization", "Basic " + btoa("aa"+ ":" +"aa")); 
        req.send()
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
            let x=JSON.parse(e.currentTarget.responseText)
            console.log(x)
        }
     }) 
     req.open("GET",`http://localhost:3000/movies`)
     req.send()
})