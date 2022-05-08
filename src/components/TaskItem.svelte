<script>
  import { tasks } from "../store";
  export let task = {};

  let isChecked = task.done;

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

  function taskChange() {
    let taskIndex = $tasks.findIndex((currentTask => currentTask.id === task.id));
    $tasks[taskIndex].done = !$tasks[taskIndex].done
    changeTask(task.id);
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

  function taskDelete() {
    $tasks = $tasks.filter(function( currentTask ) {
      return currentTask.id !== task.id;
    });
    deleteTask(task.id);
  }
</script>

<style>
  .done {
    color: red;
    text-decoration: line-through;
  }
</style>

<main>
  <li class="list-group-item">
    <div style="margin-left: 10px; display: flex">
      <div style="width: 100%">
        <input
                type="checkbox"
                class="form-check-input"
                bind:checked={isChecked}
                on:change={(e) => taskChange(e)} />
        <span class:done={task.done}>{task.task}</span>
      </div>
      <div style="width: 20px">
        <img src="delete.png" alt="Удалить" width="20px" height="20px" on:click={(e) => taskDelete(e)}/>
      </div>
    </div>
  </li>
</main>