/*Coletor de dados*/

$(document).ready(function(){

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

  	//Gerar ID para cada admin
  	var MD5 = function (string) {

	   function RotateLeft(lValue, iShiftBits) {
	           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	   }

	   function AddUnsigned(lX,lY) {
	           var lX4,lY4,lX8,lY8,lResult;
	           lX8 = (lX & 0x80000000);
	           lY8 = (lY & 0x80000000);
	           lX4 = (lX & 0x40000000);
	           lY4 = (lY & 0x40000000);
	           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
	           if (lX4 & lY4) {
	                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
	           }
	           if (lX4 | lY4) {
	                   if (lResult & 0x40000000) {
	                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
	                   } else {
	                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
	                   }
	           } else {
	                   return (lResult ^ lX8 ^ lY8);
	           }
	   }

	   function F(x,y,z) { return (x & y) | ((~x) & z); }
	   function G(x,y,z) { return (x & z) | (y & (~z)); }
	   function H(x,y,z) { return (x ^ y ^ z); }
	   function I(x,y,z) { return (y ^ (x | (~z))); }

	   function FF(a,b,c,d,x,s,ac) {
	           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
	           return AddUnsigned(RotateLeft(a, s), b);
	   };

	   function GG(a,b,c,d,x,s,ac) {
	           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
	           return AddUnsigned(RotateLeft(a, s), b);
	   };

	   function HH(a,b,c,d,x,s,ac) {
	           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
	           return AddUnsigned(RotateLeft(a, s), b);
	   };

	   function II(a,b,c,d,x,s,ac) {
	           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
	           return AddUnsigned(RotateLeft(a, s), b);
	   };

	   function ConvertToWordArray(string) {
	           var lWordCount;
	           var lMessageLength = string.length;
	           var lNumberOfWords_temp1=lMessageLength + 8;
	           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
	           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
	           var lWordArray=Array(lNumberOfWords-1);
	           var lBytePosition = 0;
	           var lByteCount = 0;
	           while ( lByteCount < lMessageLength ) {
	                   lWordCount = (lByteCount-(lByteCount % 4))/4;
	                   lBytePosition = (lByteCount % 4)*8;
	                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
	                   lByteCount++;
	           }
	           lWordCount = (lByteCount-(lByteCount % 4))/4;
	           lBytePosition = (lByteCount % 4)*8;
	           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
	           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
	           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
	           return lWordArray;
	   };

	   function WordToHex(lValue) {
	           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
	           for (lCount = 0;lCount<=3;lCount++) {
	                   lByte = (lValue>>>(lCount*8)) & 255;
	                   WordToHexValue_temp = "0" + lByte.toString(16);
	                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
	           }
	           return WordToHexValue;
	   };

	   function Utf8Encode(string) {
	           string = string.replace(/\r\n/g,"\n");
	           var utftext = "";

	           for (var n = 0; n < string.length; n++) {

	                   var c = string.charCodeAt(n);

	                   if (c < 128) {
	                           utftext += String.fromCharCode(c);
	                   }
	                   else if((c > 127) && (c < 2048)) {
	                           utftext += String.fromCharCode((c >> 6) | 192);
	                           utftext += String.fromCharCode((c & 63) | 128);
	                   }
	                   else {
	                           utftext += String.fromCharCode((c >> 12) | 224);
	                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	                           utftext += String.fromCharCode((c & 63) | 128);
	                   }

	           }

	           return utftext;
	   };

	   var x=Array();
	   var k,AA,BB,CC,DD,a,b,c,d;
	   var S11=7, S12=12, S13=17, S14=22;
	   var S21=5, S22=9 , S23=14, S24=20;
	   var S31=4, S32=11, S33=16, S34=23;
	   var S41=6, S42=10, S43=15, S44=21;

	   string = Utf8Encode(string);

	   x = ConvertToWordArray(string);

	   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

	   for (k=0;k<x.length;k+=16) {
	           AA=a; BB=b; CC=c; DD=d;
	           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
	           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
	           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
	           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
	           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
	           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
	           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
	           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
	           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
	           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
	           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
	           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
	           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
	           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
	           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
	           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
	           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
	           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
	           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
	           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
	           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
	           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
	           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
	           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
	           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
	           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
	           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
	           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
	           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
	           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
	           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
	           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
	           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
	           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
	           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
	           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
	           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
	           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
	           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
	           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
	           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
	           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
	           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
	           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
	           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
	           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
	           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
	           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
	           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
	           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
	           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
	           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
	           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
	           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
	           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
	           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
	           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
	           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
	           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
	           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
	           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
	           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
	           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
	           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
	           a=AddUnsigned(a,AA);
	           b=AddUnsigned(b,BB);
	           c=AddUnsigned(c,CC);
	           d=AddUnsigned(d,DD);
	   		}

	   	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

	   	return temp.toLowerCase();
	}

  	//Objeto Literal de controle de cada administrador
    var controle_admin = {
	    email: "",
	    senha: ""
	};

	$("#email_cadastro").focus(function(){
		$("#email_cad_msg").text("");
		$("#conf_senha_msg").text("");
		$("#senha_cadastro").attr("disabled", true);
		$("#conf_senha_cadastro").attr("disabled", true);
		$("#salvar_cadastro").attr("disabled", true);
		$("#conf_token").text("");
		$("#senha_cadastro").val('');
		$("#conf_senha_cadastro").val('');
    });

	$("#email_cadastro").blur(function(){
		if($("#email_cadastro").val() == ""){
			$("#email_cad_msg").text("E-mail precisa ser informado!");	
		}else{
			$("#email_cad_msg").text("");
			$("#senha_cadastro").attr("disabled", false);
  			$("#conf_senha_cadastro").attr("disabled", false);
		}

		//Consultar se email já existe
		var ref = firebase.database().ref("Admin" + "/" + MD5($("#email_cadastro").val()));
		ref.orderByChild("email").on("child_added", function(snapshot){
  			//console.log(snapshot.key + " email é " + snapshot.val().email + " senha é " + snapshot.val().senha);
  			if(snapshot.val().email != null){
  				$("#email_cad_msg").text("E-mail já cadastrado!" + "\n" + "Consulte seu ID ou Altere sua senha na página inicial!");
  				$("#senha_cadastro").attr("disabled", true);
  				$("#conf_senha_cadastro").attr("disabled", true);
			}
		});
		$("#conf_token").text("");
	});


	$("#senha_cadastro").blur(function(){
		if($("#senha_cadastro").val() == ""){
			$("#senha_cad_msg").text("Senha precisa ser informada!");
		}else{
			$("#senha_cad_msg").text("");
		}
	});

	$("#conf_senha_cadastro").blur(function(){
		if($("#conf_senha_cadastro").val() == ""){
			$("#conf_senha_msg").text("Senha precisa ser confirmada!");
		}else{
			if($("#conf_senha_cadastro").val() != $("#senha_cadastro").val()){
				$("#conf_senha_msg").text("Confirmação inválida!");
			}else{
				$("#conf_senha_msg").text("");
				$("#salvar_cadastro").removeAttr("disabled");
			}
		}
	});

	$("#salvar_cadastro").click(function(){
		//Popula o objeto literal com os dados do formulário de cadastro
		controle_admin.email = $("#email_cadastro").val();
		controle_admin.senha = MD5($("#senha_cadastro").val());
		//controle_admin.id_admin = MD5($("#email_cadastro").val());
		//Enviar para o banco
		enviar_dados();
		$("#conf_token").text(MD5($("#email_cadastro").val()));
		$("#salvar_cadastro").attr("disabled", true);
	});

	//Modal alterar senha do Admin
	$("#salva_alt").click(function(){
		var erro = false;
		if($("#email_altera").val() == ""){
			$("#email_alt_msg").text("E-mail precisa ser informado!");
			erro = true;	
		}else{
			$("#email_alt_msg").text("");
		}
		if($("#senha_alterar").val() == ""){
			$("#senha_alt_msg").text("Senha precisa ser informada!");
			erro = true;		
		}else{
			$("#senha_alt_msg").text("");
		}
		if($("#senha_nova").val() == ""){
			$("#senha_nova_msg").text("Sua nova senha precisa ser informada!");
			erro = true;		
		}else{
			$("#senha_nova_msg").text("");
		}
		if($("#confirma_alt").val() == ""){
			$("#senha_nova_conf").text("Sua nova senha precisa ser confirmada!");
			erro = true;		
		}else{
			$("#senha_nova_conf").text("");
			if($("#confirma_alt").val() != $("#senha_nova").val()){
				$("#senha_nova_conf").text("Confirmação inválida!");
				erro = true;	
			}else{
				$("#senha_nova_conf").text("");
			}
		}

		if(erro == true){
			return;
		}

		//Consultar se email e senha já existem
		var ref = firebase.database().ref("Admin" + "/" + MD5($("#email_altera").val()));
		ref.orderByChild("email").on("child_added", function(snapshot){
  			//console.log(snapshot.key + " email é " + snapshot.val().email + " senha é " + snapshot.val().senha);
  			if(snapshot.val().email != null && snapshot.val().senha == MD5($("#senha_alterar").val())){
  				controle_admin.email = snapshot.val().email;
  				controle_admin.senha = MD5($("#senha_nova").val());
  				enviar_dados();
  				alert("Senha alterada com sucesso!");
			}else{
				alert("E-mail ou Senha inválido(a)!");
			}
		});
		//ref.end();
	});

	$(".fechar_alt").click(function(){
		$("#email_altera").val("");
		$("#senha_alterar").val("");
		$("#senha_nova").val("");
		$("#confirma_alt").val("");
	});

	//Modal consultar ID do Admin
	$("#consultar_id").click(function(){
		//Consultar se email e senha já existem
		var ref = firebase.database().ref("Admin" + "/" + MD5($("#email_id").val()));
		ref.orderByChild("email").on("child_added", function(snapshot){
  			//console.log(snapshot.key + " email é " + snapshot.val().email + " senha é " + snapshot.val().senha);
  			if(snapshot.val().email != null && snapshot.val().senha == MD5($("#senha_id").val())){
  				controle_admin.email = $("#email_id").val();
				controle_admin.senha = MD5($("#senha_id").val());
  				alert("Logado com sucesso!");
			}else{
				alert("Senha inválida xxxx!");
			}
		});
	});
	//Modal consultar ID do Admin
	$(".fechar_id").click(function(){
		$("#email_id").val("");
		$("#senha_id").val("");
	});

	$("#chamar_mod_id").click(function(){
		$("#traz_id").text(MD5(controle_admin.email));
		$("#mostra_id").modal("show");
	});

	function enviar_dados(){
		//Salva todas as informações coletadas no Banco de Dados Firebase
		firebase.database().ref("Admin" + "/" + MD5(controle_admin.email)).set({
			controle_admin
		});

		/*firebase.database().ref("Admin").push({
			controle_admin
		});*/
	};
});
	
