async function getTasks(){
    let res = await fetch(`http://localhost:5000/tasks`, {
        method: 'GET',
    })
    let json = await res.json()
    json.sort((a, b) => (a.id > b.id) ? 1 : -1)
    return json;
}

async function addTask(user_id, task, priority){
    let res = await fetch(`http://localhost:5000/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id, task, priority}),
    })
    let id = await res.text();
    return parseInt(id);
}

function changeTask(id){
    let type = 'change'
    fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({type}),
    })
}

function deleteTask(id){
    let type = 'delete'
    fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({type}),
    })
}

export {getTasks, addTask, changeTask, deleteTask};