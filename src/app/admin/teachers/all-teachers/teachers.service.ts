import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Teachers} from './teachers.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TeachersFirestoreService} from '../teachers-firestore.service';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class TeachersService {
  private readonly API_URL = 'assets/data/teachers.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Teachers[]> = new BehaviorSubject<Teachers[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(
    private httpClient: HttpClient,
    public teachersFirestoreService: TeachersFirestoreService,
  ) {
  }

  get data(): Teachers[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllTeachers(): void {
    /*this.httpClient.get<Teachers[]>(this.API_URL).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );*/
    this.teachersFirestoreService.getData().pipe(map(value => value.map(value1 => new Teachers(value1)))).subscribe(value => {
      this.isTblLoading = false;
      this.dataChange.next(value);
    })
  }

  addTeachers(teachers: Teachers): Promise<any> {
    this.dialogData = teachers;
    return this.teachersFirestoreService.addData(teachers);
    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateTeachers(teachers: Teachers): Promise<any> {
    this.dialogData = teachers;
    return this.teachersFirestoreService.updateData(teachers);
    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteTeachers(teachers: Teachers): Promise<any> {
    return this.teachersFirestoreService.deleteData(teachers);
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
