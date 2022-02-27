import http from "../http-common";

function createDefaultNote(userId) {
    return http.post(`/notes/user/${userId}`);
};

function createHelpNote(userId) {
    return http.post(`/notes/help/user/${userId}`)
}

function getNoteById(id) {
    return http.get(`/notes?id=${id}`);
}

function getNotesByUser(id) {
    return http.get(`/notes/user?user=${id}`);
}

function updateNote(data) {
    return http.patch("/notes", data);
}

function deleteNote(id) {
    return http.delete(`/notes?id=${id}`);
}

function createItem(noteId, data) {
    return http.post("/notes/items", data);
}

function updateItem(data) {
    return http.patch("/notes/items", data);
}

function deleteItem(noteId, itemId) {
    return http.delete(`/notes/items?noteId=${noteId}&itemId=${itemId}`);
}

const exports = {
    createDefaultNote,
    createHelpNote,
    getNoteById,
    getNotesByUser,
    updateNote,
    deleteNote,
    createItem,
    updateItem,
    deleteItem
};

export default exports;