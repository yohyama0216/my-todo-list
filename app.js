// Todo List Application
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentTab = 'active';
        this.init();
    }

    init() {
        // Get DOM elements
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.activeTodoList = document.getElementById('activeTodoList');
        this.doneTodoList = document.getElementById('doneTodoList');
        this.tabBtns = document.querySelectorAll('.tab-btn');

        // Event listeners
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
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

        const todoItem = target.closest('.todo-item');
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

    switchTab(tab) {
        this.currentTab = tab;
        
        // Update tab buttons
        this.tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tab) {
                btn.classList.add('active');
            }
        });

        // Update tab panes
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
            if (pane.id === tab) {
                pane.classList.add('active');
            }
        });
    }

    render() {
        this.renderActiveTodos();
        this.renderDoneTodos();
    }

    renderActiveTodos() {
        const activeTodos = this.todos.filter(t => !t.done);
        
        if (activeTodos.length === 0) {
            this.activeTodoList.innerHTML = '<li class="empty-message">アクティブなタスクはありません</li>';
            return;
        }

        this.activeTodoList.innerHTML = activeTodos.map(todo => `
            <li class="todo-item" data-id="${todo.id}">
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="btn done-btn">完了</button>
                <button class="btn delete-btn">削除</button>
            </li>
        `).join('');
    }

    renderDoneTodos() {
        const doneTodos = this.todos.filter(t => t.done);
        
        if (doneTodos.length === 0) {
            this.doneTodoList.innerHTML = '<li class="empty-message">完了したタスクはありません</li>';
            return;
        }

        this.doneTodoList.innerHTML = doneTodos.map(todo => `
            <li class="todo-item done" data-id="${todo.id}">
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <span class="done-time">${todo.doneTime}</span>
                <button class="btn undo-btn">戻す</button>
                <button class="btn delete-btn">削除</button>
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
