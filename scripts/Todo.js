export default class Todo {
  constructor({
    localStorageFieldName,
    listContainerSelector,
    listElementSelector,
    inputFieldSelector,
    addButtonSelector,
    deleteButtonSelector
  }) {
    this.localStorageFieldName = localStorageFieldName;
    this.list = this._getListFromLocalStorage();
    this.listContainer = document.querySelector(listContainerSelector);
    this.listElementSelector = listElementSelector;
    this.inputField = document.querySelector(inputFieldSelector);
    this.addButton = document.querySelector(addButtonSelector);
    this.deleteButtonSelector = deleteButtonSelector;
  }

  _getListFromLocalStorage() {
    if (!localStorage.todolist) {
      localStorage.setItem(this.localStorageFieldName, JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem(this.localStorageFieldName));
  }

  setEventListeners() {
    this.addButton.addEventListener('mouseup', () => {
      this._addTaskToList(this.inputField);
    });
  }

  _addTaskToList(task) {
    task.preventDefault;
    if (task.value.length < 2) {
      alert('Task description is too short. It must be at least 3 letters long');
    } else {
      this.list.push(task.value);
      this._saveListToLocalStorage();
      this.listContainer.append(this._createListElement(task.value));
      task.value = '';
    }
  }

  _removeTaskFromList(task) {
    task.closest('li').remove();
    const index = this.list.indexOf(task);
    this.list.splice(index, 1);
    this._saveListToLocalStorage();
  }

  _createListElement(task) {
    const listElement = document.createElement('li');
    listElement.classList.add(this.listElementSelector);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add(this.deleteButtonSelector);
    deleteButton.append('x');
    deleteButton.onclick = () => this._removeTaskFromList(deleteButton);

    listElement.append(task, deleteButton);

    return listElement;
  }

  createList() {
    this.list.forEach(task => this.listContainer.append(this._createListElement(task)));
  }

  _saveListToLocalStorage() {
    localStorage.setItem(this.localStorageFieldName, JSON.stringify(this.list));
  }
}
