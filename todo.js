let activityArray = JSON.parse(localStorage.getItem('activities'))||[];
// 1 -- pegando dados do formulário
const todoForm = document.querySelector('.todoForm');


//8 -- criando uma função para mostrar as atividades na div
// chamada content
 function showTodo (clearTodo = false){
     // 9 -- chamando a div 
     const todoContent = document.querySelector('.content');

     // 12 criando um if pra limpar a div quando clearToDo for true
     if (clearTodo){
         todoContent.innerHTML ='';
     }


     // 10 -- checando se o array tem algo adicionado com o length
     if (activityArray.length>0){

         //11 -- usando um for each para percorrer cada item do array e criar
         // botoes e divs FUNCIONANDO
         activityArray.forEach((element,index) => {
             todoContent.innerHTML =  todoContent.innerHTML + 
             `<div class="eachTodo"><input type='checkbox' onclick ="linedText(this)" >
             <label id ="lineActivity">${element}</label>
             <button type='button' onclick="deleteText(${index})" id='delete'>X</button><br><div>`;    
         });
         
     } else {
         todoContent.innerHTML = 'No activity added';
     }
 };

 //15 -- criar funcao para riscar o texto -- FUNCIONANDO somente para o primeiro

 function linedText(element) {
    if (element.checked) {
      document.getElementById("lineActivity").style.textDecoration = "line-through";
    }
    else {
      document.getElementById("lineActivity").style.textDecoration = "none";
    } 
  };

  // 16 -- funcao para deletar, Problema: deleta todos
  function deleteText(index){
    let getLocalStorageData = localStorage.getItem("New Todo");
    activityArray = JSON.parse(getLocalStorageData);
    activityArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(activityArray));
    showTodo(); 
  }

// 2-- obtendo dados adicionados do elemento form
todoForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    let activity = document.querySelector('.todoActivity').value;
    const alertMessage = document.querySelector('.alert');
    //3 -- criando condição caso o não seja inserido nada no campo de texto
    if (activity === ''){
        alertMessage.innerHTML = 'Please add an activity';
        alertMessage.style = 'color:red';

    } else {
        //4 -- Se algo for adicionado, a atividade deve ser adicionada no array
        // usando push e depois salva no local storage como string
        activityArray.push(activity);
        localStorage.setItem('activities', JSON.stringify(activityArray));

        // 13 -- Adicionar a funcao showTodo aqui pra fazer o conteudo aparecer
        // sempre que um item for adicionado ao array
        showTodo(true)

        // 5 -- quando adicionado, mostrar o seguinte alerta como mensagem
        alertMessage.textContent = 'Activity added';
        alertMessage.style = 'color:green';

        // 6 -- fazer a mensagem e o conteudo 
        // adicionado no input desaparecer depois de um tempo
    }
    setTimeout(()=>{
        alertMessage.innerHTML='';
        //todoForm.style = 'display:none';
        // se a linha acima for adicionada, todo o form apaga, 
        // somente o conteudo deve resetar nao o form completo
        // 7 -- a funcao reset, apaga o que foi adicionado ao form
        todoForm.reset();
    }, 1000); 
}   
);

// 14-- carregar a funcao ao carregar a pagina

window.onload = function (){
    showTodo();
};




