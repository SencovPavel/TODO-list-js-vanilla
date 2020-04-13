const addButton = document.getElementById('addButton');
const todoListDOM = document.getElementById('todoList');

const addTODO = (e) => {
    e.preventDefault();
    const taskName = document.getElementById('taskName');
    const taskText = document.getElementById('taskText');
    const listTODO = getStorage();
    const taskId = getId(listTODO);
    const newTODO = {taskId, taskName: taskName.value, taskText: taskText.value};

    const cardTODO = createCardTODO(newTODO);
    todoListDOM.appendChild(cardTODO);

    taskName.value = '';
    taskText.value = '';
    addStorage(newTODO);
};

const removeTODO = ({path}) => {
    const element = path.find(item => item.name === 'Card');
    removeElementStorage(element.taskId);
    element.remove();
};

const updateTODO = ({path}) => {
    const element = findInPath(path, 'name', 'Card');
    const {taskId} = element;
    const {taskText, taskName} = getElementStorage(taskId);
    const cardHeader = createUpdateCardHeader(taskId, taskName);
    const cardBody = createUpdateCardBody(taskId, taskText);

    actionUpdateTODO(element, cardHeader, cardBody);
};

const acceptUpdateTODO = ({path}) => {
    const element = findInPath(path, 'name', 'Card');
    const {taskId} = element;
    const taskName = document.getElementById(`updateNameTODO-${taskId}`).value || null;
    const taskText = document.getElementById(`updateTextTODO-${taskId}`).value || null;
    const cardHeader = createCardHeader(taskId, taskName);
    const cardBody = createCardBody(taskId, taskText);

    actionUpdateTODO(element, cardHeader, cardBody);
    updateElementStorage(taskId, taskName, taskText);
};

const rejectUpdateTODO = ({path}) => {
    const element = findInPath(path, 'name', 'Card');
    const {taskId} = element;
    const {taskText, taskName} = getElementStorage(taskId);
    const cardHeader = createCardHeader(taskId, taskName);
    const cardBody = createCardBody(taskId, taskText);

    actionUpdateTODO(element, cardHeader, cardBody);
};

const checkCard = ({target, path}) => {
    const {checked} = target;

    const element = findInPath(path, 'name', 'Card');
    const {taskId} = element;
    const {taskText, taskName} = getElementStorage(taskId);

    updateElementStorage(taskId, taskName, taskText, checked);

    toggleButton(`updateTODOBtn-${taskId}`, checked);
    toggleButton(`removeTODOBtn-${taskId}`, checked);
};

const actionUpdateTODO = (element, header, body) => {
    removeAllChild(element);

    element.appendChild(header);
    element.appendChild(body);
};

const createCardTODO = (newCard) => {
    // create elements
    const {taskId, taskName, taskText, disable} = newCard;
    const card = document.createElement('div');
    const cardHeader = createCardHeader(taskId, taskName, disable);
    const cardBody = createCardBody(taskId, taskText, disable);

    //add props
    card.className = 'card bg-light mb-3 todo-header';
    card.id = `Card-${taskId}`;
    card.taskId = taskId;
    card.name = 'Card';

    //append element
    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    return card;
};

const createCardHeader = (elementId, taskName, disable) => {
    // create elements
    const header = document.createElement('div');
    const nameTODO = document.createElement('div');
    const checkTODOBtn = document.createElement('input');

    //add props
    header.className = 'card-header row m-0';

    nameTODO.className = 'col-11';
    nameTODO.innerText = taskName;

    checkTODOBtn.className = 'col-1 checkTODO';
    checkTODOBtn.type = 'checkbox';
    checkTODOBtn.checked = disable;
    checkTODOBtn.id = `checkTODOBtn-${elementId}`;
    checkTODOBtn.addEventListener('click', checkCard);

    //append element
    header.appendChild(nameTODO);
    header.appendChild(checkTODOBtn);

    return header;
};

const createCardBody = (elementId, taskText, disable = false) => {
    // create elements
    const body = document.createElement('div');
    const textTODO = document.createElement('p');
    const updateTODOBtn = document.createElement('button');
    const removeTODOBtn = document.createElement('button');

    //add props
    body.className = 'card-body';

    textTODO.className = 'card-text';
    textTODO.innerText = taskText;

    updateTODOBtn.className = 'btn btn-warning mr-1';
    updateTODOBtn.textContent = 'Редактирование';
    updateTODOBtn.id = `updateTODOBtn-${elementId}`;
    updateTODOBtn.disabled = disable;
    updateTODOBtn.addEventListener('click', updateTODO);

    removeTODOBtn.className = 'btn btn-danger';
    removeTODOBtn.textContent = 'Удаление';
    removeTODOBtn.id = `removeTODOBtn-${elementId}`;
    removeTODOBtn.disabled = disable;
    removeTODOBtn.addEventListener('click', removeTODO);

    //append element
    body.appendChild(textTODO);
    body.appendChild(updateTODOBtn);
    body.appendChild(removeTODOBtn);

    return body;
};

const createUpdateCardHeader = (elementId, taskName) => {
    // create elements
    const header = document.createElement('div');
    const updateNameTODO = document.createElement('input');

    //add props
    header.className = 'card-header row m-0';

    updateNameTODO.className = 'col-11';
    updateNameTODO.value = taskName;
    updateNameTODO.id = `updateNameTODO-${elementId}`;

    //append element
    header.appendChild(updateNameTODO);

    return header;
};

const createUpdateCardBody = (elementId, taskText) => {
    // create elements
    const body = document.createElement('div');
    const bodyForText = document.createElement('div');
    const updateTextTODO = document.createElement('input');
    const acceptTODOBtn = document.createElement('button');
    const rejectTODOBtn = document.createElement('button');

    //add props
    body.className = 'card-body';
    bodyForText.className = 'form-group mx-auto mt-2 col-12';

    updateTextTODO.className = 'form-control col-12';
    updateTextTODO.value = taskText;
    updateTextTODO.id = `updateTextTODO-${elementId}`;

    acceptTODOBtn.className = 'btn btn-warning mr-1';
    acceptTODOBtn.textContent = 'Подтвердить';
    acceptTODOBtn.addEventListener('click', acceptUpdateTODO);

    rejectTODOBtn.className = 'btn btn-danger';
    rejectTODOBtn.textContent = 'Отменить';
    rejectTODOBtn.addEventListener('click', rejectUpdateTODO);

    //append element
    bodyForText.appendChild(updateTextTODO);

    body.appendChild(bodyForText);
    body.appendChild(acceptTODOBtn);
    body.appendChild(rejectTODOBtn);

    return body;
};


window.onload = () => {
    const defaultsListTODO = getStorage();

    defaultsListTODO.forEach(item => {
        const card = createCardTODO(item);
        todoListDOM.appendChild(card);
    });
};

addButton.addEventListener('click', addTODO);
