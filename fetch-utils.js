/* eslint-disable no-console */
const SUPABASE_URL = 'https://tkqxoqtixhzlrrwspotd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcXhvcXRpeGh6bHJyd3Nwb3RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgzNjMsImV4cCI6MTk4MzY4NDM2M30.HfaWTJoZaFxI5PwxO4xvxCJ0g_pY6oryjIi4l9w_FAM';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}


export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createListItems(item, quantity) {
    const response = await client.from('shopping-list').insert({
        item: item,
        quantity: quantity,
        cross_out: false,
        user_id: client.auth.user().id,
    });

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function getListItems() {
    const response = await client.from('shopping-list').select('*').match({ user_id: client.auth.user().id });
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function editListItems(item) {
    const response = await client.from('shopping-list').update({ cross_out: !item.cross_out }).match({ id: item.id });

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function deleteLists() {
    const response = await client.from('shopping-list').delete().match({ user_id: getUser().id });

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}