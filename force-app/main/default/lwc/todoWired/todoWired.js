import { LightningElement, track, wire } from "lwc";
import { refreshApex } from "@salesforce/apex";
import getTasks from "@salesforce/apex/todoListController.getTasks";
import insertTask from "@salesforce/apex/todoListController.insertTask";
import deleteTask from "@salesforce/apex/todoListController.deleteTask";
import isBoolTrue from "@salesforce/apex/todoListController.isBoolTrue";

export default class TodoWired extends LightningElement {
  @track newTask;
  @track id = 0;
  @track bool1;
  @track todoTasks = [];

  @track todoTaskResponse;
  //THIS WILL RETURN and Object {data:, error:,}
  // @wire(getTasks)
  // todoTasks;

  // @wire(getTasks)
  // wiredTasks({error, data}){
  //     if (data) {
  //     console.log(data)
  //         this.todoTasks = data;
  //         this.error = undefined;
  //         console.log(JSON.stringify(this.todoTasks));
  //     } else if (error) {
  //         this.error = error;
  //         this.todoTasks = undefined;
  //     }
  // }

  handleClickShowForm() {
    // this.bool =
  }

  handleChangeTaskInput(event) {
    console.dir(event.target);
    this.newTask = event.target.value;
    console.log(this.newTask);
  }

  handleClickDeleteBtn(event) {
    console.dir(event.target);

    console.log(event.target.name);

    // let newTasks = this.todoTasks.filter( (todoTask) => event.target.name !== todoTask.id);
    //     this.todoTasks = newTasks;
    //using for loop
    let idToDelete = event.target.name;
    let todoTasks = this.todoTasks;
    let todoTaskIndex;
    let recordIdToDelete;

    for (let i = 0; i < todoTasks.length; i++) {
      if (idToDelete === todoTasks[i].id) {
        todoTaskIndex = i;
      }
    }

    recordIdToDelete = todoTasks[todoTaskIndex].recordId;
    console.log(recordIdToDelete);
    this.todoTasks.splice(todoTaskIndex, 1);
  }

  handleClickAddBtn(event) {
    console.log(this.todoTasks);
    insertTask({ subject: this.newTask })
      .then((result) => {
        this.id = this.id + 1;
        let curTask = {
          ...result,
          recordId: result.Id,
          Id: this.id
        };
        this.todoTasks.unshift(curTask);
        console.log(result);
        console.log(curTask);
        return result;
      })
      .catch((error) => console.log(error));

    refreshApex(this.todoTaskResponse);

    this.newTask = "";
    // console.log(JSON.stringify(this.todoTasks))
  }

  refreshTodoList() {
    //specify the target response
    refreshApex(this.todoTaskResponse);
  }
  // @wire(isBoolTrue)
  // bool1;

  // connectedCallback(){
  //     console.log(JSON.stringify(this.bool1));
  //     }

  connectedCallback() {
    console.log("hello", this.todoTasks);
  }

  @wire(getTasks)
  wiredTasks(response) {
    this.todoTaskResponse = response;
    let data = response.data;
    let error = response.error;

    if (data) {
      console.log(data);
      this.todoTasks = [];

      //you can use concat or for each
      // this.todoTasks = data.concat(this.todoTasks);
      data.forEach((task) => {
        this.id = this.id + 1;
        this.todoTasks.unshift({
          Id: this.id,
          Subject: task.Subject,
          recordId: task.Id
        });
      });
      this.error = undefined;
      console.log(JSON.stringify(this.todoTasks));
    } else if (error) {
      this.error = error;
      this.todoTasks = undefined;
    }
  }
}