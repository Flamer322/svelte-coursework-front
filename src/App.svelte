<script>
	import { tasks, user, users } from "./store";
	import { onMount } from "svelte";
	import { getTasks } from "./tasks";
	import {getUsers} from "./users";
	import Instruction from "./components/Instruction.svelte";
	import Navbar from "./components/Navbar.svelte";
	import NewTask from "./components/NewTask.svelte";
	import TaskList from "./components/TaskList.svelte";
	import UserLogin from "./components/UserLogin.svelte";

	onMount(async () => {
		let tasks_json = await getTasks();
		tasks.set(tasks_json);

		let users_json = await getUsers();
		users.set(users_json);
	});
</script>

<style>
	#main-application {
		margin: 50px;
	}
</style>

<Navbar/>

<div className="container" id="main-application">
	{#if $user != null}
		<div class="row">
			<TaskList/>
			<NewTask/>
		</div>
	{:else}
		<div class="row">
			<Instruction />
			<UserLogin />
		</div>
	{/if}
</div>