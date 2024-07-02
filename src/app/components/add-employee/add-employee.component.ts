import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee-service.service';
import { Employee } from 'src/app/models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    position: '',
    department: ''
  };
  employees: any[]=[];

  constructor(private employeeService: EmployeeService,private router: Router
  ) {}

  addEmployee(): void {
    this.employeeService.addEmployee(this.employee).subscribe();
    this.router.navigate(['/employees']); 
    this.loadEmployees()

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
  goBack() {
    this.router.navigate(['/employees']);    }
}
