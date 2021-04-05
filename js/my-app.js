  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {path: '/registro_cliente/', url: 'registro_cliente.html',},
      {path: '/registro_cadete/', url: 'registro_cadete.html',},
      {path: '/registro_vendedor/', url: 'registro_vendedor.html',},
      {path: '/registro/', url: 'registro.html',},
      {path: '/login/', url: 'Login.html',},
      {path: '/index/', url: 'index.html',},
      {path: '/login_vendedor/', url: 'login_vendedor.html',},
      {path: '/login_cliente/', url: 'login_cliente.html',},
      {path: '/login_cadete/', url: 'login_cadete.html',},
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var email=$$("#correo_login").val();
var obtener_url="";

//Variables globales de los Email, para cuando ingresan a la app redirigirlos a la página que corresponde
var correo_vendedor="";
var correo_cliente="";
var correo_cadete="";


var map, platform;
var pos, latitud, longitud;

var direccion_cliente_mapa="";
var direccion_vendedor_mapa="";

var idDoc = '';
var NomNegocio = '';
var DirNegocio = '';
var Desc1 = '';
var Desc2 = '';
var Precio1 = '';
var Precio2 = '';
var URL1 = '';
var URL2 = '';


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    platform = new H.service.Platform({
      'apikey': 'HWs8cxAE6IU2UnCiHU0H4OOwq53hRA6liHbfgGbaLnI'
     });
  
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  console.log("Index")
  // $$('.login-screen').on('loginscreen:open', function (e) {
    $$('.login-screen').on('loginscreen:opened', function (e) {
    console.log('Login screen open')
    $$('.btnlogin').on('click', function(){
  });
  })
  
  $$('.login-screen').on('loginscreen:opened', function (e) {
    console.log('Login screen opened')
  });

 })


// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="login"]', function (e) {
  console.log("login")

  $$("#login").on('click', fnLogin)
    // Do something here when page with data-name="about" attribute loaded and initialized

//Lo pongo acá para obtener la dirreción de los vendedores y clientes, para la sesion del cadete porque si tarda mucho no me carga el mapa. 
    // var vendedorRef = db.collection("Vendedores");
    // vendedorRef.get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //       direccion_mapa=doc.data().Direccion;
    //       direccion_vendedor_mapa=direccion_mapa;
    //       console.log("En el each: " +direccion_vendedor_mapa)
    //     })
    //   })

    //   console.log("Afuera del each: " +direccion_vendedor_mapa)
    //   var ClienteRef = db.collection("Clientes");
    //   ClienteRef.get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //     direccion_cliente_mapa=doc.data().Direccion;
    //       })
    //     })


    //     var vendedorRef = db.collection("Vendedores");
    //     vendedorRef.get().then((querySnapshot) => {
    //           querySnapshot.forEach((doc) => {
                
    //                correo_vendedor=doc.data().Correo;
        
    //             })
        
    //     });



  })




  //Registro Cliente 
$$(document).on('page:init', '.page[data-name="registro_cliente"]', function (e) {
      // $$('.login-screen').on('loginscreen:close', function (e) {
    //   console.log('Login screen close')
    // });
    // $$('.login-screen').on('loginscreen:closed', function (e) {
    //   console.log('Login screen closed')
    // });
    console.log("registro cliente")

    $$("#btnRegistro").on('click', fnRegistroCliente)
    
    })


//Botones de quien se va a registrar | por el momento no hace naranja, pero por las dudas, la dejo.
$$(document).on('page:init', '.page[data-name="registro_cadete"]', function (e) {

   $$("#btnRegistro_cadete").on('click', fnRegistroCadete)
    
    })

$$(document).on('page:init', '.page[data-name="registro_vendedor"]', function (e) {

    $$("#btnRegistro_vendedor").on('click', fnRegistroVendedor)
       
    })    


$$(document).on('page:init', '.page[data-name="login_vendedor"]', function (e) {
  console.log("Estoy en el log in vendedor")

  var vendedorRef = db.collection("Vendedores");
  vendedorRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if ((doc.id==$$("#correo_login").val())==true){
            nombre=doc.data().Comercio;
            $$("#nombre_negocio").html(nombre);

            direcciones=doc.data().Direccion;
            $$("#direccion_vendedor").html(direcciones);
            console.log("Mira, estoy adentro del if y el nombre es: " +direcciones)
          }
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id==$$("#correo_login").val(), " => ", doc.data().Comercio)
          })

});

