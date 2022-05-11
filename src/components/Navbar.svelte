<script>
    import { isAuthenticated, user } from "../store";
    import auth from "../authService";
    export let auth0Client;

    function login() {
        auth.loginWithPopup(auth0Client);
    }

    function logout() {
        auth.logout(auth0Client);
    }
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="padding-left: 20px; padding-right: 20px">
    <a class="navbar-brand" href="/#">Список дел</a>
    <div class="collapse navbar-collapse" id="navbarText">
        <div class="navbar-nav mr-auto user-details">
            {#if $isAuthenticated}
                <span class="text-white">&nbsp;&nbsp;{$user.name} ({$user.email})</span>
            {:else}
                <span>&nbsp;</span>
            {/if}
        </div>
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
</nav>