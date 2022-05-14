<script>
    import { user, users } from '../store';
    import { addUser } from "../users";

    let isRegister = false;
    let email = "";
    let password = "";
    let error = "";
    let notify = ""

    function submitForm() {
        if (isRegister){
            userAdd();
        } else {
            login();
        }
    }

    async function userAdd() {
        let foundUser = $users.find(x => x.email === email);

        if (foundUser) {
            error = "Пользователь уже зарегистрирован";
            notify = "";
            return;
        }

        let id = await addUser(email, password);

        let newUserObject = {
            id: id,
            email: email,
            password: password
        };
        $users = [...$users, newUserObject];

        isRegister = false;
        error = "";
        notify = "Пользователь зарегистрирован";
    }

    async function login() {
        let foundUser = $users.find(x => x.email === email);

        if (foundUser) {
            if (password === foundUser.password) {
                $user = foundUser;
                error = "";
                notify = "";
                return;
            }
        }
        error = "Неверная почта или пароль."
    }

    function switchRegister(){
        isRegister = !isRegister;
    }
</script>

<style>
    #userLogin form {
        margin-top: 30px
    }

    #userLogin label {
        font-size: 20px
    }

    #userLogin input {
        font-size: 20px;
        width: 400px
    }

    #userLogin button {
        font-size: 18px;
        margin-left: 30px
    }

    .login {
        width: 100px;
    }

    .register {
        width: 230px;
    }

    .error {
        font-size: 18px;
        margin-top: 20px;
        margin-left: 20px;
        width: fit-content
    }
</style>

<div class="col" id="userLogin">
    <form on:submit|preventDefault={submitForm} class="flex mx-auto col-6">
        <div class="mb-3">
            <label for="email" class="form-label">Почта</label>
            <input type="email" class="form-control" id="email" bind:value={email}/>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input type="password" class="form-control" id="password" bind:value={password}/>
        </div>
        <div class="row">
            {#if isRegister}
                <button type="submit" class="btn btn-primary register">
                    Зарегистрироваться
                </button>
                <button on:click={switchRegister} class="btn btn-secondary login">
                    Войти
                </button>
            {:else}
                <button type="submit" class="btn btn-primary login">
                    Войти
                </button>
                <button on:click={switchRegister} class="btn btn-secondary register">
                    Зарегистрироваться
                </button>
            {/if}
        </div>
        {#if error !== ""}
            <div id="error_message" class="alert alert-danger error">
                {error}
            </div>
        {/if}
        {#if notify !== ""}
            <div id="notify_message" class="alert alert-success error">
                {notify}
            </div>
        {/if}
    </form>
</div>