const btnsignin = document.getElementById("sign-in"),
btnsignup = document.getElementById("sign-up"),
formregistro = document.querySelector(".registro"),
formlogin = document.querySelector(".login");

btnsignin.addEventListener("click",e =>{
    formregistro.classList.add("hide");
    formlogin.classList.remove("hide")
} )

btnsignup.addEventListener("click",e =>{
    formlogin.classList.add("hide");
    formregistro.classList.remove("hide")
} )