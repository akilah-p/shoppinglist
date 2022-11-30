/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderListItem } from './render-utils.js';
import { getListItems, createListItems, editListItems, deleteLists } from './fetch-utils.js';

const form = document.querySelector('.create-form');
const deleteBtn = document.querySelector('#delete-button');
const listEl = document.querySelector('.list');
const error = document.querySelector('#error');

window.addEventListener('load', async () => {
    await displayList();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const quantity = data.get('quantity');
    form.requestFullscreen();

    const newItem = await createListItems(item, quantity);
    if (newItem) {
        displayList();
    } else {
        error.textContent = 'An error occurred while adding your item';
    }
});

// Display Functions
async function displayList() {
    listEl.textContent = '';
    const list = await getListItems();
    if (list) {
        for (let item of list) {
            const listItemEl = renderListItem(item);
            listItemEl.addEventListener('click', async () => {
                await editListItems(item);
                await displayList();
            });
            if (item.cross_out) {
                listItemEl.classList.add('cross-out-true');
            }
            listEl.append(listItemEl);
        }
    }
}