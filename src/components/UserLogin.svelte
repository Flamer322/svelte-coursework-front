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

<div class="col">
    <form on:submit|preventDefault={submitForm} class="flex mx-auto col-6" style="margin-top: 30px">
        <div class="mb-3">
            <label for="email" class="form-label" style="font-size: 20px">Почта</label>
            <input type="email" class="form-control" id="email" bind:value={email} style="font-size: 20px; width: 400px"/>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label" style="font-size: 20px">Пароль</label>
            <input type="password" class="form-control" id="password" bind:value={password} style="font-size: 20px; width: 400px"/>
        </div>
        <div class="row">
            {#if isRegister}
                <button type="submit" class="btn btn-primary"
                        style="font-size: 18px; width: 230px; margin-left: 30px">Зарегистрироваться
                </button>
                <button on:click={switchRegister} class="btn btn-secondary"
                        style="font-size: 18px; width: 100px; margin-left: 30px">Войти
                </button>
            {:else}
                <button type="submit" class="btn btn-primary"
                        style="font-size: 18px; width: 100px; margin-left: 30px">Войти
                </button>
                <button on:click={switchRegister} class="btn btn-secondary"
                        style="font-size: 18px; width: 230px; margin-left: 30px">Зарегистрироваться
                </button>
            {/if}
        </div>
        {#if error !== ""}
            <div id="error_message" class="alert alert-danger"
                 style="font-size: 18px; margin-top: 20px; margin-left: 20px; width: fit-content">
                {error}
            </div>
        {/if}
        {#if notify !== ""}
            <div id="notify_message" class="alert alert-success"
                 style="font-size: 18px; margin-top: 20px; margin-left: 20px; width: fit-content">
                {notify}
            </div>
        {/if}
    </form>
</div>