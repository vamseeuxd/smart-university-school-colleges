import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DepartmentService } from '../../department.service';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    public departmentService: DepartmentService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  async confirmDelete() {
    try {
      debugger
      await this.departmentService.deleteDepartment(this.data);
      this.spinner.hide();
    } catch (e) {
      this.spinner.hide();
    }
  }
}
