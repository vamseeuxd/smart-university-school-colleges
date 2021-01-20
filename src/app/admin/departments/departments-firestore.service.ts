import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {Department, IDepartment} from './all-departments/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsFirestoreService {
  private action: AngularFirestoreCollection<IDepartment>
  readonly data$: Observable<IDepartment[]>

  constructor(
    firestore: AngularFirestore
  ) {
    this.action = firestore.collection<IDepartment>('departments')
    this.data$ = firestore
      .collection<IDepartment>('departments', (ref) => {
        return ref.where('deleted', '==', false).orderBy('createdOn')
      })
      .valueChanges()
    /*debugger;
    this.data$.subscribe(value => {
      debugger;
    })*/
  }

  addData(data: Department): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const docRef = this.action.ref.doc();
      const id = docRef.id;
      const deleted = false;
      const createdOn = this.getServerTime();
      try {
        await docRef.set({...data.getData(id), deleted: false, createdOn})
        resolve(id)
      } catch (e) {
        reject(e)
      }
    })
  }

  updateData(data: Department): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const docRef = this.action.doc(data.id).ref
      try {
        await docRef.update(data.getData(data.id))
        resolve(docRef.id)
      } catch (e) {
        reject(e)
      }
    })
  }

  deleteData(data: Department): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        debugger;
        const docRef = await this.action.doc(data.id)
        const doc = await docRef.get().toPromise()
        await docRef.set({
          ...doc.data(),
          deleted: true,
        })
        resolve(doc.id)
      } catch (e) {
        reject(e)
      }
    })
  }

  getData(): Observable<IDepartment[]> {
    return this.data$
  }

  getServerTime(): any {
    return firebase.firestore.Timestamp.now().seconds * 1000
  }
}
