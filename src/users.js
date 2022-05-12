async function getUsers(){
    let res = await fetch(`http://localhost:5000/users`, {
        method: 'GET',
    })
    let json = await res.json()
    json.sort((a, b) => (a.id > b.id) ? 1 : -1)
    return json;
}

async function addUser(email, password){
    let res = await fetch(`http://localhost:5000/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    })
    let id = await res.text();
    return parseInt(id);
}

export { getUsers, addUser };