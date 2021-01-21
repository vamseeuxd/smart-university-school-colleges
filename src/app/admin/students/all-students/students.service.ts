import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Students} from './students.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {StudentsFirestoreService} from '../students-firestore.service';
import {map} from 'rxjs/operators';

@Injectable()
export class StudentsService {
  private readonly API_URL = 'assets/data/students.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(
    private httpClient: HttpClient,
    private studentsFirestoreService: StudentsFirestoreService,
  ) {
  }

  get data(): Students[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllStudentss(): void {
    /*this.httpClient.get<Students[]>(this.API_URL).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );*/

    this.studentsFirestoreService.getData().pipe(
      map(value => value.map(value1 => new Students(value1))))
      .subscribe(value => {
        this.isTblLoading = false;
        this.dataChange.next(value);
      })
  }

  addStudents(student: Students): Promise<any> {
    this.dialogData = student;
    return this.studentsFirestoreService.addData(student);
    /*  this.httpClient.post(this.API_URL, students).subscribe(data => {
      this.dialogData = students;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateStudents(student: Students): Promise<any> {
    this.dialogData = student;
    return this.studentsFirestoreService.updateData(student);
    /* this.httpClient.put(this.API_URL + students.id, students).subscribe(data => {
      this.dialogData = students;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteStudents(student: Students): Promise<any> {
    return this.studentsFirestoreService.deleteData(student);
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
