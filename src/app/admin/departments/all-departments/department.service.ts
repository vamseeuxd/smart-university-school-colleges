import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Department} from './department.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {DepartmentsFirestoreService} from '../departments-firestore.service';

@Injectable()
export class DepartmentService {
  private readonly API_URL = 'assets/data/department.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(
    private httpClient: HttpClient,
    private departmentsFirestoreService: DepartmentsFirestoreService,
  ) {
  }

  get data(): Department[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllDepartments(): void {
    /*this.httpClient.get<Department[]>(this.API_URL).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );*/

    this.departmentsFirestoreService.getData().pipe(
      map(value => value.map(value1 => new Department(value1))))
      .subscribe(value => {
        this.isTblLoading = false;
        this.dataChange.next(value);
      })
  }

  addDepartment(department: Department): Promise<any> {
    this.dialogData = department;
    return this.departmentsFirestoreService.addData(department);
    /*  this.httpClient.post(this.API_URL, department).subscribe(data => {
      this.dialogData = department;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateDepartment(department: Department): Promise<any> {
    this.dialogData = department;
    return this.departmentsFirestoreService.updateData(department);
    /* this.httpClient.put(this.API_URL + department.id, department).subscribe(data => {
      this.dialogData = department;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteDepartment(department: Department): Promise<any> {
    return this.departmentsFirestoreService.deleteData(department);
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
