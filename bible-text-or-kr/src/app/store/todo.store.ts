import { inject } from "@angular/core";
import { Todo } from "@app/models/todo.model";
import { TodoService } from "@app/services/todo.service";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
export type TodosFilter = 'all' | 'pending' | 'completed';

type TodosState = {
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter
};

const initialState: TodosState = {
    todos: [],
    loading: false,
    filter: 'all'
};

export const TodosStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods(
        (store, todoService = inject(TodoService)) => ({
            async loadAll() {
                patchState(store, { loading: true });

                const todos = await todoService.getTodos();

                patchState(store, { todos: todos, loading: false });

            }
        }),
    )
);
