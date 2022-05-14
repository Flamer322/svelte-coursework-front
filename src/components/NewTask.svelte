<script>
	import { addTask } from "../tasks";
	import { tasks, user } from "../store";

	let newTask;
	let priority = "Средний";

	let priorities = {
		"Низкий": 0,
		"Средний": 1,
		"Высокий": 2
	}

	async function taskAdd() {
		let priorityNumber = priorities[priority]

		let id = await addTask($user.id, newTask, priorityNumber);

		let now = new Date();

		let newTaskObject = {
			id: id,
			user_id: $user.id,
			task: newTask,
			priority: priorityNumber,
			done: false,
			created_at: now.toLocaleString()
		};

		$tasks = [...$tasks, newTaskObject];

		newTask = "";
		priority = "Средний";
	}
</script>

<style>
	#newTask {
		margin-top: 30px
	}

	#newTask input {
		width: 50%
	}

	#newTask div {
		width: 250px
	}

	#newTask span {
		margin-top: 7px
	}

	#newTask button {
		margin-top: 20px
	}
</style>

<div class="col" id="newTask">
	<input
			class="form-control"
			bind:value="{newTask}"
			placeholder="Введите новое задание"
	/>
	<br />
	<div class="row">
		<span class="col">Приоритет:&nbsp;&nbsp;&nbsp;</span>
		<select
				class="form-select col"
				bind:value="{priority}"
		>
			<option>Низкий</option>
			<option>Средний</option>
			<option>Высокий</option>
		</select>
	</div>
	<button type="button" class="btn btn-primary" on:click="{taskAdd}">
		Добавить задание
	</button>
</div>