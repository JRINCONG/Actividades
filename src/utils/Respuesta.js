const Respuesta  = (results,token)=>{
const ruta ='http://localhost:8080/api/v1/users/'
return   `<!DOCTYPE html>
<html lang="es">
<head>

    
</head> 
<body>
 <div class="homePage">
       <div class="col-xs-12 col-sm-12 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10">
           <div class="container col-md-12 col-lg-12">
               <!--Inicio recuperar contraseña -->
        <h2 class="form-signin-heading recuperarPassTitl text-center">Olvidaste tu contraseña </h2>
        <p class="subtreestablecerPass text-center">Hola ${results.firstName} ${results.lastName}, para cambiar la contraseña debes de dar <a href=${ruta}${token}/recover-password> click aca</a> </a></p>       
       
      <form class="form-signin panel center-block " role="form">
        <h4 class="form-signin-heading siginsubTitl text-center">Por favor, escribe tu email </h4>
        <input type="email" class="form-control" placeholder="Correo electrónico" required autofocus>
       
        
      </form>
              
        
    </div>
        
               
        </div>      
               
    </div>               
               
</div>
    

</body>
</html>`

   
}

module.exports=Respuesta;