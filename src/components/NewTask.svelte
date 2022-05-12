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

<div class="col" style="margin-top: 30px">
	<input
			class="form-control"
			bind:value="{newTask}"
			placeholder="Введите новое задание"
			style="width: 50%"
	/>
	<br />
	<div class="row" style="width: 230px">
		<span class="col" style="margin-top: 5px">Приоритет:&nbsp;&nbsp;&nbsp;</span>
		<select
				class="form-select form-select-sm col"
				bind:value="{priority}"
				style="font-size: 16px"
		>
			<option>Низкий</option>
			<option>Средний</option>
			<option>Высокий</option>
		</select>
	</div>
	<button type="button" class="btn btn-primary" on:click="{taskAdd}" style="margin-top: 20px">
		Добавить задание
	</button>
</div>