import Todo from './Todo.js';
import { variables } from './variables.js';

const todo = new Todo(variables);

todo.setEventListeners();
todo.createList();
