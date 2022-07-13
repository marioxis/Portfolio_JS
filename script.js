const fields = document.querySelectorAll("[required]")

function ValidateField(field) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for(let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid ) {
                foundError = error
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")
        
        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function() {

        const error = verifyErrors()

        if(error) {
            const message = customMessage(error)

            field.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor = "black"
            setCustomMessage()
        }
    }
}


function customValidation(event) {

    const field = event.target
    const validation = ValidateField(field)

    validation()

}

for( field of fields ){
    field.addEventListener("invalid", event => { 
        // eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}

document.querySelector("form")
.addEventListener("submit", event => {
    console.log("enviar o formulário")

    // não vai enviar o formulário
    event.preventDefault()
})


//API GitHub//
function gerarCardsDeRepositorios(listaDeRepositorios){
    // listaDeRepositorios = [{}, {}, {}];
    const section = document.querySelector('#repositories');
    
    for(let i = 0; i < listaDeRepositorios.length; i++){
      const repositorio = listaDeRepositorios[i];
      let html;
      if(repositorio.description === null){
        html = `<a class="repo" href="${repositorio.html_url}" target="_blank">
          <h2 class="repo_title">${repositorio.name}</h2>
        </a>`;
      } else {
        html = `<a class="repo" href="${repositorio.html_url}" target="_blank">
          <h2 class="repo_title">${repositorio.name}</h2>
          <p class="repo_description">${repositorio.description}</p>
        </a>`;
      }
      section.innerHTML = section.innerHTML + html;
    }
  }
  
  function pegarListaDeRepositorios(reposUrl){
    fetch(reposUrl)
    .then(function(response){ return response.json() })
    .then(function(response){
      gerarCardsDeRepositorios(response);
    })
  }
  
  fetch("https://api.github.com/users/marioxis")
  .then(function(response){
    //executa quando resolve
    return response.json();
  })
  .then(function(response){
    pegarListaDeRepositorios(response.repos_url);
    //...
  })
  .catch(function(error){
    //executa quando rejeita
    console.error(error)
  });