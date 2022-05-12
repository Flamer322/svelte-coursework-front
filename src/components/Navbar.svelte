<script>
	import { user } from "../store";

	function logout() {
		$user = null;
	}
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="padding-left: 20px; padding-right: 20px">
	<a class="navbar-brand" href="/#">Список дел</a>
	<div class="collapse navbar-collapse" id="navbarText">
		<div class="navbar-nav mr-auto user-details">
			{#if $user != null}
					<span class="text-white" style="font-size: 18px">&nbsp;&nbsp;{$user.email}</span>
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