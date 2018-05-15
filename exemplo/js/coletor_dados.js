/*Coletor de dados*/

var scripts = ['https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js',
			   'https://www.gstatic.com/firebasejs/4.11.0/firebase.js'];

function loadScripts(scripts, callBack){
	//Para cada script do array "scripts"...
    scripts.forEach(function(script){
        var s   = document.createElement('script');
        s.src   = script;
        s.type  = "text/javascript";
        s.async = false;
        document.getElementsByTagName('head')[0].appendChild(s);
        //Como comparar nas seguintes situações:
        // 1. A página tem um JQuery com a mesma versão do JQuery do coletor
        // 2. A página tem um JQuery diferente(caminho que está buscando o JQuery) da versão do JQuery do coletor	
    });
    if(callBack != null){
        window.onload = function(){
            callBack();
        }
    }
}
  
loadScripts(scripts, function(){ $(document).ready(function() {

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

	//Remover caracteres especiais da URL da página que ficará salva no Banco de Dados Firebase, como um dos dados coletados da página Web
	var url_pag = window.location.href;
	var substituicao = /[^a-z0-9]/gi;
	url_pag = url_pag.replace(substituicao, "");

	var id_admin = $("body").attr("data-id");

	firebase.database().ref("Admin_url" + "/" + url_pag).update({
		id_admin
	});
	
	var tempo = -10000;
  
	var lista = new Map();

	//Objeto Literal de controle da página
	var controle_pag = {
		acesso:1,
	    entrada: new Date().getTime(),
	    saida: "",
	    permanencia:0,
	    scroll:0,
		ultimo_backup: new Date().getTime() - 12000,
	    lista_eventos: [null]	
	};

	//Classe construtora dos eventos ocorridos
	function Evento() {
		this.data_peso = 0;
		this.data_track = "";
		this.click = 0;
	    this.dblclick = 0;
	    this.focus = 0;
	    this.blur = 0;
	    this.submit = 0;
	    this.mouseenter = 0;
	    this.mouseleave = 0;
	};

	//Eventos serão capturados através de uma única classe(.controle) e um atributo de recuperação (data-track)
	$(".controle").click(function(){
		if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).click = lista.get(this.getAttribute("data-track")).click + 1;
		}else{
			var obj = new Evento();
			if(this.getAttribute("data-peso") != undefined){
				obj.data_peso = this.getAttribute("data-peso");
			}else{
				obj.data_peso = "";
			}
			obj.data_track = this.getAttribute("data-track");
			obj.click = obj.click + 1;
			lista.set(obj.data_track, obj);	
		}
		enviar_dados();
	}); 

	$(".controle").dblclick(function(){
    	if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).dblclick = lista.get(this.getAttribute("data-track")).dblclick + 1;
		}else{
			var obj = new Evento();
			if(this.getAttribute("data-peso") != undefined){
				obj.data_peso = this.getAttribute("data-peso");
			}else{
				obj.data_peso = "";
			}
			obj.data_track = this.getAttribute("data-track");
			obj.dblclick = obj.dblclick + 1;
			lista.set(obj.data_track, obj);	
		}
		enviar_dados();
	});

	//Só para campos de digitação e alguns outros elementos bootstrap
	$(".controle").focus(function(){
    	if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).focus = lista.get(this.getAttribute("data-track")).focus + 1;
		}else{
			var obj = new Evento();
			if(this.getAttribute("data-peso") != undefined){
				obj.data_peso = this.getAttribute("data-peso");
			}else{
				obj.data_peso = "";
			}
			obj.data_track = this.getAttribute("data-track");
			obj.focus = obj.focus + 1;
			lista.set(obj.data_track, obj);	
		}
		enviar_dados();
	});

	//Só para campos de digitação e alguns outros elementos bootstrap
	$(".controle").blur(function(){
    	if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).blur = lista.get(this.getAttribute("data-track")).blur + 1;
		}else{
			var obj = new Evento();
			if(this.getAttribute("data-peso") != undefined){
				obj.data_peso = this.getAttribute("data-peso");
			}else{
				obj.data_peso = "";
			}
			obj.data_track = this.getAttribute("data-track");
			obj.blur = obj.blur + 1;
			lista.set(obj.data_track, obj);	
		}
		enviar_dados();
	});

	//Classe deve ser inserida somente na tag <form></form> (Envio de formulários)
	$(".controle").submit(function(){
    	if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).submit = lista.get(this.getAttribute("data-track")).submit + 1;
		}else{
			var obj = new Evento();
			if(this.getAttribute("data-peso") != undefined){
				obj.data_peso = this.getAttribute("data-peso");
			}else{
				obj.data_peso = "";
			}
			obj.data_track = this.getAttribute("data-track");
			obj.submit = obj.submit + 1;
			lista.set(obj.data_track, obj);	
		}
		enviar_dados();
	});

	$(".controle").mouseenter(function(){
		if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).mouseenter= lista.get(this.getAttribute("data-track")).mouseenter + 1;
		}else{
			var obj = new Evento();
			if(this.getAttribute("data-peso") != undefined){
				obj.data_peso = this.getAttribute("data-peso");
			}else{
				obj.data_peso = "";
			}
			obj.data_track = this.getAttribute("data-track");
			obj.mouseenter = obj.mouseenter + 1;
			lista.set(obj.data_track, obj);	
		}
		enviar_dados();
	});

	$(".controle").mouseleave(function(){
    	if(lista.has(this.getAttribute("data-track")) == true){	
			lista.get(this.getAttribute("data-track")).mouseleave = lista.get(this.getAttribute("data-track")).mouseleave + 1;
		}else{
			var obj = new Evento();
			if(this.getAttribute("data-peso") != undefined){
				obj.data_peso = this.getAttribute("data-peso");
			}else{
				obj.data_peso = "";
			}
			obj.data_track = this.getAttribute("data-track");
			obj.mouseleave = obj.mouseleave + 1;
			lista.set(obj.data_track, obj);	
		}
		
		enviar_dados();
	});

	//Scroll da página html
	$(window).scroll(function(){
   		
   		var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height();
        var winHeight = $(window).height();
        var scrollPercent = (scrollTop) / (docHeight - winHeight);
        var scrollPercentage = Math.round(scrollPercent*100);
        if (controle_pag.scroll < scrollPercentage){
			controle_pag.scroll = scrollPercentage;
		}
	});

	//Evento de saída da página
	$(window).bind('beforeunload', function(){
		enviar_dados();
	});

	//Função para enviar dados ao Banco de Dados Firebase
	function enviar_dados(){
		if ((controle_pag.ultimo_backup - new Date().getTime()) < tempo) {
			//alert(controle_pag.entrada + ' - ' + controle_pag.saida + " - " +  (controle_pag.ultimo_backup - new Date().getTime()));

			controle_pag.ultimo_backup = new Date().getTime();
			controle_pag.saida = new Date().getTime();
			controle_pag.permanencia = controle_pag.saida - controle_pag.entrada;
			//key = data_track, value = obj (atributo presente em cada evento que terão as informações coletadas)
			controle_pag.lista_eventos = [null];
			
			for (var [key, value] of lista) {
				//Atribui ao array lista_eventos as informações coletadas de cada evento de acordo com o data-track estabelecido
				controle_pag.lista_eventos.push(value); 
			}
			
			//Salva todas as informações coletadas no Banco de Dados Firebase
			firebase.database().ref(url_pag + "/" + new Date(controle_pag.entrada)).set({
				controle_pag
				
			});
		}
	};
})});
