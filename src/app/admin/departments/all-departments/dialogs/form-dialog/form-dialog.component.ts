import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DepartmentService} from '../../department.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {Department} from '../../department.model';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  departmentForm: FormGroup;
  department: Department;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    public departmentService: DepartmentService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.department.dName;
      this.department = data.department;
    } else {
      this.dialogTitle = 'New Department';
      this.department = new Department({});
    }
    this.departmentForm = this.createContactForm();
  }

  formControl = new FormControl('', [
    Validators.required
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
      id: [this.department.id],
      dName: [this.department.dName, [Validators.required]],
      hod: [this.department.hod, [Validators.required]],
      phone: [this.department.phone, [Validators.required]],
      email: [
        this.department.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      sYear: [this.department.sYear, [Validators.required]],
      sCapacity: [this.department.sCapacity, [Validators.required]]
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
        await this.departmentService.updateDepartment(new Department(this.departmentForm.getRawValue()));
        this.dialogRef.close(1);
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
        debugger;
      }
    } else {
      try {
        await this.departmentService.addDepartment(new Department(this.departmentForm.getRawValue()));
        this.dialogRef.close(1);
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
        debugger;
      }
    }
  }
}
