export function renderListItem(itemObject) {
    const listItemEl = document.createElement('li');
    listItemEl.textContent = `${itemObject.item}: ${itemObject.quantity}`;
    return listItemEl;
}