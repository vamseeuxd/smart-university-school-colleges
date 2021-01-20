import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {TeachersService} from '../../teachers.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {Teachers} from '../../teachers.model';
import {formatDate} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';
import {TeachersFirestoreService} from '../../../teachers-firestore.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  proForm: FormGroup;
  teachers: Teachers;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public teachersService: TeachersService,
    public teachersFirestoreService: TeachersFirestoreService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.teachers.name;
      this.teachers = data.teachers;
    } else {
      this.dialogTitle = 'New Teachers';
      this.teachers = new Teachers({});
    }
    this.proForm = this.createContactForm();
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.teachers.id],
      img: [this.teachers.img],
      name: [this.teachers.name],
      email: [
        this.teachers.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      date: [
        formatDate(this.teachers.date, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      gender: [this.teachers.gender],
      mobile: [this.teachers.mobile],
      department: [this.teachers.department],
      degree: [this.teachers.degree],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public async confirmAdd() {
    this.spinner.show();
    if (this.action === 'edit') {
      try {
        await this.teachersService.updateTeachers(new Teachers(this.proForm.getRawValue()));
        this.dialogRef.close(1);
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
        debugger;
      }
    } else {
      try {
        await this.teachersService.addTeachers(new Teachers(this.proForm.getRawValue()));
        this.dialogRef.close(1);
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
        debugger;
      }
    }
  }
}
