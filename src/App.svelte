<script>
	import { isAuthenticated, user, tasks } from "./store";
	import { onMount } from "svelte";
	import { getTasks } from "./userActions";
	import auth from "./authService";
	import Instruction from "./components/Instruction.svelte";
	import Navbar from "./components/Navbar.svelte";
	import NewTask from "./components/NewTask.svelte";
	import TaskList from "./components/TaskList.svelte";

	let auth0Client;

	onMount(async () => {
		let tasks_json = await getTasks();
		tasks.set(tasks_json)

		auth0Client = await auth.createClient();

		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
	});
</script>

<style>
	#main-application {
		margin-top: 50px;
	}
</style>

<Navbar auth0Client="{auth0Client}"/>

{#if !$isAuthenticated}
	<Instruction auth0Client="{auth0Client}"/>
{:else}
	<div class="container" id="main-application">
		<div class="row">
			<TaskList />
			<NewTask />
		</div>
	</div>
{/if}