//Descripción de lo que vende.
var modificar_descripcion = db.collection("Vendedores");

modificar_descripcion.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if ((doc.id==$$("#correo_login").val())==true){

          modificacion=doc.data().Descripcion;
          $$("#descripcion_vendedor").html(modificacion);
          console.log("Descripción: " +modificacion)

          precio=doc.data().Precio;
          $$("#precio_vendedor").html(precio);
          console.log("Precio: " +precio)

          foto_1=doc.data().FotoUrl;
          $$("#foto_subida").attr("src",foto_1)
          console.log("Acá es fotaza: "+foto_1)

          // modificacion_2=doc.data().Descripcion_2;
          // $$("#descripcion_vendedor_2").html(modificacion_2);
          // console.log("Descripción_2: " +modificacion_2)

          // precio_2=doc.data().Precio_2;
          // $$("#precio_vendedor_2").html(precio_2);
          // console.log("Precio_2: " +precio_2)

        }  
        })
      })

var modificar_descripcion_2 = db.collection("Vendedores");      

modificar_descripcion_2.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if ((doc.id==$$("#correo_login").val())==true){
  
          modificacion_2=doc.data().Descripcion_2;
          $$("#descripcion_vendedor_2").html(modificacion_2);
          console.log("Descripción_2: " +modificacion_2)

          precio_2=doc.data().Precio_2;
          $$("#precio_vendedor_2").html(precio_2);
          console.log("Precio_2: " +precio_2)

          foto_2=doc.data().FotoUrl_2;
          $$("#foto_subida2").attr("src",foto_2)
          console.log("Acá es fotaza: "+foto_2)


        }  
      })
    })


    var PedidoRef = db.collection("MisPedidos");
    PedidoRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            Pedido_Cliente_1=doc.data().Pedido_1;
            $$("#item_pedido_1").html(Pedido_Cliente_1)

            Direccion_Cliente=doc.data().Direccion_Pedido_1;
            $$("#Direccion_Cliente_1").html(Direccion_Cliente)
  
            Pedido_Cliente_2=doc.data().Pedido_2;
            $$("#item_pedido_2").html(Pedido_Cliente_2)

            Direccion_Cliente_2=doc.data().Direccion_Pedido_2;
            $$("#Direccion_Cliente_2").html(Direccion_Cliente_2)
  
  })
  
  })


$$("#editar_publicacion").on('click' , fnEditarPublicacion)

$$("#editar_precio").on('click' , fnEditarPublicacion)

$$("#editar_foto").on('click' , fnEditarFoto)

// $$("#subir_img").on('click' , fnSubirFoto)

// $$("#foto_subida").on('click' , fnCambiarFoto)



$$("#editar_publicacion2").on('click' , fnEditarPublicacion2)

$$("#editar_precio2").on('click' , fnEditarPublicacion2)

$$("#editar_foto2").on('click' , fnEditarFoto2)

$$("#cerrar_sesion").on('click' , fnLogOut)



console.log("Estoy reinciando la consola, funciona? "+obtener_url)

//DESCRIPCION DE LA PUBLICACION POR PARTE DEL VENDEDOR | PENSAR COMO HACER SI SON MUCHAS PERSONAS LAS QUE VAN A PUBLICAR, POR EL TEMA DEL ID. 

// foto_vendedor=$$("#editar_vendedor").src();

// 

});


