import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Api } from '../api';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialog } from '../delete-user-dialog/delete-user-dialog';
import { AdminEditDialog } from '../admin-edit-dialog/admin-edit-dialog';

@Component({
  selector: 'app-admin-users',
  imports: [MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers {
  api = inject(Api);
  toastr = inject(ToastrService);
  dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'email', 'phone', 'points', 'actions'];
  // users: any[] = []; 
  // here not used -- users = [] because, the table sometimes renders before the API response comes back. 
  // so using-- MatTableDataSource automatically refreshes the table when data changes.
  dataSource = new MatTableDataSource<any>();

  //load users from JSON server
  ngOnInit(): void {
    this.api.getUsers().subscribe((data) => {
      this.dataSource.data = data;
      console.log(data);
      console.log("user", 1);
    });
  }
//deleteUser() method
  deleteUser(user: any): void {
    const dialogRef = this.dialog.open(DeleteUserDialog, { width: '350px' });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.api.deleteUser(user.id).subscribe(() => {
          // Remove the deleted user from the data source or table
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
          this.toastr.success('User deleted successfully', 'Success');
        });
      }
    });
  }

 // editUser() Method
 //When admin clicks Edit, selected user is sent to dialog.
 editUser(user: any): void {

  const dialogRef = this.dialog.open(AdminEditDialog, {
    width: '600px',
  maxWidth: '90vw',
    data: user
  });

  dialogRef.afterClosed().subscribe(updatedUser => {
    if (updatedUser) {
      const index = this.dataSource.data.findIndex(
        u => u.id === updatedUser.id
      );

      if (index !== -1) {
        this.dataSource.data[index] = updatedUser;
        this.dataSource.data = [...this.dataSource.data];
      }
    }
  });
}
}


