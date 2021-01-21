import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {StudentsService} from '../../students.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentsService: StudentsService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async confirmDelete() {
    this.spinner.show();
    try {
      debugger
      await this.studentsService.deleteStudents(this.data);
      this.spinner.hide();
    } catch (e) {
      this.spinner.hide();
    }
  }
}
