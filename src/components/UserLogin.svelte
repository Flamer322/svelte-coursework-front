<script>
    import { user, users } from '../store';
    import {addUser} from "../users";

    let isRegister = false;
    let email = "";
    let password = "";
    let error = ""

    async function userAdd() {
        let id = await addUser(email, password);

        let newUserObject = {
            id: id,
            email: email,
            password: password
        };
        $users = [...$users, newUserObject];

        isRegister = false;
        email = "";
        password = "";
    }

    async function login() {
        console.log($users);
        let foundUser = $users.find(x => x.email === email);

        if (foundUser) {
            console.log(email + ' ' + password);
            if (password === foundUser.password) {
                $user = foundUser;
                if (error){
                    error = "";
                }
                return;
            }
        }
        error = "Неверная почта или пароль."
    }

    function switchRegister(){
        isRegister = !isRegister;
    }
</script>

{#if isRegister}
    <div class="col">
        <form on:submit|preventDefault={userAdd} class="flex mx-auto col-6" style="margin-top: 30px">
            <div class="mb-3">
                <label for="emailRegister" class="form-label" style="font-size: 24px">Почта</label>
                <input type="email" class="form-control" id="emailRegister" bind:value={email} style="font-size: 20px; width: 400px"/>
            </div>
            <div class="mb-3">
                <label for="passwordRegister" class="form-label" style="font-size: 24px">Пароль</label>
                <input type="password" class="form-control" id="passwordRegister" bind:value={password} style="font-size: 20px; width: 400px"/>
            </div>
            <div class="row">
                <button type="submit" class="btn btn-primary" style="font-size: 20px; width: 230px; margin-left: 30px">Зарегистрироваться</button>
                <button on:click={switchRegister} class="btn btn-secondary" style="font-size: 20px; width: 100px; margin-left: 30px">Войти</button>
            </div>
            <div id="error_messageRegister" class="text-danger" style="font-size: 24px; margin-top: 20px">
                {error}
            </div>
        </form>
    </div>
{:else}
    <div class="col">
        <form on:submit|preventDefault={login} class="flex mx-auto col-6" style="margin-top: 30px">
            <div class="mb-3">
                <label for="emailLogin" class="form-label" style="font-size: 24px">Почта</label>
                <input type="email" class="form-control" id="emailLogin" bind:value={email} style="font-size: 20px; width: 400px"/>
            </div>
            <div class="mb-3">
                <label for="passwordLogin" class="form-label" style="font-size: 24px">Пароль</label>
                <input type="password" class="form-control" id="passwordLogin" bind:value={password} style="font-size: 20px; width: 400px"/>
            </div>
            <div class="row">
                <button type="submit" class="btn btn-primary" style="font-size: 20px; width: 100px; margin-left: 30px">Войти</button>
                <button on:click={switchRegister} class="btn btn-secondary" style="font-size: 20px; width: 230px; margin-left: 30px">Зарегистрироваться</button>
            </div>
            <div id="error_messageLogin" class="text-danger" style="font-size: 24px; margin-top: 20px">
                {error}
            </div>
        </form>
    </div>
{/if}