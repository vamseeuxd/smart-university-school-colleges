import {Injectable} from '@angular/core';
import {ITeacher, Teachers} from './all-teachers/teachers.model';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class TeachersFirestoreService {
  private action: AngularFirestoreCollection<ITeacher>
  readonly data$: Observable<ITeacher[]>

  constructor(
    firestore: AngularFirestore
  ) {
    this.action = firestore.collection<ITeacher>('teachers')
    this.data$ = firestore
      .collection<ITeacher>('teachers', (ref) => {
        return ref.where('deleted', '==', false).orderBy('createdOn')
      })
      .valueChanges()
  }

  addData(data: Teachers): Promise<any> {
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

  updateData(data: Teachers): Promise<any> {
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

  deleteData(data: Teachers): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
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

  getData(): Observable<ITeacher[]> {
    return this.data$
  }

  getServerTime(): any {
    return firebase.firestore.Timestamp.now().seconds * 1000
  }
}
