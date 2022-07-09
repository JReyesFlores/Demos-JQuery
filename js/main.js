$(document).ready(function () {
  const SERVICE = 'https://fakestoreapi.com/products';

  $('#leer').click(function (e) {
    e.preventDefault();
    $.get('assets/archivo.txt', function (data, textStatus, jqXHR) {
      console.log(`data: ${data}`);
      console.log(textStatus);
      console.log(jqXHR);
      if (jqXHR.status === 200) {
        $('#contenido1').text(data);
      }
    });
  });

  $('#leerEmpleado').on('click', function (e) {
    e.preventDefault();
    $.get('assets/empleados.json', function (data, textStatus, jqXHR) {
      console.log(data);
      $('#contenido2').html(`
        <div class="alert alert-primary">
            <strong>Datos empleado</strong> <br>
            <strong>Nombre:</strong> ${data.nombre} <br>
            <strong>Puesto:</strong> ${data.puesto} <br>
            <strong>Edad:</strong> ${data.edad}
        </div>
      `);
    });
  });

  $('#leerServicioWeb').on('click', function (e) {
    let dataFakeStore = [];
    $.ajax({
      beforeSend: function () {
        $('#contenido3').html(`
                  consultando...
              `);
      },
      url: SERVICE,
      type: 'GET',
      data: {},
      success: function (response) {
        console.log(response);
        dataFakeStore = response;
      },
      error: function (jqXHR, estado, error) {
        console.error('Algo falló!!');
      },
      complete: function (jqXHR) {
        //Manipulación del DOM
        const divContenedor = document.createElement('div');
        divContenedor.classList.add('container');

        const divRow = document.createElement('div');
        divRow.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4';

        let strProd = '';
        dataFakeStore.forEach(function (value) {
          strProd += `
                <div class="col">
                    <img src="${value.image}" />
                    <h1>${value.title}</h1><br>
                    <span>${value.category}</span>
                    <p>${value.description}</p>
                </div>
            `;
        });
        divRow.innerHTML = strProd;
        divContenedor.appendChild(divRow);
        //Agregando el contenido a través de Javascript (<ES6)
        //contenido3.appendChild(divContenedor);

        //Agregando contenido a través de JQuery
        $('#contenido3').html(divContenedor);
      },
      //timeout: 10000,
    });
  });

  $('#leerServicioWeb2').on('click', function () {
    var misdatosprod = [];
    $.ajax({
      url: SERVICE,
      type: 'GET',
      data: {},
      success: function (response) {
        console.log(response);
        misdatosprod = response;
      },
      complete: function (xq) {
        var cadena = '';
        misdatosprod.forEach(function (item) {
          cadena += `<option>${item.title}</option>`;
        });
        console.log(cadena);
        $('#listaProductos').html(cadena);
      },
    });
  });
});
