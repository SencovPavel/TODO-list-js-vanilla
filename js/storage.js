const getStorage = () => {
    return JSON.parse(localStorage.getItem('listTODO')) || [];
};

const setStorage = (newStorage) => {
    localStorage.setItem('listTODO', JSON.stringify(newStorage));
};

const addStorage = (newElement) => {
    const storage = getStorage();
    storage.push(newElement);
    localStorage.setItem('listTODO', JSON.stringify(storage));
};

const getElementStorage = (getId) => {
    const storage = getStorage();
    if (storage.length > 0) {
        const a = storage.find(item => item.taskId == getId);
        console.log(getId);
        return a;
    }
};

const removeElementStorage = (removeId) => {
    const storage = getStorage();
    if (storage.length > 0) {
        const newStorage = storage.filter(item => item.taskId != removeId);
        setStorage(newStorage);
    }
};

const updateElementStorage = (updateId, updateName, updateText) => {
    const storage = getStorage();
    if (storage.length > 0) {
        const newStorage = storage.map(item => {
            if(item.taskId == updateId) {
                return {
                    taskId: updateId,
                    taskName: updateName,
                    taskText: updateText,
                }
            }
            return item;
        });
        setStorage(newStorage)
    }
};
