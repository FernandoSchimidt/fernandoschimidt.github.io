import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service: TodoService) {

  }
  todos: Todo[] = []
  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(3)])
  })
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listarTodos()
  }
  submit() {
    const todo: Todo = { ...this.form.value }
    this.service.salvar(todo)
      .subscribe(savedTodo => {
        this.todos.push(savedTodo)
        this.form.reset();
      })
  }

  listarTodos() {
    this.service.listar()
      .subscribe(todoList => {
        this.todos = todoList
      })
  }
  delete(todo: Todo) {
    this.service.delete(todo.id)
      .subscribe({
        next: (res) => {
          this.listarTodos()
        }
      })
  }
  concluido(todo: Todo) {
    this.service.marcarComoConcluido(todo.id)
      .subscribe({
        next: (todoAtt) => {
          todo.done = todoAtt.done
          todo.doneDate = todoAtt.doneDate
        }
      })
  }
}
