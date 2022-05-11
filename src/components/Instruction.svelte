<script>
    import auth from "../authService";
    export let auth0Client;

    function login() {
        auth.loginWithPopup(auth0Client);
    }
</script>


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