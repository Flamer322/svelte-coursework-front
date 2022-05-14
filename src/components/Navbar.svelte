<script>
	import { user } from "../store";

	function logout() {
		$user = null;
	}
</script>

<style>
	#navbar {
		padding-left: 20px;
		padding-right: 20px
	}

	#navbar span {
		font-size: 18px;
		margin-top: 4px
	}
</style>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
	<a class="navbar-brand" href="/#">Список дел</a>
	<div class="collapse navbar-collapse" id="navbarText">
		<div class="navbar-nav mr-auto user-details">
			{#if $user != null}
				<span class="text-white">&nbsp;&nbsp;{$user.email}</span>
			{:else}
				<span>&nbsp;</span>
			{/if}
		</div>
	</div>
	<span class="navbar-text">
		<ul class="navbar-nav float-right">
			{#if $user != null}
				<li class="nav-item">
				<a class="nav-link" href="/#" on:click="{logout}">Выйти</a>
				</li>
			{/if}
		</ul>
	</span>
</nav>