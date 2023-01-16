const userData= JSON.parse(localStorage.getItem("data"));
 //console.log(userData);
document.getElementById("userName").innerHTML=`${userData.firstName}`;

const handleLogout = () => {
    
    window.location.reload(true);
    window.location.replace('../index.html');
    window.localStorage.clear();
};

const user=()=>{
    window.location.reload(true);
    window.location.replace('userProfile.html');
}

