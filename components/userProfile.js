const userData= JSON.parse(localStorage.getItem("data"));

const personImg=document.getElementById('userImg').src= userData.image;
document.getElementById("name").innerHTML=`${userData.firstName} ${userData.lastName}`;
const email=  document.getElementById("userEmail").innerHTML=userData.email ; 

//console.log(person,"person-name");
// const imgFetched= newData.image;
const gender= document.getElementById("userGender").innerHTML=userData.gender;
document.getElementById("username").innerHTML=userData.username;
document.getElementById("userName").innerHTML=userData.username;

const user=()=>{
    window.location.reload(true);
    window.location.replace('userProfile.html');
}
const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('../index.html');
    chrome.history.deleteAll();
    
}