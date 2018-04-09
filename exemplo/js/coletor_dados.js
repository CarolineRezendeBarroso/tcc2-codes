/*Coletor de dados*/

var scripts = ['https://www.gstatic.com/firebasejs/4.11.0/firebase.js'];

function carregar_scripts(callback) {
    if (scripts == null || scripts.length == 0) {
        callback();
        return;
    }
    var script = scripts[0];
    scripts = scripts.slice(1);
 
    $.getScript(script, function() { carregar_scripts(callback); });
}

carregar_scripts(function(){ $(document).ready(function() {

	var lista = new Map();

	//Objeto Literal de controle da página
	var controle_pag = {
	    entrada: new Date().getMilliseconds(),
	    saida: new Date().getMilliseconds(),
	    permanencia:"",
	    scroll:"",
	    lista_eventos: [null]
	};

	//Classe construtora dos eventos ocorridos
	function Evento() {
		this.data_track = "";
		this.click = 0;
	    this.dblclick = 0;
	    this.focus = 0;
	    this.blur = 0;
	    this.submit = 0;
	    this.mouseenter = 0;
	    this.mouseleave = 0;
	};

	//Corresponde à data e hora que a página passa a ser carregada e lida
	controle_pag.entrada = new Date().getMilliseconds();

	//Adicionar o Modal dinamicamente à página HTML da aplicação que usará a ferramenta, 
	//pois não é possível que qualquer pessoa altere o HTML se não o dono da página
	var modal = '<div class="modal fade" id="myModal" role="dialog">' +
        		'<div class="modal-dialog">' +
          		'<div class="modal-content">' +
            	'<div class="modal-header">' +
              	'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
              	'<h4 class="modal-title">Informe seu usuário e senha para analisar os resultados!</h4>' +
            	'</div>' +
            	'<div class="modal-body">' +
            	'<form action="/action_page.php">' +
    			'<div class="form-group">' +
			    '<label for="email">E-mail:</label>' +
			    '<input type="email" class="form-control" id="email" placeholder="Digite seu e-mail" name="email">' +
			    '</div>' +
			    '<div class="form-group">' +
			    '<label for="pwd">Senha:</label>' +
			    '<input type="password" class="form-control" id="pwd" placeholder="Digite sua senha" name="pwd">' +
			    '</div>' +
			  	'</form>' +
            	'</div>' +
            	'<div class="modal-footer">' +
              	'<button type="button" id="consultaAdm" class="btn btn-default" data-dismiss="modal">Salvar</button>' +
              	'<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>' +
            	'</div>' +
          		'</div>' +
        		'</div>' +
      			'</div>';

    //Função JQuery que adiciona dinamicamente o modal à página HTML
    $("body").append(modal);

    var pressed_ctrl = false; //variável de controle
    var pressed_alt = false; //variável de controle
    var pressed_x = false; //variável de controle
	
	$(document).keyup(function (tecla) {  //O evento Kyeup é acionado quando as teclas são soltas. Tecla = objeto da tecla que foi solta.

	 	if(tecla.which == 17) pressed_ctrl = false; //Quando Crtl for solto é preciso informar e é desligada a variável.
		if(tecla.which == 18) pressed_alt = false; //Quando Alt for solto é preciso informar e é desligada a variável.
		if(tecla.which == 88) pressed_x = false; //Quando X for solto é preciso informar e é desligada a variável.

	});
	
	$(document).keydown(function (tecla) { //Quando uma tecla é pressionada
		if(tecla.which == 17) pressed_ctrl = true; //Informando que Crtl está acionado
		if(tecla.which == 18) pressed_alt = true; //Informando que Alt está acionado
		if(tecla.which == 88) pressed_x = true; //Informando que X está acionado

		if((pressed_ctrl == true) && (pressed_alt == true) && (pressed_x == true)) { 
			pressed_ctrl = false;
			pressed_alt = false;
			pressed_x = false;
			$('#myModal').modal('show'); //Mostrar modal
		}
	});

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

	//Eventos serão capturados através de uma única classe(.controle) e um atributo de recuperação (data-track)
	$(".controle").click(function(){
		if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).click = lista.get(this.getAttribute("data-track")).click + 1;
		}else{
			var obj = new Evento();
			obj.data_track = this.getAttribute("data-track");
			obj.click = obj.click + 1;
			lista.set(obj.data_track, obj);	
		}
	}); 

	$(".controle").dblclick(function(){
    	if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).dblclick = lista.get(this.getAttribute("data-track")).dblclick + 1;
		}else{
			var obj = new Evento();
			obj.data_track = this.getAttribute("data-track");
			obj.dblclick = obj.dblclick + 1;
			lista.set(obj.data_track, obj);	
		}
	});

	//Só para campos de digitação e alguns outros elementos bootstrap
	$(".controle").focus(function(){
    	if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).focus = lista.get(this.getAttribute("data-track")).focus + 1;
		}else{
			var obj = new Evento();
			obj.data_track = this.getAttribute("data-track");
			obj.focus = obj.focus + 1;
			lista.set(obj.data_track, obj);	
		}
	});

	//Só para campos de digitação e alguns outros elementos bootstrap
	$(".controle").blur(function(){
    	if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).blur = lista.get(this.getAttribute("data-track")).blur + 1;
		}else{
			var obj = new Evento();
			obj.data_track = this.getAttribute("data-track");
			obj.blur = obj.blur + 1;
			lista.set(obj.data_track, obj);	
		}
	});

	//Classe deve ser inserida somente na tag <form></form> (Envio de formulários)
	$(".controle").submit(function(){
    	if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).submit = lista.get(this.getAttribute("data-track")).submit + 1;
		}else{
			var obj = new Evento();
			obj.data_track = this.getAttribute("data-track");
			obj.submit = obj.submit + 1;
			lista.set(obj.data_track, obj);	
		}
	});

	$(".controle").mouseenter(function(){
    	if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).mouseenter= lista.get(this.getAttribute("data-track")).mouseenter + 1;
		}else{
			var obj = new Evento();
			obj.data_track = this.getAttribute("data-track");
			obj.mouseenter = obj.mouseenter + 1;
			lista.set(obj.data_track, obj);	
		}
	});

	$(".controle").mouseleave(function(){
    	if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).mouseleave = lista.get(this.getAttribute("data-track")).mouseleave + 1;
		}else{
			var obj = new Evento();
			obj.data_track = this.getAttribute("data-track");
			obj.mouseleave = obj.mouseleave + 1;
			lista.set(obj.data_track, obj);	
		}
	});

	//Scroll da página inteira do html
	//FAZER MAPEAMENTO DE %
	$(window).scroll(function(){
   		if($(this).scrollTop() + $(this).height() == $(document).height()) {
			controle_pag.scroll = "100";
   		}
	});

	//Evento de saída da página - os dados coletados só serão enviados e salvos no Banco de Dados quando o usuário sair da página ou recarregá-la
	$(window).bind('beforeunload', function(){
		enviar_dados();
	});

	//Evento que captura dados do admin para consultar no Firebase quando os resultados forem ser exibidos para o admin da aplicação que usa a ferramenta
	$('#consultaAdm').click(function(){
    	alert("Botão SALVAR foi clicado"); //Teste, por enquanto, para saber se o botão SALVAR do modal foi clicado
	}); 

	//Função para enviar dados ao Banco de Dados Firebase
	function enviar_dados(){
		//Remover caracteres especiais da URL da página que ficará salva no Banco de Dados Firebase, como um dos dados coletados da página Web
		var url_pag = window.location.href;
		var substituicao = /[^a-z0-9]/gi;
		url_pag = url_pag.replace(substituicao, "");
		
		//Data e hora de saída da página que é igual à quando envia os dados para o Banco
		controle_pag.saida = new Date().getMilliseconds();
		controle_pag.permanencia = controle_pag.saida - controle_pag.entrada;
		//key = data_track, value = obj (atributo presente em cada evento que terão as informações coletadas)
		for (var [key, value] of lista) {
			//Atribui ao array lista_eventos as informações coletadas de cada evento de acordo com o data-track estabelecido
  			controle_pag.lista_eventos.push(value); 
		}
		//Salva todas as informações coletadas no Banco de Dados Firebase
		firebase.database().ref(url_pag + "/" + Date()).set({
			controle_pag
		});
	};
  });
});


