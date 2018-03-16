/*Coletor de dados*/

$(document).ready(function(){

	var entrada = Date();
	var saida = "";
	var scroll = "";

	//Adicionar o Modal dinamicamente à página HTML da aplicação que usará a ferramenta, pois não é possível que qualquer pessoa altere o HTML se não o dono da página
	var modal = '<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>' + 
                '<div class="modal fade" id="myModal" role="dialog">' +
        		'<div class="modal-dialog">' +
          		'<div class="modal-content">' +
            	'<div class="modal-header">' +
              	'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
              	'<h4 class="modal-title">Modal Header</h4>' +
            	'</div>' +
            	'<div class="modal-body">' +
              	'<p>Some text in the modal.</p>' +
            	'</div>' +
            	'<div class="modal-footer">' +
              	'<button type="button" class="btn btn-default" data-dismiss="modal">Save</button>' +
              	'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            	'</div>' +
          		'</div>' +
        		'</div>' +
      			'</div>';

    $("body").append(modal);


	// Initialize Firebase
  	var config = {
	    apiKey: "AIzaSyDfV-P1DvRvvBfAUBbCzi90PX96jG5MY2c",
	    authDomain: "coletordados-62e45.firebaseapp.com",
	    databaseURL: "https://coletordados-62e45.firebaseio.com",
	    projectId: "coletordados-62e45",
	    storageBucket: "",
	    messagingSenderId: "10922291677"
 	};

  	firebase.initializeApp(config);
  	var database = firebase.database();

    //Classe JSON - Essa function NESTE CASO é só uma nomenclatura para a classe que determina um objeto JSON
	function ClassColetor(evento, valor, img) {
	    
	    if (img == undefined) {
	    	img = "";
	    };

	    this.nome_evento = evento;
	    this.valor_tag = valor;
        this.valor_tagImg = img;
	    this.data_hora = Date();
	    this.ref = window.location.href; /*href*/
	    this.dataHora_Entrada = entrada ;
	    this.dataHora_Saida = saida ;
	    this.final_Pag = scroll;

	};

	//Eventos que serão capturados
    $(".c_click").click(function(){
    	var objetoColetor = new ClassColetor("click", $(this).text(), $(this).attr("src"));
    	enviarDados(objetoColetor);
	}); 

	$(".c_hover").hover(
		function(){
    		var objetoColetor = new ClassColetor("hoverEntrada", $(this).text(), $(this).attr("src"));
    		enviarDados(objetoColetor);
    	},
    	function(){
    		var objetoColetor = new ClassColetor("hoverSaida", $(this).text(), $(this).attr("src"));
    		enviarDados(objetoColetor);
		}
	);

	$(".c_dbclick").dblclick(
		function(){
    		var objetoColetor = new ClassColetor("dbclick", $(this).text(), $(this).attr("src"));
    		enviarDados(objetoColetor);
		}
	);

	//Só para campos de digitação
	$(".c_focus").focus(function(){
    	var objetoColetor = new ClassColetor("focus", $(this).text(), $(this).attr("src"));
    	enviarDados(objetoColetor);
	});

	//Só para campos de digitação
	$(".c_blur").blur(function(){
    	var objetoColetor = new ClassColetor("blur", $(this).text(), $(this).attr("src"));
    	enviarDados(objetoColetor);
	});

	//Classe deve ser inserida somente na tag <form></form>
	$(".c_submit").submit(function(){
    	var objetoColetor = new ClassColetor("submit", $(this).text(), $(this).attr("src"));
    	enviarDados(objetoColetor);
	});

	$(".c_mouseenter").mouseenter(function(){
    	var objetoColetor = new ClassColetor("mouseenter", $(this).text(), $(this).attr("src"));
    	enviarDados(objetoColetor);
	});

	$(".c_mouseleave").mouseleave(function(){
    	var objetoColetor = new ClassColetor("mouseleave", $(this).text(), $(this).attr("src"));
    	enviarDados(objetoColetor);
	});

	//Usado em divs específicas que contenham scroll
	$(".c_scroll").scroll(function(){
    	var objetoColetor = new ClassColetor("scroll de uma div especifica", $(this).text(), $(this).attr("src"));
		enviarDados(objetoColetor);
	});

	//Scroll da página inteira do html
	$(window).scroll(function(){
   		if($(this).scrollTop() + $(this).height() == $(document).height()) {
       		/*var objetoColetor = new ClassColetor("scroll da página inteira", "Chegou ao final da página Web!"); 
			enviarDados(objetoColetor);*/
			scroll = "Sim";
   		}
	});

	/*$(window).unload(function(){
    	alert("Goodbye!");
	});*/

	//Essa function funciona como uma função realmente, que recebe como parâmetro uma cópia do objetoColetor para enviar dados ao Banco de Dados
	function enviarDados(copiaColetor){
		//Remover caracteres especiais da URL da página que ficará salva no Banco de Dados Firebase como um dos dados coletados
		var url_Pag = copiaColetor.ref;
		var substituicao = /[^a-z0-9]/gi;
		url_Pag = url_Pag.replace(substituicao, "");
		
		firebase.database().ref(url_Pag + "/" + copiaColetor.data_hora).set({
			    copiaColetor 
		});
		//alert(copiaColetor.nome_evento + "\n\n" + copiaColetor.valor_tag + "\n\n" + copiaColetor.valor_tagImg + "\n\n" + copiaColetor.data_hora + "\n\n" + copiaColetor.ref);   
		//alert(copiaColetor.tempo);
	};
});