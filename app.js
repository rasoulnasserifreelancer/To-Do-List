let formElement = document.getElementById("form");
let mainElement = document.querySelector("main");
let tableElement = createTabel(mainElement);
let completed = false;


formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.submitter.id === "add") {
    let formData = new FormData(e.target);
    let taskName = formData.get("task").toLowerCase();
    let taskCategory = formData.get("add-category").toLowerCase();

    if (!taskName) return;
    let taskId = 1;
    let numberOfItems = 0;

    for (let i=0; i<localStorage.length; i++) {
        if (!Number.isNaN(Number(localStorage.key(i)))) numberOfItems+=1;
        console.log("items",numberOfItems);
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
  for (let i = 1; i < arguments.length; i++) {
    let tableData = document.createElement("td");
    tableData.innerText = arguments[i];
    tableRow.append(tableData);
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
  return allStoredData.sort( (task1, task2) => task1.taskId - task2.taskId );
}

function showStorageContent(contentFunction) {
  tableElement.innerHTML = "";
  tableElement = createTabel(mainElement);
  for (let data of contentFunction()) {
    addTableData(tableElement, ...Object.values(data));
  }
}

function searchStorageContent(searchName) {
  let allStoredData = getStorageContent();
  let desiredData = [];
  for (let content of allStoredData) {
    if (content.taskName === searchName.toLowerCase()) {
      desiredData.push(content);
    }
  }
    return desiredData.sort( (task1, task2) => task1.taskId - task2.taskId );
}


function filterStorageContent(searchCategory) {
  let allStoredData = getStorageContent();
  let desiredData = [];
  if (searchCategory.toLowerCase() == "all") return allStoredData

  for (let content of allStoredData) {
    if (content.taskCategory === searchCategory.toLowerCase()) {
      desiredData.push(content);
    }
  }
    return desiredData.sort( (task1, task2) => task1.taskId - task2.taskId );
}