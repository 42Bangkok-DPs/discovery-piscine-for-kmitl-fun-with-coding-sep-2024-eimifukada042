$(document).ready(function() {
    // Function to load tasks from cookies
    function loadTasks() {
        const tasks = getCookie('todoList');
        if (tasks) {
            const taskList = JSON.parse(tasks);
            taskList.forEach(task => addTaskToList(task, false));
        }
    }

    // Function to save tasks to cookies
    function saveTasks() {
        const tasks = [];
        $('.todo-item').each(function() {
            tasks.push($(this).text());
        });
        setCookie('todoList', JSON.stringify(tasks), 30); // Cookie expires in 30 days
    }

    // Function to add a task to the list and DOM
    function addTaskToList(task, save = true) {
        const $taskElement = $('<div class="todo-item"></div>').text(task);

        // Click event to remove a task
        $taskElement.on('click', function() {
            if (confirm('Do you really want to remove this TO DO?')) {
                $(this).remove();
                saveTasks();
            }
        });

        // Add the task at the top of the list
        $('#ft_list').prepend($taskElement);

        // Save tasks to cookies if requested
        if (save) saveTasks();
    }

    // Handle New Task button click
    $('#newBtn').on('click', function() {
        const task = prompt('Enter your new TO DO:');
        if (task && task.trim() !== '') {
            addTaskToList(task.trim());
        }
    });

    // Cookie helper functions
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Load tasks on page load
    loadTasks();
});

