// ============================================================
// db.js — Persistencia via localStorage (simula db.json)
// ============================================================
const db = {
    init() {
        if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]));
        if (!localStorage.getItem('todos'))  localStorage.setItem('todos',  JSON.stringify([]));
    },

    getUsers()           { return JSON.parse(localStorage.getItem('users') || '[]'); },
    setUsers(u)          { localStorage.setItem('users', JSON.stringify(u)); },

    getTodos()           { return JSON.parse(localStorage.getItem('todos') || '[]'); },
    setTodos(t)          { localStorage.setItem('todos', JSON.stringify(t)); },

    getCurrentUser()     { return JSON.parse(localStorage.getItem('currentUser') || 'null'); },
    setCurrentUser(user) {
        if (user) localStorage.setItem('currentUser', JSON.stringify(user));
        else      localStorage.removeItem('currentUser');
    },

    getTodosByUser(email) {
        return db.getTodos().filter(t => t.userId === email);
    },

    addTodo(todo) {
        const todos = db.getTodos();
        todos.push(todo);
        db.setTodos(todos);
    },

    toggleTodoDone(id) {
        const todos = db.getTodos();
        const idx   = todos.findIndex(t => t.id === id);
        if (idx === -1) return;
        todos[idx].done = !todos[idx].done;
        db.setTodos(todos);
    },

    deleteTodo(id) {
        db.setTodos(db.getTodos().filter(t => t.id !== id));
    }
};

// ============================================================
// Helpers
// ============================================================
function $(id)    { return document.getElementById(id); }
function show(el) { el.classList.remove('hidden'); }
function hide(el) { el.classList.add('hidden'); }

function setError(errEl, inputEl, msg) {
    errEl.textContent = msg;
    show(errEl);
    if (inputEl) {
        inputEl.classList.add('border-red-500/50', '!bg-red-500/5');
    }
}

function clearErrors(pairs) {
    pairs.forEach(([errEl, inputEl]) => {
        errEl.textContent = '';
        hide(errEl);
        if (inputEl) {
            inputEl.classList.remove('border-red-500/50', '!bg-red-500/5');
        }
    });
    hide($('err-general-wrap'));
    $('err-general').textContent = '';
}

// ============================================================
// Auth Module
// ============================================================
const auth = {
    isLoginMode: true,

    toggle() {
        auth.isLoginMode = !auth.isLoginMode;
        ui.clearAuthForm();
        ui.renderAuthMode();
    },

    login(email, password) {
        const users  = db.getUsers();
        const user   = users.find(u => u.email === email);

        if (!user) {
            ui.showGeneralError('E-mail nao encontrado. Verifique ou crie uma conta.');
            return false;
        }
        if (user.password !== password) {
            ui.showGeneralError('Senha incorreta. Tente novamente.');
            return false;
        }

        db.setCurrentUser({ id: user.id, name: user.name, email: user.email });
        return true;
    },

    register(name, email, password) {
        const users = db.getUsers();
        if (users.some(u => u.email === email)) {
            ui.showGeneralError('Este e-mail ja esta em uso. Faca login ou use outro e-mail.');
            return false;
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password
        };
        users.push(newUser);
        db.setUsers(users);
        db.setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });
        return true;
    },

    logout() {
        db.setCurrentUser(null);
        ui.render();
    }
};

// ============================================================
// Todo Module
// ============================================================
const todos = {
    add(title, type, description) {
        const user = db.getCurrentUser();
        if (!user) return;

        const todo = {
            id:          Date.now().toString(),
            userId:      user.email,
            title:       title.trim(),
            type,
            description: description.trim(),
            done:        false
        };
        db.addTodo(todo);
    },

    toggle(id) { db.toggleTodoDone(id); },
    remove(id) { db.deleteTodo(id); }
};