$$(document).on('page:init', '.page[data-name="login_cliente"]', function (e) {

    var VendedorRef = db.collection("Vendedores");
    var NomNegocio = '';
    var DirNegocio = '';
    var Desc1 = '';
    var Desc2 = '';
    var Precio1 = '';
    var Precio2 = '';
    var URL1 = '';
    var URL2 = '';
  
// console.log("Las desc 1: " +Desc1 + "La descr 2: " +Desc2)
  
    VendedorRef.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

            NomNegocio = doc.data().Comercio;
            DirNegocio = doc.data().Direccion;

            Desc1 = doc.data().Descripcion;
            Desc2 = doc.data().Descripcion_2;
            Precio1 = doc.data().Precio;
            Precio2 = doc.data().Precio_2;
            URL1 = doc.data().FotoUrl;
            URL2 = doc.data().FotoUrl_2;

            Precio1=parseInt(Precio1);
            Precio2=parseInt(Precio2);
    
  
          $$('#ListaProductos').append(`
            <div class="card demo-facebook-card">
              <div class="card-header">
                <div class="demo-facebook-avatar"><img src="img/orange.png"
                    width="34" height="34" /></div>
  
                    <!-- id="cliente_nombre_negocio" -->
                <div class="demo-facebook-name cliente_nombre_negocio" >${NomNegocio}</div>
                <!-- id="cliente_direccion_vendedor" -->
                <div class="demo-facebook-date cliente_direccion_vendedor"  >${DirNegocio}</div>
              </div>
  
              <div class="text-editor-content" id="cliente_descripcion_vendedor" contenteditable="true"> ${Desc1} </div>
  
              <img src="${URL1}" id="cliente_foto_subida" width="100%" />
              <br>
              <p><a class="button button-raised button-fill color-bordo width-25 sheet-open" id="cliente_precio_vendedor" href="#" data-sheet=".my-sheet-swipe-to-step">PAGAR: $${Precio1}</a>
              </p>
              <div class="sheet-modal my-sheet-swipe-to-step" style="height:auto; --f7-sheet-bg-color: #fff;">
                <div class="sheet-modal-inner">
                  <div class="sheet-modal-swipe-step">
                    <div class="display-flex padding justify-content-space-between align-items-center">
                      <div style="font-size: 18px">Total:  <b class="precio_final_cliente_1">$${Precio1+120} </b></div>
                      <div style="font-size: 22px" class="cliente_precio_vendedor_swipe" ><b> </b></div>
                    </div>
                    <div class="padding-horizontal padding-bottom">
                      <a class="button button-large button-fill color-red" id="realizar_pago_1" >Realizar Pago</a>
                    </div>
                  </div>
                  <div class="block-title block-title-medium margin-top">Tu orden:</div>
                  <div class="list no-hairlines">
                    <ul>
                      <li class="item-content">
                        <div class="item-inner">
                          <div class="item-title item_comida_1"> ${Desc1} </div>
                          <div class="item-after text-color-black "><b class="precio_comida_1">$${Precio1}</b></div>
                        </div>
                      </li>
                      <li class="item-content">
                        <div class="item-inner">
                          <div class="item-title">Delivery</div>
                          <div class="item-after text-color-black"><b class="precio_delivery"> $120 </b></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div class="card demo-facebook-card">
            <div class="card-header">
              <div class="demo-facebook-avatar"><img src="img/red.png"
                  width="34" height="34" /></div>
  
                 
              <div class="demo-facebook-name cliente_nombre_negocio" >${NomNegocio}</div>
            
              <div class="demo-facebook-date cliente_direccion_vendedor"  >${DirNegocio}</div>
            </div>
  
            <div class="text-editor-content" id="cliente_descripcion_vendedor" contenteditable="true"> ${Desc2} </div>
  
            <img src="${URL2}" id="cliente_foto_subida" width="100%" />
            <br>
            <p><a class="button button-raised button-fill color-bordo width-25 sheet-open" id="cliente_precio_vendedor" href="#" data-sheet=".my-sheet-swipe-to-step">PAGAR: $${Precio2}</a>
            </p>
            <div class="sheet-modal my-sheet-swipe-to-step" style="height:auto; --f7-sheet-bg-color: #fff;">
              <div class="sheet-modal-inner">
                <div class="sheet-modal-swipe-step">
                  <div class="display-flex padding justify-content-space-between align-items-center">
                    <div style="font-size: 18px">Total:  <b class="precio_final_cliente_2">$${Precio2+120}</b></div>
                    <div style="font-size: 22px" class="cliente_precio_vendedor_swipe" ><b></b></div>
                  </div>
                  <div class="padding-horizontal padding-bottom">
                    <a class="button button-large button-fill color-red" id="realizar_pago_1" >Realizar Pago</a>
                  </div>
                </div>
                <div class="block-title block-title-medium margin-top">Tu orden:</div>
                <div class="list no-hairlines">
                  <ul>
                    <li class="item-content">
                      <div class="item-inner">
                        <div class="item-title item_comida_1">${Desc2}</div>
                        <div class="item-after text-color-black "><b class="precio_comida_1">$${Precio2}</b></div>
                      </div>
                    </li>
                    <li class="item-content">
                      <div class="item-inner">
                        <div class="item-title">Delivery</div>
                        <div class="item-after text-color-black"><b class="precio_delivery"> $120 </b></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <br/>
          `);
        })


        // .catch((error) => console.error("Error cargarNota para editar: ", error));
        });
      // })
      // .catch((error) => console.error("Error cargar QueVende: ", error));
  
 

