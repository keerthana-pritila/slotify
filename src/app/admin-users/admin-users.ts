import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Api } from '../api';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import{ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-users',
  imports: [MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers {
  api = inject(Api);
  toastr = inject(ToastrService);

  displayedColumns: string[] = ['name', 'email', 'points', 'actions'];
  // users: any[] = []; 
  // here not used -- users = [] because, the table sometimes renders before the API response comes back. 
  // so using-- MatTableDataSource automatically refreshes the table when data changes.
  dataSource = new MatTableDataSource<any>();

  //load users from JSON server
  ngOnInit(): void {
    this.api.getUsers().subscribe((data) => {
      this.dataSource.data = data;
      console.log(data);
    });
  }

  deleteUser(user: any): void {
    this.api.deleteUser(user.id).subscribe(() => {

      // Remove the deleted user from the data source or table
      this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);

      this.toastr.success('User deleted successfully', 'Success');
    });
  }
}
