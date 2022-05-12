import { writable, derived } from "svelte/store";

export const user = writable(null);
export const users = writable([]);
export const tasks = writable([]);

export const user_tasks = derived([tasks, user], ([$tasks, $user]) => {
    let logged_in_user_tasks = [];

    if ($user) {
        logged_in_user_tasks = $tasks.filter((task) => task.user_id === $user.id);
    }

    return logged_in_user_tasks;
});