//   var vendedorRef = db.collection("Vendedores");
//   vendedorRef.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {

          

//             NombreNegocio=doc.data().Comercio;
//             console.log(NombreNegocio)
//             $$(".cliente_nombre_negocio").html(NombreNegocio);
            

//             DireccionNegocio=doc.data().Direccion;
//             $$(".cliente_direccion_vendedor").html(DireccionNegocio);

//             // NombreNegocio_2=doc.data().Comercio;
//             // $$("#cliente_nombre_negocio").html(NombreNegocio_2);

//             // DireccionNegocio_2=doc.data().Direccion;
//             // $$("#cliente_direccion_vendedor").html(DireccionNegocio_2);



//         })

//       })


//           var QueVendeRef = db.collection("Quevende");
//           QueVendeRef.get().then((querySnapshot) => {
//                 querySnapshot.forEach((doc) => {
            
//                     DescripcionNegocio_1=doc.data().Descripcion;
//                     $$("#cliente_descripcion_vendedor").html(DescripcionNegocio_1);
        
//                     PrecioNegocio_1=doc.data().Precio;
//                     $$("#cliente_precio_vendedor").html("PAGAR: $" +PrecioNegocio_1);

//                     FotoComida_1=doc.data().FotoUrl;
//                     $$("#cliente_foto_subida").attr("src", FotoComida_1);

//                     DescripcionNegocio_2=doc.data().Descripcion_2;
//                     $$("#cliente_descripcion_vendedor_2").html(DescripcionNegocio_2);
        
//                     PrecioNegocio_2=doc.data().Precio_2;
//                     $$("#cliente_precio_vendedor_2").html("PAGAR: $" +PrecioNegocio_2);

//                     FotoComida_2=doc.data().FotoUrl_2;
//                     $$("#cliente_foto_subida2").attr("src", FotoComida_2);
// //

//                     Precio_1=doc.data().Precio;
//                     $$(".precio_comida_1").html("$" + Precio_1);

//                     item_comida_1=doc.data().Descripcion;
//                     $$(".item_comida_1").html(item_comida_1);

//                     precio_delivery=$$(".precio_delivery").html("$"+ 120)

                    
//                     Precio_1= parseInt(Precio_1);

//                     Total_1=(Precio_1 + 120)

//                     precio_final_cliente_1=$$(".precio_final_cliente_1").html("$" + Total_1)

                    
//                     $$(".precio_comida" ).html("$"+ (Precio_1))
//           //
          
//                     Precio_2=doc.data().Precio_2;
//                     $$(".precio_comida_2").html("$" + Precio_2);

//                     item_comida_2=doc.data().Descripcion_2;
//                     $$(".item_comida_2").html(item_comida_2);

//                     precio_delivery=$$(".precio_delivery").html("$"+ 120)

                    
//                     Precio_2= parseInt(Precio_2);

//                     Total_2=(Precio_2 + 120)

//                     precio_final_cliente_2=$$(".precio_final_cliente_2").html("$" + Total_2)

                    
//                     $$(".precio_comida" ).html("$"+ (Precio_2))
          


//         })
//       })
  


      // $$("#cliente_foto_subida").attr("src", url);

  // cliente_nombre_negocio
  // cliente_direccion_vendedor
  // cliente_descripcion_vendedor
  // cliente_foto_subida
  // cliente_precio_vendedor


  // cliente_nombre_negocio
  // cliente_direccion_vendedor
  // cliente_descripcion_vendedor_2
  // cliente_foto_subida2
  // cliente_precio_vendedor_2


  $$("#cerrar_sesion").on('click' , fnLogOut)

  $$("#realizar_pago_1").on('click' , fnPedidoDelCliente)
  $$("#realizar_pago_2").on('click' , fnPedidoDelCliente2)



})


