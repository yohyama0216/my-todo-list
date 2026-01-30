// Todo List Application
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.routines = this.loadRoutines();
        this.checkAndResetRoutines();
        this.init();
    }

    init() {
        // Get DOM elements
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.routineInput = document.getElementById('routineInput');
        this.addRoutineBtn = document.getElementById('addRoutineBtn');
        this.activeTodoList = document.getElementById('activeTodoList');
        this.doneTodoList = document.getElementById('doneTodoList');
        this.routineList = document.getElementById('routineList');

        // Event listeners
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        this.addRoutineBtn.addEventListener('click', () => this.addRoutine());
        this.routineInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addRoutine();
            }
        });

        // Event delegation for todo buttons
        this.activeTodoList.addEventListener('click', (e) => this.handleTodoClick(e));
        this.doneTodoList.addEventListener('click', (e) => this.handleTodoClick(e));
        this.routineList.addEventListener('click', (e) => this.handleRoutineClick(e));

        // Initial render
        this.render();
        
        // Check for reset every minute
        setInterval(() => this.checkAndResetRoutines(), 60000);
    }

    handleRoutineClick(e) {
        const target = e.target;
        const routineItem = target.closest('.list-group-item');
        if (!routineItem) return;

        const routineId = parseInt(routineItem.dataset.id);
        
        if (target.type === 'checkbox') {
            this.toggleRoutineCheck(routineId);
        } else if (target.classList.contains('delete-btn')) {
            this.deleteRoutine(routineId);
        }
    }

    handleTodoClick(e) {
        const target = e.target;
        if (!target.classList.contains('btn')) return;

        const todoItem = target.closest('.list-group-item');
        if (!todoItem) return;

        const todoId = parseInt(todoItem.dataset.id);
        
        if (target.classList.contains('done-btn') || target.classList.contains('undo-btn')) {
            this.toggleDone(todoId);
        } else if (target.classList.contains('delete-btn')) {
            this.deleteTodo(todoId);
        }
    }

    loadTodos() {
        const stored = localStorage.getItem('todos');
        return stored ? JSON.parse(stored) : [];
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadRoutines() {
        const stored = localStorage.getItem('routines');
        return stored ? JSON.parse(stored) : [];
    }

    saveRoutines() {
        localStorage.setItem('routines', JSON.stringify(this.routines));
    }

    getLastResetDate() {
        return localStorage.getItem('lastRoutineReset');
    }

    setLastResetDate(date) {
        localStorage.setItem('lastRoutineReset', date);
    }

    checkAndResetRoutines() {
        const now = new Date();
        const lastReset = this.getLastResetDate();
        
        // Check if it's past 1:00 AM and we haven't reset today
        if (now.getHours() >= 1) {
            const today = now.toDateString();
            if (lastReset !== today) {
                // Reset all routine checkboxes
                this.routines.forEach(routine => {
                    routine.checked = false;
                });
                this.saveRoutines();
                this.setLastResetDate(today);
                this.renderRoutines();
            }
        }
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (text === '') {
            alert('タスクを入力してください');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            done: false,
            doneTime: null
        };

        this.todos.push(todo);
        this.saveTodos();
        this.todoInput.value = '';
        this.render();
    }

    addRoutine() {
        const text = this.routineInput.value.trim();
        if (text === '') {
            alert('ルーチンを入力してください');
            return;
        }

        const routine = {
            id: Date.now(),
            text: text,
            checked: false
        };

        this.routines.push(routine);
        this.saveRoutines();
        this.routineInput.value = '';
        this.renderRoutines();
    }

    toggleRoutineCheck(id) {
        const routine = this.routines.find(r => r.id === id);
        if (routine) {
            routine.checked = !routine.checked;
            this.saveRoutines();
            this.renderRoutines();
        }
    }

    deleteRoutine(id) {
        this.routines = this.routines.filter(r => r.id !== id);
        this.saveRoutines();
        this.renderRoutines();
    }

    toggleDone(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.done = !todo.done;
            todo.doneTime = todo.done ? new Date().toLocaleString('ja-JP') : null;
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }

    render() {
        this.renderActiveTodos();
        this.renderDoneTodos();
        this.renderRoutines();
    }

    renderActiveTodos() {
        const activeTodos = this.todos.filter(t => !t.done);
        
        if (activeTodos.length === 0) {
            this.activeTodoList.innerHTML = '<li class="list-group-item text-center text-muted">アクティブなタスクはありません</li>';
            return;
        }

        this.activeTodoList.innerHTML = activeTodos.map(todo => `
            <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${todo.id}">
                <span>${this.escapeHtml(todo.text)}</span>
                <div>
                    <button class="btn btn-success btn-sm done-btn">完了</button>
                    <button class="btn btn-danger btn-sm delete-btn ms-1">削除</button>
                </div>
            </li>
        `).join('');
    }

    renderDoneTodos() {
        const doneTodos = this.todos.filter(t => t.done);
        
        if (doneTodos.length === 0) {
            this.doneTodoList.innerHTML = '<li class="list-group-item text-center text-muted">完了したタスクはありません</li>';
            return;
        }

        this.doneTodoList.innerHTML = doneTodos.map(todo => `
            <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${todo.id}">
                <div>
                    <span class="text-decoration-line-through">${this.escapeHtml(todo.text)}</span>
                    <small class="text-muted d-block">${todo.doneTime}</small>
                </div>
                <div>
                    <button class="btn btn-warning btn-sm undo-btn">戻す</button>
                    <button class="btn btn-danger btn-sm delete-btn ms-1">削除</button>
                </div>
            </li>
        `).join('');
    }

    renderRoutines() {
        if (this.routines.length === 0) {
            this.routineList.innerHTML = '<li class="list-group-item text-center text-muted">ルーチンはありません</li>';
            return;
        }

        this.routineList.innerHTML = this.routines.map(routine => `
            <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${routine.id}">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" ${routine.checked ? 'checked' : ''} id="routine-${routine.id}">
                    <label class="form-check-label ${routine.checked ? 'text-decoration-line-through text-muted' : ''}" for="routine-${routine.id}">
                        ${this.escapeHtml(routine.text)}
                    </label>
                </div>
                <button class="btn btn-danger btn-sm delete-btn">削除</button>
            </li>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
new TodoApp();
