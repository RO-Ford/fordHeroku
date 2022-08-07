import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


// key that is used to access the data in local storageconst 
const STORAGE_KEY = 'local_todolist';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {



  anotherTodolist = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private routes: Router, private router: ActivatedRoute) { }

  public storeOnLocalStorage(taskTitle: any, algo: String): void {
    this.storage.remove(STORAGE_KEY)
    // get array of tasks from local storage
    const currentTodoList = this.storage.get(STORAGE_KEY) || [];
    // push new task to array
    currentTodoList.push({
      taskTitle
    });
    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentTodoList);
    //console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
    this.routes.navigate([algo, { data: 'switch' }]);
  }

  public getOnLocalStorage() {
    return this.storage.get(STORAGE_KEY)[0]["taskTitle"] || 'LocaL storage is empty';
  }

}
