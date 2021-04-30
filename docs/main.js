let form = document.querySelector('#addForm');
let itemsList = document.querySelector('#items');
let filter = document.querySelector('#filter');

// LOCAL STORAGE
// A) добавление данных в LocalStorage
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

// B)Выводим содержимое localStorage на страницу
itemsArray.forEach(function(item) {
  elementMaker(item);
})


// Функция создания элемента для новой задачи
function elementMaker(text) {
  let newElement = document.createElement("li");
  newElement.className = "list-group-item";
  // Добавим текст в новый элемент
  let newTextNode = document.createTextNode(text);
  console.log(newTextNode);
  newElement.appendChild(newTextNode);
  // Создаем кнопку "удалить"
  let deleteBtn = document.createElement("button");
  // Добавляем текст
  deleteBtn.appendChild(document.createTextNode("Удалить"));
  // Добавляем CSS class
  deleteBtn.className = "btn btn-light btn-sm float-right";
  // Добавляем data атрибут
  deleteBtn.dataset.action = "delete";
  // Помещаем кнопку внутрь тега li
  newElement.appendChild(deleteBtn);
  // Добавляем новую задачу в список со всеми задачами
  itemsList.prepend(newElement);
}


// Добавление новой задачи - прослушка события
form.addEventListener("submit", addItem);
// Удаление элемента - прослушка клика
itemsList.addEventListener("click", removeItem);
// Фильтрация списка дел - прослушка ввода
filter.addEventListener("keyup", filterItems);



// Функция добавления новой задачи
function addItem(e) {
  // Отменяем отправку формы
  e.preventDefault();
  // Находим инпут с текстом для новой задачи
  let newItemInput = document.getElementById("newItemText");
  
  // Получаем текст из инпута
  let newItemText = newItemInput.value;

  if (newItemInput.value != "") {
    // Очистим поле добавления новой задачи
    newItemInput.value = "";
    // в слушателе отправим каждое новое значение input в массив, затем добавим в localStorage новое значение из обновленного массива
    itemsArray.push(newItemText);
    localStorage.setItem("items", JSON.stringify(itemsArray));

    elementMaker(newItemText);
  }  
}


// Удаление элемента - ф-я
function removeItem(e) {
  if (
      e.target.hasAttribute("data-action") &&
      e.target.getAttribute("data-action") == "delete"
  ) {
      if (confirm("Удалить задачу?")) {
          e.target.parentNode.remove();

          // Обновление локального хранилища. Определение индекса удаленного элемента
          const deleteItemIndex = itemsArray.findIndex((item) => {
              return item === e.target.parentNode.firstChild.textContent;
          })
          // console.log( deleteItemIndex);
          itemsArray.splice(deleteItemIndex, 1);

          // Обновление массива local Storage
          localItemsArray = JSON.stringify(itemsArray);
          localStorage.setItem("items", localItemsArray);
      }
  }
}


// Фильтрация списка дел ф-я
function filterItems(e) {
  // Получаем фразу для поиска и переводим ее в нижний регистр
  let searchedText = e.target.value.toLowerCase();
  // 1. Получаем списко всех задач
  let items = itemsList.querySelectorAll("li");
  // 2. Перебираем циклом все найденные теги li с задачами
  items.forEach(function(item) {
      // Получаем текст задачи из списка и переводим его в нижний регистр
      let itemText = item.firstChild.textContent.toLowerCase();
      // Проверяем вхождение искомой подстроки в текст задачи
      if (itemText.indexOf(searchedText) != -1) {
          // Если вхождение есть - показываем элемент с задачей
          item.style.display = "block";
      } else {
          // Если вхождения нет - скрываем элемент с задачей
          item.style.display = "none";
      }
  });
}