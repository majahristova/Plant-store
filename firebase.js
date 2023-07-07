
export const baseUrl = 'https://plantstore-efd58-default-rtdb.europe-west1.firebasedatabase.app/';
const url = baseUrl + 'productinfo.json';

export async function fetchingProducts() {
    console.log('fetchingProducts')
    const response = await fetch(url);
    const data = await response.json();

    localStorage.setItem("dataOfProducts", JSON.stringify(data))
    if (!localStorage.getItem("products")) {
        localStorage.setItem("products", "[]");
    }
    return data

}










