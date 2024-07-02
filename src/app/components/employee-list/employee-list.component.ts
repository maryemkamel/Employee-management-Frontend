
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee-service.service';
import { Router } from '@angular/router';
import {catchError, throwError} from "rxjs";


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService, private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Failed to fetch employees', error);
      }
    );
  }


  deleteEmployee(id:string): void{
    if (confirm('Are you sure that you want to delete this employee')){
      this.employeeService.deleteEmployee(id).
      pipe( catchError( error => {
        console.error('Error deleting employee:', error);
        this.errorMessage = 'Failed to delete employee. Please try again later.';
        return throwError('Failed to delete employee.');
      })).subscribe(() => {
        this.loadEmployees();
      });
    }

  }
  editEmployee(id: string): void {
    this.router.navigate(['/employees/edit', id]);

  }
  showEmployee(id: string): void {
    this.router.navigate(['/employees/', id]);

  }
  addNewEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

}
