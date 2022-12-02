/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderListItem } from './render-utils.js';
import { getListItems, createListItems, editListItems, deleteLists, signOutUser } from './fetch-utils.js';

const form = document.querySelector('.create-form');
const deleteBtn = document.querySelector('#delete-button');
const listEl = document.querySelector('.list');
const error = document.querySelector('#error');
const signOut = document.getElementById('sign-out-button');

window.addEventListener('load', async () => {
    await displayLists();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const quantity = data.get('quantity');
    form.reset();

    const newItem = await createListItems(item, quantity);
    if (newItem) {
        displayLists();
    } else {
        error.textContent = 'An error occurred while adding your item';
    }
});

deleteBtn.addEventListener('click', async () => {
    await deleteLists();
    await displayLists();

});

// Display Functions
async function displayLists() {
    listEl.textContent = '';
    const list = await getListItems();

    if (list) {
        for (let item of list) {
            const listItemEl = renderListItem(item);
            listItemEl.addEventListener('click', async () => {
                await editListItems(item);
                await displayLists();
            });
            if (item.cross_out) {
                listItemEl.classList.add('cross-out-true');
            }
            listEl.append(listItemEl);
        }
    }
}
signOut.addEventListener('click', async () => {
    await signOutUser();
    window.location.replace('/auth');
});