//Falta completar este mapa, falta que me marque la ubicación real del cadete y me marque el punto A y B
$$(document).on('page:init', '.page[data-name="login_cadete"]', function (e) {
  console.log("Estoy en el log in Cadete")
  $$("#cerrar_sesion").on('click' , fnLogOut)

  var platform = new H.service.Platform({
    'apikey': 'HWs8cxAE6IU2UnCiHU0H4OOwq53hRA6liHbfgGbaLnI'
  });

 
    var defaultLayers = platform.createDefaultLayers();
   
    // valorizamos inicialmente las variables con las coordenadas actuales de la direccion

   
    // Instantiate (and display) a map object:
    map = new H.Map( document.getElementById('map'), defaultLayers.vector.normal.map,
    {
      zoom: 16,
      center: { lat: -31.8676271, lng: -59.0270174},
      volatility: true,
      pixelRatio: window.devicePixelRatio || 1
      });
// Instantiate a map and platform object:


// Get an instance of the geocoding service:
var service = platform.getSearchService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
service.geocode({
  q: 'San Martin 090, Villaguay , Entre Rios, Argentina'
}, (result) => {
  // Add a marker for each location found
  result.items.forEach((item) => {
    map.addObject(new H.map.Marker(item.position));
  });
}, alert);

// Get an instance of the routing service version 8:
var router = platform.getRoutingService(null, 8);

// Call calculateRoute() with the routing parameters,
// the callback and an error callback function (called if a
// communication error occurs):
router.calculateRoute(routingParameters, onResult,
  function(error) {
    alert(error.message);
  });
})




function fnRegistroCliente () {

//Registro Cliente
      email_cliente=$$("#correo_cliente").val();
      password_cliente=$$("#pass_cliente").val();
      nombre_cliente=$$("#nombre_cliente").val();
      apellido_cliente=$$("#apellido_cliente").val();
      direccion_cliente=$$("#direccion_cliente").val();
  
      firebase.auth().createUserWithEmailAndPassword(email_cliente, password_cliente)
    .then((user) => {
      app.dialog.alert('¡Gracias por sumarte!', "¡Registro exitoso!");
      console.log("Estoy adentro del then user: ")
      temp = setTimeout(redireccion, 3000);

      //Datos que se guardan en la BBDD clientes. 
      datos_clientes = {
          Nombre: nombre_cliente,
          Apellido: apellido_cliente,
          Correo: email_cliente,
          Direccion: direccion_cliente
        };     
      col_clientes.doc(email_cliente).set(datos_clientes);
    })
    
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
    
}


function fnRegistroCadete () { 
//Registro Cadete
    email_cadete=$$("#correo_cadete").val();
    password_cadete=$$("#pass_cadete").val();
    nombre_cadete=$$("#nombre_cadete").val();
    apellido_cadete=$$("#apellido_cadete").val();
    telefono_cadete=$$("#telefono_cadete").val();

    firebase.auth().createUserWithEmailAndPassword(email_cadete, password_cadete)
  .then((user) => {
    app.dialog.alert('¡Gracias por sumarte!', "¡Registro exitoso!");
    console.log("Estoy adentro del then user: ")
    temp = setTimeout(redireccion, 3000);

//Datos que se guardan en la BBDD Cadete. 
    datos_cadete = {
        Nombre: nombre_cadete,
        Apellido: apellido_cadete,
        Correo: email_cadete,
        Telefono: telefono_cadete
      };     
    col_cadetes.doc(email_cadete).set(datos_cadete);
  })

  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

} 


function fnRegistroVendedor() {
//Registro Vendedor
  var email_vendedor=$$("#correo_vendedor").val();
  password_vendedor=$$("#pass_vendedor").val();
  nombre_vendedor=$$("#nombre_vendedor").val();
  apellido_vendedor=$$("#apellido_vendedor").val();
  comercio_vendedor=$$("#comercio_vendedor").val();
  direccion_vendedor=$$("#direccion_vendedor").val();
  telefono_vendedor=$$("#telefono_vendedor").val();
  quevende_vendedor=$$("#quevende_vendedor").val();

  firebase.auth().createUserWithEmailAndPassword(email_vendedor, password_vendedor)
.then((user) => {
  app.dialog.alert('¡Gracias por sumarte!', "¡Registro exitoso!");
  console.log("Estoy adentro del then user: ")
  temp = setTimeout(redireccion, 3000);

//Datos que se guardan en la BBDD Vendedor. 
  datos_vendedor = {
      Nombre: nombre_vendedor,
      Apellido: apellido_vendedor,
      Correo: email_vendedor,
      Comercio: comercio_vendedor,
      Telefono: telefono_vendedor,
      Direccion: direccion_vendedor,
      QueVende: quevende_vendedor
    };     
    col_vendedores.doc(email_vendedor).set(datos_vendedor);
})


    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  
}


