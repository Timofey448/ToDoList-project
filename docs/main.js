let form = document.querySelector('#addForm');
let itemsList = document.querySelector('#items');
let filter = document.querySelector('#filter');

// добавление данных в LocalStorage при обновлении страницы
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
// Выводим содержимое localStorage каждый раз на страницу
itemsArray.forEach(function(item) {
  elementMaker(item);
})

// Функция создания элемента для новой задачи
function elementMaker(text) {
  let newElement = document.createElement("li");
  newElement.className = "list-group-item";
  let newTextNode = document.createTextNode(text);
  newElement.appendChild(newTextNode);
  let deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Удалить"));
  deleteBtn.className = "btn btn-light btn-sm float-right";
  deleteBtn.dataset.action = "delete";
  newElement.appendChild(deleteBtn);
  itemsList.prepend(newElement);
}

// Действия по форме, списку, фильтру
form.addEventListener("submit", addItem);
itemsList.addEventListener("click", removeItem);
filter.addEventListener("keyup", filterItems);

// Функция добавления новой задачи
function addItem(e) {
  e.preventDefault();
  let newItemInput = document.getElementById("newItemText");
  let newItemText = newItemInput.value;

  if (newItemInput.value != "") {
    newItemInput.value = "";
    filter.value = "";   
    itemsArray.push(newItemText);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    elementMaker(newItemText);
  }  
}

// Удаление элемента - ф-я
function removeItem(e) {
  let newItemInput = document.getElementById("newItemText");
  if (e.target.hasAttribute("data-action") &&
      e.target.getAttribute("data-action") == "delete") {
        if (confirm("Удалить задачу?")) {
          e.target.parentNode.remove();
          newItemInput.value = "";
          filter.value = "";    

          // Определение индекса удаленного элемента
          const deleteItemIndex = itemsArray.findIndex((item) => {
              return item === e.target.parentNode.firstChild.textContent;
          })

          itemsArray.splice(deleteItemIndex, 1);       
          localStorage.setItem("items", JSON.stringify(itemsArray));
        }
      }  
}

// Фильтрация списка дел ф-я
function filterItems(e) {
  let searchedText = e.target.value.toLowerCase();
  let items = itemsList.querySelectorAll("li");
  items.forEach(function(item) {
    let itemText = item.firstChild.textContent.toLowerCase();
    if (itemText.indexOf(searchedText) != -1) { 
        item.style.display = "block";
    } else {
        item.style.display = "none";
    }    
  });
}
