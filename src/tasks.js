async function getTasks(){
    let res = await fetch(`https://to-do-list-coursework.herokuapp.com/tasks`, {
        method: 'GET',
    })
    let json = await res.json()
    json.sort((a, b) => (a.id > b.id) ? 1 : -1)
    return json;
}

async function addTask(user_id, task, priority){
    let res = await fetch(`https://to-do-list-coursework.herokuapp.com/tasks`, {
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
    fetch(`https://to-do-list-coursework.herokuapp.com/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

function deleteTask(id){
    let type = 'delete'
    fetch(`https://to-do-list-coursework.herokuapp.com/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export {getTasks, addTask, changeTask, deleteTask};