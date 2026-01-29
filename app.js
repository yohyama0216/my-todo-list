// Todo List Application
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.init();
    }

    init() {
        // Get DOM elements
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.activeTodoList = document.getElementById('activeTodoList');
        this.doneTodoList = document.getElementById('doneTodoList');

        // Event listeners
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Event delegation for todo buttons
        this.activeTodoList.addEventListener('click', (e) => this.handleTodoClick(e));
        this.doneTodoList.addEventListener('click', (e) => this.handleTodoClick(e));

        // Initial render
        this.render();
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

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
new TodoApp();
