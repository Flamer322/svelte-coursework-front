<script>
	import { addTask } from "../userActions";
	import { tasks, user } from "../store";

	let newTask;
	let priority = "Средний";

	let priorities = {
		"Низкий": 0,
		"Средний": 1,
		"Высокий": 2
	}

	async function addItem() {
		let priorityNumber = priorities[priority]

		let id = await addTask($user.sub, newTask, priorityNumber);

		let now = new Date();

		let newTaskObject = {
			id: id,
			user_sub: $user.sub,
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

<div class="col" style="margin-top: 30px; margin-left: 20px">
	<input
			class="form-control"
			bind:value="{newTask}"
			placeholder="Введите новое задание"
	/>
	<br />
	<div class="row" style="width: 230px">
		<span class="col" style="margin-top: 5px">Приоритет:&nbsp;&nbsp;&nbsp;</span>
		<select
				class="form-select form-select-sm col"
				bind:value="{priority}"
		>
			<option>Низкий</option>
			<option>Средний</option>
			<option>Высокий</option>
		</select>
	</div>
	<button type="button" class="btn btn-primary" on:click="{addItem}" style="margin-top: 20px">
		Добавить задание
	</button>
</div>