// ============================================================
// UI Module
// ============================================================
const ui = {
    // ---- Views ----
    render() {
        const user = db.getCurrentUser();
        if (user) {
            hide($('auth-view'));
            show($('dashboard-view'));
            $('auth-view').classList.remove('view-enter');
            $('auth-view').classList.add('view-exit');
            $('dashboard-view').classList.remove('view-exit');
            $('dashboard-view').classList.add('view-enter');
            ui.renderDashboard();
        } else {
            hide($('dashboard-view'));
            show($('auth-view'));
            $('dashboard-view').classList.remove('view-enter');
            $('dashboard-view').classList.add('view-exit');
            $('auth-view').classList.remove('view-exit');
            $('auth-view').classList.add('view-enter');
            ui.renderAuthMode();
        }
    },

    // ---- Auth ----
    renderAuthMode() {
        if (auth.isLoginMode) {
            $('auth-title').textContent    = 'Bem-vindo de volta';
            $('auth-subtitle').textContent = 'Acesse sua conta para organizar suas tarefas';
            hide($('name-group'));
            $('submit-btn').textContent    = 'Entrar na plataforma';
            $('toggle-auth-btn').innerHTML = 'Nao tem uma conta? <span class="text-blue-400 font-semibold">Cadastre-se gratis</span>';
        } else {
            $('auth-title').textContent    = 'Crie sua conta';
            $('auth-subtitle').textContent = 'Comece a organizar sua vida hoje';
            show($('name-group'));
            $('submit-btn').textContent    = 'Criar conta gratuita';
            $('toggle-auth-btn').innerHTML = 'Ja possui conta? <span class="text-blue-400 font-semibold">Faca login</span>';
        }
    },

    clearAuthForm() {
        $('auth-form').reset();
        clearErrors([
            [$('err-name'),     $('inp-name')],
            [$('err-email'),    $('inp-email')],
            [$('err-password'), $('inp-password')],
        ]);
    },

    showGeneralError(msg) {
        $('err-general').textContent = msg;
        show($('err-general-wrap'));
    },

    handleAuthSubmit(e) {
        e.preventDefault();

        const name     = $('inp-name').value.trim();
        const email    = $('inp-email').value.trim();
        const password = $('inp-password').value;

        clearErrors([
            [$('err-name'),     $('inp-name')],
            [$('err-email'),    $('inp-email')],
            [$('err-password'), $('inp-password')],
        ]);

        let hasError = false;

        if (!auth.isLoginMode && !name) {
            setError($('err-name'), $('inp-name'), 'Informe seu nome completo.');
            hasError = true;
        }
        if (!email) {
            setError($('err-email'), $('inp-email'), 'O e-mail e obrigatorio.');
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError($('err-email'), $('inp-email'), 'Insira um e-mail valido.');
            hasError = true;
        }
        if (!password) {
            setError($('err-password'), $('inp-password'), 'A senha e obrigatoria.');
            hasError = true;
        } else if (password.length < 6) {
            setError($('err-password'), $('inp-password'), 'Minimo 6 caracteres.');
            hasError = true;
        }

        if (hasError) return;

        const success = auth.isLoginMode
            ? auth.login(email, password)
            : auth.register(name, email, password);

        if (success) {
            $('auth-form').reset();
            ui.render();
        }
    },

    // ---- Dashboard ----
    renderDashboard() {
        const user = db.getCurrentUser();
        if (!user) return;

        $('welcome-name').textContent = user.name.split(' ')[0];
        ui.renderTodos();
    },

    renderTodos() {
        const user  = db.getCurrentUser();
        if (!user) return;

        const list  = $('todo-list');
        const empty = $('empty-state');
        const counter = $('task-counter');

        const userTodos = db.getTodosByUser(user.email);

        // Ordena: pendentes primeiro, concluidas ao final
        const sorted = [
            ...userTodos.filter(t => !t.done),
            ...userTodos.filter(t =>  t.done)
        ];

        list.innerHTML = '';

        if (sorted.length === 0) {
            show(empty);
            counter.textContent = '0 tarefas';
            return;
        }

        hide(empty);
        const pendentes = userTodos.filter(t => !t.done).length;
        counter.textContent = `${pendentes} pendente${pendentes !== 1 ? 's' : ''} / ${sorted.length} total`;

        sorted.forEach(todo => {
            list.appendChild(ui.createTodoCard(todo));
        });
    },

    createTodoCard(todo) {
        const typeMap = {
            'Trabalho': { badge: 'badge-trabalho', label: 'Trabalho' },
            'Pessoal':  { badge: 'badge-pessoal',  label: 'Pessoal'  },
            'Estudos':  { badge: 'badge-estudos',  label: 'Estudos'  },
        };
        const typeInfo = typeMap[todo.type] || typeMap['Pessoal'];

        const card = document.createElement('div');
        card.dataset.id = todo.id;
        card.className  = `task-card rounded-2xl p-5 ${todo.done ? 'done' : ''}`;

        card.innerHTML = `
            <div class="flex items-start justify-between gap-3">
                <div class="flex-1 min-w-0">
                    <div class="flex flex-wrap items-center gap-2 mb-2">
                        <h3 class="font-semibold text-white text-sm truncate ${todo.done ? 'line-through text-slate-400' : ''}">${escapeHtml(todo.title)}</h3>
                        <span class="${typeInfo.badge} text-xs font-medium px-2.5 py-0.5 rounded-full shrink-0">${typeInfo.label}</span>
                    </div>
                    ${todo.description ? `<p class="text-slate-400 text-sm leading-relaxed ${todo.done ? 'line-through' : ''}">${escapeHtml(todo.description)}</p>` : ''}
                </div>
                <div class="flex items-center gap-2 shrink-0 mt-0.5">
                    <button class="btn-done text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                        todo.done
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                            : 'bg-slate-800/60 text-slate-300 border-slate-700/50 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20'
                    }" data-id="${todo.id}">
                        ${todo.done ? 'Desfazer' : 'Concluir'}
                    </button>
                    <button class="btn-delete text-xs font-medium px-3 py-1.5 rounded-lg border bg-slate-800/60 text-slate-400 border-slate-700/50 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all duration-200" data-id="${todo.id}" title="Excluir tarefa">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        `;

        return card;
    },

    handleTodoSubmit(e) {
        e.preventDefault();

        const title = $('todo-title').value.trim();
        const type  = $('todo-type').value;
        const desc  = $('todo-desc').value;

        hide($('err-title'));
        $('todo-title').classList.remove('border-red-500/50', '!bg-red-500/5');

        if (!title) {
            setError($('err-title'), $('todo-title'), 'O titulo da tarefa e obrigatorio.');
            return;
        }

        todos.add(title, type, desc);
        $('todo-form').reset();
        ui.renderTodos();
    },

    handleTodoListClick(e) {
        const btnDone   = e.target.closest('.btn-done');
        const btnDelete = e.target.closest('.btn-delete');

        if (btnDone) {
            todos.toggle(btnDone.dataset.id);
            ui.renderTodos();
        }

        if (btnDelete) {
            todos.remove(btnDelete.dataset.id);
            ui.renderTodos();
        }
    }
};

// ============================================================
// Sanitizacao basica contra XSS
// ============================================================
function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// ============================================================
// Bootstrap
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    db.init();

    // Listeners — Auth
    $('auth-form').addEventListener('submit',     ui.handleAuthSubmit);
    $('toggle-auth-btn').addEventListener('click', auth.toggle);
    $('logout-btn').addEventListener('click',      auth.logout);

    // Listeners — Todo
    $('todo-form').addEventListener('submit',      ui.handleTodoSubmit);
    $('todo-list').addEventListener('click',       ui.handleTodoListClick);

    // Render inicial
    ui.render();
});
