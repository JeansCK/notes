import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

function createDefaultNote() {
    return axios.post(`${API_URL}/notes`, "", { headers: authHeader() });
};

function createHelpNote() {
    return axios.post(`${API_URL}/notes/help`, "", { headers: authHeader() });
}

function getNoteById(id) {
    return axios.get(`${API_URL}/notes/${id}`, { headers: authHeader() });
}

function getNotesByUser() {
    return axios.get(`${API_URL}/notes`, { headers: authHeader() });
}

function updateNote(data) {
    return axios.patch(`${API_URL}/notes`, data, { headers: authHeader() });
}

function deleteNote(id) {
    return axios.delete(`${API_URL}/notes/${id}`, { headers: authHeader() });
}

function createItem(data) {
    return axios.post(`${API_URL}/notes/item`, data, { headers: authHeader() });
}

function updateItem(data) {
    return axios.patch(`${API_URL}/notes/item`, data, { headers: authHeader() });
}

function deleteItem(noteId, itemId) {
    return axios.delete(`${API_URL}/notes/${noteId}/item/${itemId}`, { headers: authHeader() });
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