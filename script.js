window.onload = function () {
    let request = new XMLHttpRequest(); 
  
    request.addEventListener("load", function () {
      
      let response = JSON.parse(request.response); 

      if (request.status !== 200) {
        alert(
          "Произошла ошибка при получении ответа от сервера:\n\n" +
            response.message
        );
        return;
      }

      if (response.count == 0) {
        alert("Ничего не найдено, попробуйте еще раз!");
        return;
      }
 
      if (request.status == 200) {
        console.log(response);
        for (let i = 0; i < (response.results.length); i++) {
            let character = document.querySelector('.search_result').appendChild(document.createElement('li'));
            character.classList.add(`${i}`);
            character.textContent = response.results[i].name;
        }
      }

      window.myResponse = response;
    });

    document.querySelector('.search_result').addEventListener('click', function(e) {
      if (e.target.tagName == 'LI') {
        let number = e.target.className;
        document.querySelector('#name').textContent = myResponse.results[number].name;
        document.querySelector('#height').textContent = myResponse.results[number].height;
        document.querySelector('#mass').textContent = myResponse.results[number].mass;
        document.querySelector('#birth_year').textContent = myResponse.results[number].birth_year;
        document.querySelector('#films_count').textContent = myResponse.results[number].films.length;
      }
    });

    document.querySelector('button').addEventListener('click', function(e){
      e.preventDefault;
      document.querySelector('.search_result').innerHTML = '';
      let api = "https://swapi.dev/api/";
      let url = api + "people/?search="; 
      let userRequest = document.querySelector('#person_search_input').value;
      if (userRequest !== "") {
        url += userRequest;
        request.open("get", url);
        request.send();
      } else {
        alert('Введите имя персонажа');
      }
    })
  };