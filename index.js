const XML_diplay = document.getElementById("XML_diplay");
const Fetch_display = document.getElementById("Fetch_display");

const XML_btn = document.getElementById("XML_load");
const Fetch_btn = document.getElementById("Fetch_load");

const url = "https://jsonplaceholder.typicode.com/users";

const loading = document.createElement('div')
loading.className = "custom-loader";

const loadXHR = () => {

    XML_diplay.innerHTML="";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const responseData = JSON.parse(xhr.responseText);

      responseData.forEach((element) => {
        XML_diplay.innerHTML += 
                `
                <div class="user">${element.name}</div>
                `;
      });
    } else {
      console.error("Ошибка при выполнении запроса");
    }
  };

  xhr.onerror = function () {
    console.error("Ошибка при выполнении запроса");
  };

  xhr.send();
};

const RealFetchDelete = (IdToDelete) =>{
    fetch(`${url}/${IdToDelete}`, {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(result => {
    //alert('Результат удаления:', result);
  })
  .catch(error => {
    console.error('Ошибка при выполнении DELETE-запроса:', error);
  });
}
const RealFetchUpdate = (IdToUpdate) =>{

    const dataToUpdate = { name: document.getElementById('fetchusername'+IdToUpdate).textContent };

    fetch(`${url}/${IdToUpdate}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dataToUpdate)
})
  .then(response => response.json())
  .then(updatedData => {
    //alert('Обновленные данные:', updatedData);
  })
  .catch(error => {
    console.error('Ошибка при выполнении PUT-запроса:', error);
  });
}

const FetchDeleteUser = (id) =>{
    RealFetchDelete(id);
    document.getElementById('fetchuser'+id).appendChild(loading);
    setTimeout(()=>document.getElementById('fetchuser'+id).remove(), 2000);
}

const FetchSaveUser = (id) =>{
    let inputname = document.getElementById('fetchuserinput'+id).value;
    if(inputname!=""){
        setTimeout(()=>{
            document.getElementById('fetchusername'+id).textContent = inputname
        },1800)
        
    }
    document.getElementById('fetchuser'+id).appendChild(loading);

    setTimeout(()=>{
        document.getElementById('fetchuser'+id).querySelectorAll('.custom-loader')[0].remove();
        document.getElementById('fetchuser'+id).querySelectorAll('.savebutton')[0].remove();
        document.getElementById('fetchuser'+id).querySelectorAll('input')[0].remove();
    }, 2000);
    
}

const FetchUserEdit = (id)=>{
    const userdiv = document.getElementById('fetchuser'+id);

    const inputname = document.createElement('input');
    inputname.id = `fetchuserinput${id}`

    userdiv.appendChild(inputname)
    
    const savebutton = document.createElement('button');
    savebutton.textContent='Save'
    savebutton.className = 'savebutton'
    savebutton.onclick = () =>{
        FetchSaveUser(id);
        RealFetchUpdate(id);
    }

    
    userdiv.appendChild(savebutton)
}

const loadFetch = () => {
    Fetch_display.innerHTML=""

    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(element=>{
            

            const divElement = document.createElement('div');
            divElement.className = 'user';
            divElement.id = `fetchuser${element.id}`;

            const name = document.createElement('p');
            name.id = 'fetchusername'+element.id;
            name.textContent = element.name

            divElement.appendChild(name)
            
            const DeleteButton = document.createElement('button');
            DeleteButton.className = 'deletebutton'
            DeleteButton.textContent = 'Delete';
            DeleteButton.onclick = () => {
            FetchDeleteUser(element.id);
            }

            const EditButton = document.createElement('button');
            EditButton.textContent = 'Edit'
            EditButton.className = 'editbutton'
            EditButton.onclick = () => {
            FetchUserEdit(element.id);
            }

            divElement.appendChild(EditButton);
            divElement.appendChild(DeleteButton);

            Fetch_display.appendChild(divElement);

            
        })          
    })
}



XML_btn.addEventListener("click", loadXHR);
Fetch_btn.addEventListener('click', loadFetch)