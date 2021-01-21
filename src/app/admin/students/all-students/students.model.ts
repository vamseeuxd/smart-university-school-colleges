import {formatDate} from '@angular/common';

export interface IStudents {
  id: string;
  img: string;
  name: string;
  email: string;
  date: string;
  gender: string;
  mobile: string;
  department: string;
  rollNo: string;
  deleted?: boolean;
  createdOn?: any;
}

export class Students {
  id: string;
  img: string;
  name: string;
  email: string;
  date: string;
  gender: string;
  mobile: string;
  department: string;
  rollNo: string;

  constructor(students) {
    {
      this.id = students.id || this.getRandomID().toString();
      this.img = students.avatar || 'assets/images/user/user1.jpg';
      this.name = students.name || '';
      this.email = students.email || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.gender = students.gender || '';
      this.mobile = students.mobile || '';
      this.department = students.department || '';
      this.rollNo = students.rollNo || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

  public getData(id: string): IStudents {
    return {
      id: id,
      img: this.img,
      name: this.name,
      email: this.email,
      date: this.date,
      gender: this.gender,
      mobile: this.mobile,
      department: this.department,
      rollNo: this.rollNo,
    }
  }
}
