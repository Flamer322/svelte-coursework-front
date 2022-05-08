<script>
	import { onMount } from "svelte";
	import auth from "./authService";
	import { isAuthenticated, user, user_tasks, tasks } from "./store";
	import TaskItem from "./components/TaskItem.svelte";

	let auth0Client;
	let newTask;

	onMount(async () => {
		let tasks_json = await getTasks();
		tasks.set(tasks_json)

		auth0Client = await auth.createClient();

		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
	});

	function login() {
		auth.loginWithPopup(auth0Client);
	}

	function logout() {
		auth.logout(auth0Client);
	}

	async function getTasks(){
		let res = await fetch(`http://localhost:5000/tasks`, {
			method: 'GET',
		})
		let json = await res.json()
		json.sort((a, b) => (a.id > b.id) ? 1 : -1)
		return json;
	}

	async function addTask(user_sub){
		let res = await fetch(`http://localhost:5000/tasks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({user_sub, newTask}),
		})
		let id = await res.text();
		return parseInt(id);
	}

	async function addItem() {
		let id = await addTask($user.sub);

		let newTaskObject = {
			id: id,
			user_sub: $user.sub,
			task: newTask,
			done: false
		};

		let updatedTasks = [...$tasks, newTaskObject];

		tasks.set(updatedTasks);

		newTask = "";
	}
</script>

<style>
	#main-application {
		margin-top: 50px;
	}
</style>

<main>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<a class="navbar-brand" href="/#">Список дел</a>
		<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarText"
				aria-controls="navbarText"
				aria-expanded="false"
				aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
			<div class="navbar-nav mr-auto user-details">
				{#if $isAuthenticated}
					<span class="text-white">&nbsp;&nbsp;{$user.name} ({$user.email})</span>
				{:else}<span>&nbsp;</span>{/if}
			</div>
			<span class="navbar-text">
        <ul class="navbar-nav float-right">
          {#if $isAuthenticated}
          <li class="nav-item">
            <a class="nav-link" href="/#" on:click="{logout}">Выйти</a>
          </li>
          {:else}
          <li class="nav-item">
            <a class="nav-link" href="/#" on:click="{login}">Войти</a>
          </li>
          {/if}
        </ul>
      </span>
		</div>
	</nav>

	{#if !$isAuthenticated}
		<div class="container mt-5">
			<div class="row">
				<div class="col-md-10 offset-md-1">
					<div class="jumbotron">
						<h1 class="display-4">Простой список дел</h1>
						<p class="lead">Инструкция</p>
						<ul>
							<li>Войдите, чтобы начать</li>
							<li>Создайте задания</li>
							<li>Вычеркните выполненные задания</li>
						</ul>
						<a
								class="btn btn-primary btn-lg mr-auto ml-auto"
								href="/#"
								role="button"
								on:click="{login}"
						>
							Войти
						</a>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="container" id="main-application">
			<div class="row">
				<div class="col-md-6">
					<ul class="list-group">
						{#each $user_tasks as item (item.id)}
							<TaskItem task="{item}" />
						{/each}
					</ul>
				</div>
				<div class="col-md-6">
					<input
							class="form-control"
							bind:value="{newTask}"
							placeholder="Введите новое задание"
					/>
					<br />
					<button type="button" class="btn btn-primary" on:click="{addItem}">
						Добавить задание
					</button>
				</div>
			</div>
		</div>
	{/if}
</main>