function fnLogin () {



email=$$("#correo_login").val();
password=$$("#pass_login").val();
           

var vendedorRef = db.collection("Vendedores");
var ClienteRef = db.collection("Clientes");
var CadeteRef = db.collection("Cadetes");

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    vendedorRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if ((doc.id==$$("#correo_login").val())){
          correo_vendedor=true;
          console.log("La condición del IF TRUE VENDEDOR"+correo_vendedor)

          console.log("Estoy adentro del IF true del vendedor, del then" +correo_vendedor)
          app.dialog.alert('¡Bienvenid@!', "Ingreso exitoso!");
          mainView.router.navigate('/login_vendedor/');
        }


      })

      })

      ClienteRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if ((doc.id==$$("#correo_login").val())){
            correo_cliente=true;
            console.log("La condición del IF TRUE Cliente"+correo_cliente)

            console.log("Estoy adentro del IF true del vendedor, del then //  Cliente" +correo_cliente)
            app.dialog.alert('¡Bienvenid@!', "Ingreso exitoso!");
            mainView.router.navigate('/login_cliente/');
          }

  
        })
  
        })


        CadeteRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if ((doc.id==$$("#correo_login").val())){
              correo_cadete=true;
              console.log("La condición del IF TRUE Cadete"+correo_cadete)
  
              console.log("Estoy adentro del IF true del vendedor, del then //  Cadete " +correo_cadete)
              app.dialog.alert('¡Bienvenid@!', "Ingreso exitoso!");
              mainView.router.navigate('/login_cadete/');
            }
  
    
          })
    
          })

    // console.log("Estoy adentro del IF true del vendedor, del then" +correo_vendedor)
    // }

        // if (email != $$("#correo_login").val())  {
        //   console.log("Estoy adentro del IF. ")
        //   mainView.router.navigate('/login_vendedor/');
        // }
        // if (email == $$("#correo_login").val())  {
        //   console.log("Estoy adentro del IF. ")
        //   mainView.router.navigate('/prueba_if/');
        // }
    
    

    // app.dialog.alert('¡Bienvenid@!', "Ingreso exitoso!");
    
    

    // ...
  })

  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  

}


//Una vez que hace click en registrarse que lo lleve a la página de Inicio para que inicie sesión.
function redireccion() {
        window.location = "index.html";
}


function fnEditarPublicacion () {

var contenteditable = app.textEditor.get('.text-editor-content');

//Se setea los valores que va a tener la BBDD.



var vendedorRef = db.collection("Vendedores");
vendedorRef.get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {

    id_vendedor=$$("#correo_login").val();
    decripcion_vendedor=$$("#descripcion_vendedor").html();
    precio_vendedor=$$("#precio_vendedor").html();

     var setWithMerge = col_vendedores.doc(id_vendedor).set({  Descripcion: decripcion_vendedor,
      Precio: precio_vendedor,}, {merge: true});
    })
     })

     var email_vendedor="";

app.dialog.preloader("Realizando cambios..")
setTimeout(function () {
  app.dialog.close();
  mainView.router.refreshPage()
}, 1000);

}
  

function fnEditarPublicacion2 () {
  var contenteditable = app.textEditor.get('.text-editor-content');

//Se setea los valores que va a tener la BBDD.


var vendedorRef = db.collection("Vendedores");
vendedorRef.get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {

   
    
     id_vendedor=$$("#correo_login").val();
     decripcion_vendedor_2=$$("#descripcion_vendedor_2").html();
     precio_vendedor_2=$$("#precio_vendedor_2").html();

     var setWithMerge = col_vendedores.doc(id_vendedor).set({  Descripcion_2: decripcion_vendedor_2,
      Precio_2: precio_vendedor_2,}, {merge: true});
    })
     })


