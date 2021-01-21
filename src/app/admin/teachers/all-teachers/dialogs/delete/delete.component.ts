import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {TeachersService} from '../../teachers.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Teachers} from '../../teachers.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    public teachersService: TeachersService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async confirmDelete() {
    try {
      await this.teachersService.deleteTeachers(this.data);
      this.spinner.hide();
    } catch (e) {
      this.spinner.hide();
    }
  }
}
