let formElement = document.getElementById("form");
let mainElement = document.querySelector("main");
let tableElement = createTabel(mainElement);
let inputElement = document.createElement("input");

showStorageContent(getStorageContent);

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.submitter.id === "add") {
    let formData = new FormData(e.target);
    let taskName = formData.get("task").toLowerCase();
    let taskCategory = formData.get("add-category").toLowerCase();

    let completed = {
      htmlElement: "input",
      type: "checkbox",
      innerText: "completed",
      checked: false,
    };

    if (!taskName) return;
    let taskId = 1;
    let numberOfItems = 0;

    for (let i = 0; i < localStorage.length; i++) {
      if (!Number.isNaN(Number(localStorage.key(i)))) numberOfItems += 1;
    }

    taskId += numberOfItems;

    let dataTable = {
      taskId,
      taskName,
      taskCategory,
      completed,
    };


    localStorage.setItem(taskId, JSON.stringify(dataTable));
    showStorageContent(getStorageContent);
  }
  if (e.submitter.id === "search") {
    let formData = new FormData(e.target);
    let searchName = formData.get("search");

    if (!searchName) return;
    console.log(searchName)
    showStorageContent(() => searchStorageContent(searchName));
  }

  if (e.submitter.id === "filter") {
    let formData = new FormData(e.target);
    let searchCategory = formData.get("search-category");

    if (!searchCategory) return;
    showStorageContent(() => filterStorageContent(searchCategory));
  }
});

function createTabel(container) {
  let tableElement = document.createElement("table");
  let tableRow = document.createElement("tr");
  let headers = ["ID", "NAME", "CATEGORY", "COMPLETED"];

  for (let header of headers) {
    let tableHeader = document.createElement("th");
    tableHeader.innerText = header;
    tableRow.append(tableHeader);
  }
  tableElement.append(tableRow);
  container.append(tableElement);
  return tableElement;
}

function addTableData(table, id, name, category, completed) {
  let tableRow = document.createElement("tr");

  let inputElement = document.createElement("input");
  inputElement.type = completed.type;
  inputElement.checked = completed.checked;
  inputElement.addEventListener("click", () =>
    changeCompletionStateFunction(id, name, category, completed, tableRow)
  );

  for (let i = 1; i < arguments.length; i++) {
    let tableData = document.createElement("td");
    if (typeof arguments[i] === "object") {
      tableData = inputElement;
      tableRow.append(tableData);
      break;
    }
    tableData.innerText = arguments[i];
    tableRow.append(tableData);
  }
  if (inputElement.checked) {
    tableRow.children[1].style.textDecoration = "line-through";
  }
  table.append(tableRow);
}

function getStorageContent() {
  let allStoredData = [];

  for (let i = 0; i < localStorage.length; i++) {
    if (!Number.isNaN(Number(localStorage.key(i)))) {
      allStoredData.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  }
  return allStoredData.sort((task1, task2) => task1.taskId - task2.taskId);
}

function showStorageContent(contentFunction) {
  tableElement.innerHTML = "";
  for (let data of contentFunction()) {
    addTableData(tableElement, ...Object.values(data));
  }
}

function searchStorageContent(searchName) {
  let allStoredData = getStorageContent();
  let desiredData = [];
  for (let content of allStoredData) {
    if (content.name === searchName.toLowerCase()) {
      desiredData.push(content);
    }
  }
  console.log(desiredData)
  return desiredData.sort((task1, task2) => task1.taskId - task2.taskId);
}

function filterStorageContent(searchCategory) {
  let allStoredData = getStorageContent();
  let desiredData = [];
  if (searchCategory.toLowerCase() == "all") return allStoredData;

  for (let content of allStoredData) {
    if (content.category === searchCategory.toLowerCase()) {
      desiredData.push(content);
    }
  }
  return desiredData.sort((task1, task2) => task1.taskId - task2.taskId);
}

function changeCompletionStateFunction(id, name, category, complete, row) {
  complete.checked = !complete.checked;
  console.log(complete);

  if (complete.checked) {
    row.children[1].style.textDecoration = "line-through";
  } else {
    row.children[1].style.textDecoration = "none";
  }

  let dataTable = {
    id,
    name,
    category,
    completed: {
      htmlElement: "input",
      type: "checkbox",
      innerText: "completed",
      checked: complete.checked,
    },
  };
  localStorage.setItem(id, JSON.stringify(dataTable));
}
