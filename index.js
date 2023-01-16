async function handleForm(){
    const emailEntered=document.getElementById("userEmail").value;
    const passEntered=document.getElementById("userPass").value;
    const fetchedData=await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    
        username: emailEntered,
        password: passEntered,
        // expiresInMins: 60, // optional
        })
    })
    // converting fetched data into json and storing
    const newData =await fetchedData.json();
    console.log(newData);
    //checking if data is stored inn localstorge or not 
    if(await newData?.token?.length == 0 || await newData?.token?.length == undefined)
    {
        document.getElementById("errorMsg").innerHTML="Worng Password or Email";
    }else{
        //and storing fetched data into localstorage
        localStorage.setItem("data",JSON.stringify(newData));
        //fetching all posts
        const fetchedPosts=await fetch('https://dummyjson.com/posts');
        //converting posts into json
        const allPosts =await fetchedPosts.json();
        //storing posts to the localstorage
        localStorage.setItem("posts",JSON.stringify(allPosts.posts));
        //fetching random users 
        const randomUsers=await fetch('https://dummyjson.com/users?limit=10');
        //converting random users data into json
        const randUsers =await randomUsers.json();
        //storing random users data into localstorage
        localStorage.setItem("randUsers",JSON.stringify(allPosts.posts));
        
        

        window.location.reload=true;
        window.location.replace("./components/home.html");
    }
}