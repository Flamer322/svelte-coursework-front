<script>
  import { tasks } from "../store";
  import { changeTask, deleteTask } from "../userActions";

  export let task = {};

  $: isChecked = task.done;

  function taskChange() {
    let taskIndex = $tasks.findIndex((currentTask => currentTask.id === task.id));
    $tasks[taskIndex].done = !$tasks[taskIndex].done
    changeTask(task.id);
  }

  function taskDelete() {
    $tasks = $tasks.filter(function( currentTask ) {
      return currentTask.id !== task.id;
    });
    deleteTask(task.id);
  }

  let colors = {
    0: "#0DFA02",
    1: "#FFA500",
    2: "#F5351D"
  }
</script>

<style>
  .done {
    background-color: #E0E0E0;
  }
</style>

<li class:done={task.done} class="list-group-item">
  <div style="display: flex; flex-direction: row; align-content: flex-start">
    <div style="flex-grow: 1; flex-shrink: 1">
      <input
              type="checkbox"
              class="form-check-input"
              bind:checked={isChecked}
              on:change={(e) => taskChange(e)} />
      <span style="margin-left: 5px">{task.task}</span>
    </div>
    <div style="flex-grow: 0; flex-shrink: 0; width: 24px; height: 24px; margin-right: 4px">
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="53" r="50" fill="{colors[task.priority]}" stroke="black" stroke-width="4"/>
      </svg>
    </div>
    <div style="flex-grow: 0; flex-shrink: 0; width: 24px; height: 24px">
     <span on:click={(e) => taskDelete(e)} style="cursor: pointer">
       ✖
     </span>
    </div>
  </div>
</li>