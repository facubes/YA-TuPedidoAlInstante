$$(document).on('page:init', '.page[data-name="login_cliente"]', function (e) {
  var VendedorRef = db.collection("Vendedores");
  var QueVendeRef = db.collection("Quevende");
  var idDoc = '';
  var NomNegocio = '';
  var DirNegocio = '';
  var Desc1 = '';
  var Desc2 = '';
  var Precio1 = '';
  var Precio2 = '';
  var URL1 = '';
  var URL2 = '';

  Precio1=parseInt(Precio1);
  Precio2=parseInt(Precio2);

  QueVendeRef.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        idDoc = doc.id;
        Desc1 = doc.data().Descripcion;
        Desc2 = doc.data().Descripcion_2;
        Precio1 = doc.data().Precio;
        Precio2 = doc.data().Precio_2;
        URL1 = doc.data().FotoUrl;
        URL2 = doc.data().FotoUrl_2;

        VendedorRef.doc(idDoc).get()
          .then((doc) => {
            NomNegocio = doc.data().Comercio;
            DirNegocio = doc.data().Direccion;
          })
          .catch((error) => console.error("Error cargarNota para editar: ", error));

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
                    <div style="font-size: 18px">Total:  <b class="precio_final_cliente_1">$${Precio1 + 120} </b></div>
                    <div style="font-size: 22px" class="cliente_precio_vendedor_swipe" ><b> QUE HAY AC?? </b></div>
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
            <div class="demo-facebook-avatar"><img src="img/orange.png"
                width="34" height="34" /></div>

               
            <div class="demo-facebook-name cliente_nombre_negocio" >${NomNegocio}</div>
          
            <div class="demo-facebook-date cliente_direccion_vendedor"  >${DirNegocio}</div>
          </div>

          <div class="text-editor-content" id="cliente_descripcion_vendedor" contenteditable="true"> ${Desc2} </div>

          <img src="${URL1}" id="cliente_foto_subida" width="100%" />
          <br>
          <p><a class="button button-raised button-fill color-bordo width-25 sheet-open" id="cliente_precio_vendedor" href="#" data-sheet=".my-sheet-swipe-to-step">PAGAR: $${Precio2}</a>
          </p>
          <div class="sheet-modal my-sheet-swipe-to-step" style="height:auto; --f7-sheet-bg-color: #fff;">
            <div class="sheet-modal-inner">
              <div class="sheet-modal-swipe-step">
                <div class="display-flex padding justify-content-space-between align-items-center">
                  <div style="font-size: 18px">Total:  <b class="precio_final_cliente_2">$${Precio2 + 120}</b></div>
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
      });
    })
    .catch((error) => console.error("Error cargar QueVende: ", error));

});










//

VendedorRef.get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    idDoc = doc.id;
    NomNegocio = doc.data().Comercio;
    DirNegocio = doc.data().Direccion;


    QueVendeRef.doc(idDoc).get()
      .then((doc) => {


        Desc1 = doc.data().Descripcion;
        Desc2 = doc.data().Descripcion_2;
        Precio1 = doc.data().Precio;
        Precio2 = doc.data().Precio_2;
        URL1 = doc.data().FotoUrl;
        URL2 = doc.data().FotoUrl_2;
