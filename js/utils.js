const getId = (array) => {
    const arrayTaskId = array.map(item => item.taskId);
    return arrayTaskId.length > 0 ? Math.max.apply(null, arrayTaskId) + 1 : 0;
};

const removeAllChild = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

const findInPath = (path, prop, value) => {
    return path.find(item => item[prop] === value);
};

const toggleButton = (id, value) => {
    const btn = document.getElementById(id) || null;
    if (btn != null) {
        value
            ? btn.setAttribute('disabled', value)
            : btn.removeAttribute('disabled')
    }
};

