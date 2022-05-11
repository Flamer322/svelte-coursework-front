<script>
	import { user_tasks } from "../store";
	import SortButton from "./SortButton.svelte";
	import TaskItem from "./TaskItem.svelte";

	let sortOrder = "id";
	let sortDir = 1;

	$: sortedTasks = $user_tasks.sort(function (x, y) {
		let n = x[sortOrder] - y[sortOrder];

		if (n !== 0) {
			return n * sortDir;
		}

		return x.id - y.id;
	})

	let sortOptions = [
		{
			id: 0,
			name: 'Дата создания',
			slug: 'id',
		},
		{
			id: 1,
			name: 'Приоритет',
			slug: 'priority'
		}
	]

	function setOrder(order) {
		if (sortOrder == order){
			sortDir = -sortDir;
		} else {
			sortOrder = order;
			sortDir = 1;
		}
	}
</script>

<div class="col">
	<div class="row" style="margin-left: 40px; margin-bottom: 20px">
		{#each sortOptions as sort}
			<SortButton sort="{sort}" sortOrder="{sortOrder}" sortDir="{sortDir}" setOrder="{setOrder}" />
		{/each}
	</div>
	<ul>
		{#each sortedTasks as item}
			<TaskItem task="{item}" />
		{/each}
	</ul>
</div>