# tcc2-codes
Repositório para armazenamento dos códigos

# Correções Gerais 16/05/2018 (Prof. Diogo)

1. Criar um nome para a ferramenta (ViewUp Usability?). Este nome deve representar um "produto". Depois deste nome criado, alterar:
    + nome da pasta "ferramenta" alterar por exemplo para viewup-usability;
    + título da página ferramenta;
    + colocar o nome na seção incial da página;
        + exemplo: Conheça a Ferramenta ViewUp Usability;
    + trocar o nome do banco de dados no FireBase para viewup-database

2. Alterar o nome de coletor_dados.js para viewup-collector.js;

3. Alterar o nome de ferramenta.js para viewup-core.js

4. Criar um botão para "Logoff"

5. Crie um logo, e as redes sociais de verdade para a ferramenta (se sobrar tempo);

6. Alterar a linguagem do HTML ```<html lang="en">``` para ```<html lang="pt-BR">```

7. Criar um arquivo CSS para a pasta "ferramenta" e colocar todas as modificações de CSS diretamente lá dentro;

8. Importante! Faca o download de todos os scripts que você está utilizando e deixe isso em uma pasta dentro do projeto. Da forma atual, se estiver sem internet nenhuma das inclusões irá funcionar;

9. Escrever um pouco sobre segurança;
    1. Seu aplicativo não é totalmente seguro. Eu consegui baixar os arquivos do seu repositório e rodar ele localmente para criar e utilizar os dados do banco. Estudar e escrever como o FireBase gerencia as permissões de escrita no banco de dados;
    2. O seu sistema não utiliza um sistema de login por sessão. Estudar um pouco sobre como funciona um sistema de login clássico, como funciona o serviço oferecido pelo FireBase e mesmo que não implementemos, escrever sobre isso;
    3. Os acessos ao banco de dados são públicos! Eu consigo por exemplo ver isso:

    ```
      	var config = {
	    apiKey: "AIzaSyDfV-P1DvRvvBfAUBbCzi90PX96jG5MY2c",
	    authDomain: "coletordados-62e45.firebaseapp.com",
	    databaseURL: "https://coletordados-62e45.firebaseio.com",
	    projectId: "coletordados-62e45",
	    storageBucket: "",
	    messagingSenderId: "10922291677"
    ```

    O que teóricamente permitiria que eu tivesse acesso aos dados caso nenhuma regra de segurança fosse aplicada no FireBase;

10. Criar pelo menos 5 páginas de exemplo diferentes (podem ser simples) mas é interessante para podermos analisar os resultados;

11. Coletar corretamente todos os dados das tags a serem trackeadas;

12. Decidir, se vai usar o load scripts ou não, se não for, retirar do código;
    + Atualmente tem um loader pro firebase mas não pro JQuery, decidir como isso irá funcionar;

13. Organizar os códigos JS:
    + Tirar os comentários;
    + Tirar testes e logs;
    + Criar uma versão minificada para ser o mais leve possível;

14. Colocar a função de criação de Hash em um outro arquivo para não poluir o seu código principal;
    + Você pode separar em mais arquivos caso ache que seja necessário;

## Ajustes na página principal:

1. O menu responsivo do Bootstrap não está funcionando corretamente, quando se dimensiona a janela para dispositivo móveis;
    + O ideal seria que o menu se ajustasse e abrisse com quando solicitado. Me parece estar faltando o JavaScript do Bootstrap;

2. Descrever resumidamente em uma seção o que é a ferramenta;

3. Colocar botão de chamadas para a página interna "Como Usar" com um texto explicativo resumido de como usar a aplicação

4. Colocar botão de chamada para consulta de dados;

## Ajustes na página contato:

Criar um botão entre em contato com um link que abre o envio de emails. Exemplo 

```
<a href="mailto:viewup.usability@gmail.com"><button>Entre em contato</button></a>
```

## Ajustes na página como usar:

Seria legal utilizar exemplo colocando códigos embedados do gist aqui.

Vc pode criar seus códigos, e depois copiar o script que fica em embed, fica bem legal.

https://gist.github.com/deanhume/4cd47fff50029073db2b

Um exemplo para testar, basta clicar no embed ali, e colocar na página.

Organizar melhor os blocos de informações em grupos e seções:

1. Como usar a ferramenta;
    1. Explicar com aquele texto introdutório;
2. Passos para utilização;
    1. Download do script viewup-collector.js;
    Nesse ponto você pode colocar um link direto para o raw do GitHub, como por exemplo:
    https://github.com/CarolineRezendeBarroso/tcc2-codes/blob/master/exemplo/js/coletor_dados.js
    Esse é o link para abrir no github, mas tem um botão ali raw que serve para "baixar" a versão normal do arquivo.
    O link fica:
    https://raw.githubusercontent.com/CarolineRezendeBarroso/tcc2-codes/master/exemplo/js/coletor_dados.js
    2. Adicionar o script a sua página: instruções de como fazer;
    3. Fazer o cadastro em nossa página: instruções de como fazer;
    4. Configurar o id de utilização: instruções de como fazer;
    5. Configurar os elementos que deseja trackear: instruções de como fazer;
    6. Consultar os dados: instruções de como fazer;

3. Explicar detalhadamente como funcionam os pesos do elementos a serem trackeados;
4. Falar das dependências do projeto, que o usuário deve incluiar antes o JQuery e etc...

## Ajustes na página Consultar Dados

1. Colocar um padding na seção inicial para dar um espaço maior;
2. Colocar um título nessa página, exemplo "ViewUp Relatórios"
3. Seria bem legal tentar utilizar alguns gráficos aqui. Eu já trabalhei com uma ferramenta que é MUITO fácil de mexer.
    Eu fiz essa página com esses gráficos oh: https://hardera.co/research/
    A biblioteca é essa aqui: https://www.chartjs.org/
    Acho que daria uma levantada muito massa em seu trabalho tentar pensar em alguns gráficos relevantes!

## Ajustes na consulta do ID

1. Utilize a tag ```<code>``` para exemplificar o código ali;