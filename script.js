$(document).ready(function () {
    let valor = $('#inputValor').val();

    $("#boton").click(() => {
        console.log('CLICKCICKCI')

        $.ajax({
            url: `https://superheroapi.com/api.php/10226907496816999/${valor}`,
            type: 'GET',
            DataType:'JSON',
            success(data){
            console.log('correcto')
            pintarElementos(data);
            },
            error(e){
                console.log('Ocurrió un error.')
                console.log(e)
            }
        })
    });


    const pintarElementos = (data) => {
        console.log('desde pintarElementos', data);
        $('#listarPosts').html("");


        // const dataPoints = data.map(item =>({y: item.powerstats.intelligence, x: item.powerstats.strength}));

        const opciones = {
            title: {text: 'Estadisticas'},
            axisX: {
                title: 'ESTADISTICAS HABILIDADES'
            },
            axisY:{
                title: 'RANGO'
            },
            data: [
                {
                    type: 'column',
                    dataPoints:[
                        {label: "Inteligencia", y: data.powerstats.intelligence},
                        {label: "strength", y: data.powerstats.strength},
                        {label: "speed", y: data.powerstats.speed},
                        {label: "durability", y: data.powerstats.durability},
                        {label: "power", y: data.powerstats.power},
                        {label: "combat", y: data.powerstats.combat},

                    ]
                }
            ]
        }

        $('#chart').CanvasJSChart(opciones);


        // parseo de objeto a array

        let filtroArray = Object.values(data.biography);


        let filtroArrayApariencia = Object.values(data.appearance);
        

        let filtroArrayconnections = Object.values(data.connections);
        console.log(filtroArrayconnections)


            $('#listarPosts').append(`
            <div class="col-md-12 col-12 text-center ">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title"> ${data.name}</div>
                        <img src="${data.image.url} ">
                        <div class="row">  
                            <div class="col-md-6 col-12">
                                <p>Inteligencia: ${data.powerstats.intelligence}</p>
                                <p>Fuerza: ${data.powerstats.strength}</p>
                                <p>Velocidad: ${data.powerstats.speed}</p>
                                <p>Durabilidad: ${data.powerstats.durability}</p>
                                <p>Poder: ${data.powerstats.power}</p>
                                <p>Combate: ${data.powerstats.combat}</p>
                            </div>
                            <div class="col-md-6 col-12">
                            <h4>Biografía </h4>
                                <p>Nombre Completo: ${filtroArray[0]}</p>
                                <p>Alter egos: ${filtroArray[1]}</p>
                                <p>Alias: ${filtroArray[2][0]}</p>
                                <p>Lugar de Nacimiento: ${filtroArray[3]}</p>
                                <p>Primera Aparición: ${filtroArray[4]}</p>
                                <p>Publicado por: ${filtroArray[5]}</p>
                                <p>alignment: ${filtroArray[6]}</p>

                            </div>
                            
                        
                        </div>
                        <div class="row">
                            <div class="col-md-4 col-12">
                                <h4>Apariencia </h4>
                                <p>Genero: ${data.appearance.gender}</p>
                                <p>Raza: ${data.appearance.race}</p>
                                <p>Altura: ${data.appearance.height}</p>
                                <p>Peso: ${data.appearance.weight}</p>
                                <p>Color Ojos: ${filtroArrayApariencia[4]}</p>
                                <p>Cabello: ${filtroArrayApariencia[5]}</p>
                            </div>


                            <div class="col-md-4 col-12">
                            <h4>Trabajo</h4>
                                <p>Acupacion: ${data.work.accupation}</p>
                                <p>Base: ${data.work.base}</p>
                            </div>

                            <div class="col-md-4 col-12">
                            <h4>Connections</h4>
                                <p>group-affiliation: ${filtroArrayconnections[0]}</p>
                                <p>relatives: ${filtroArrayconnections[1]}</p>
                            </div>
                        </div>
                        <p class="lead">${data.speed}</p>
                    </div>
                </div>
              </div>
            `)
        };

    }

);