app.dialog.preloader("Realizando cambios..")
setTimeout(function () {
  app.dialog.close();
  mainView.router.refreshPage()
}, 1000);

}


function fnEditarFoto(){
  console.log("hola")
  console.log(email)
  var archivo = document.getElementById("algo").files[0];
  var storage = firebase.storage();
  var storageRef = storage.ref('/"'+email+'"/"'+archivo.name+'"'); 
  storageRef.put(archivo);



	storage.ref('/"'+email+'"/"'+archivo.name+'"').getDownloadURL() //pongo la ruta de la imagen en el storage
	.then(function(url) {
		console.log("url: "+url);


    // obtener_url=url;
		$$("#foto_subida").attr("src", url); //muestro la imagen en un div


    var vendedorRef = db.collection("Vendedores");
    vendedorRef.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
    
        id_vendedor=$$("#correo_login").val();
         
         col_vendedores.doc(id_vendedor).update({
          FotoUrl: url,
        })
      }).catch(function(error) {
        console.log("Error: "+error);
      });

      })



})

}


function fnEditarFoto2(){
  console.log("hola")
  console.log(email)
  var archivo = document.getElementById("algo_2").files[0];
  var storage = firebase.storage();
  var storageRef = storage.ref('/"'+email+'"/"'+archivo.name+'"'); 
  storageRef.put(archivo);



	storage.ref('/"'+email+'"/"'+archivo.name+'"').getDownloadURL() //pongo la ruta de la imagen en el storage
	.then(function(url) {
		console.log("url: "+url);

		$$("#foto_subida2").attr("src", url); //muestro la imagen en un div




    

    var vendedorRef = db.collection("Vendedores");
    vendedorRef.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
    
        id_vendedor=$$("#correo_login").val();
        
         col_vendedores.doc(id_vendedor).update({
          FotoUrl_2: url,

        })
      
      }).catch(function(error) {
        console.log("Error: "+error);
      });

      })
		
  // $$("#foto_subida2").attr(tuvieja);
})	

}



function fnLogOut(){
  // var logOut = () => {

    var user = firebase.auth().currentUser;

    app.dialog.preloader("Cerrando sesion..")
    setTimeout(function () {
      app.dialog.close();
      mainView.router.refreshPage()
    }, 500);

    if (user) {
        firebase.auth().signOut()
            .then(() => {
                console.log('Cerrar sesión');

                mainView.router.navigate('/index/');
            })
            .catch((error) => {
                console.log('error '+error);
            });
    } else {
      console.log('Ya cerre sesion');
    }



}



function fnMapas(){
 
}


function fnPedidoDelCliente() {

//Traigo de la BBDD el pedido 1

var QueVendeRef = db.collection("Quevende");
QueVendeRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

          DescripcionPedido_1=doc.data().Descripcion;
          // $$("#item_pedido_1").html(DescripcionPedido_1);


          col_mispedidos.doc(correo_vendedor).update({
            Pedido_1: DescripcionPedido_1,
          })

})
})




var ClienteRef = db.collection("Clientes");
ClienteRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

          Direccion_Cliente_1=doc.data().Direccion;

          col_mispedidos.doc(correo_vendedor).update({
          Direccion_Pedido_1: Direccion_Cliente_1,

          })
          
})
})

}


function fnPedidoDelCliente2() {

  //Traigo de la BBDD el pedido 1
  
  var QueVendeRef = db.collection("Quevende");
  QueVendeRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
  
  
            DescripcionPedido_2=doc.data().Descripcion_2;
            // $$("#item_pedido_2").html(DescripcionPedido_1);
  
            col_mispedidos.doc(correo_vendedor).update({

              Pedido_2: DescripcionNegocio_2,
            })
  
  })
  })
  
  
  
  
  var ClienteRef = db.collection("Clientes");
  ClienteRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
  
            Direccion_Cliente_2=doc.data().Direccion;
  
            col_mispedidos.doc(correo_vendedor).update({
            Direccion_Pedido_2: Direccion_Cliente_2,
  
            })
            
  })
  })
  
  }





  //BBDD: 

var db = firebase.firestore();
var col_clientes = db.collection("Clientes");
var col_cadetes = db.collection("Cadetes");
var col_vendedores = db.collection("Vendedores");
var col_quevende = db.collection("Quevende");
var col_mispedidos = db.collection("MisPedidos");





