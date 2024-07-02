// edit-employee.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee-service.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
    });

    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe(
        (employee: Employee) => {
          this.employeeForm.patchValue({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            position: employee.position,
            department: employee.department,
          });
        },
        (error) => {
          console.error('Failed to fetch employee', error);
        }
      );
    }
  }

  updateEmployee(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee = this.employeeForm.getRawValue(); 
      this.employeeService.updateEmployee(this.employeeId, updatedEmployee).subscribe(
        () => {
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Failed to update employee', error);
        }
      );
    }
  }
  goBack() {
    this.router.navigate(['/employees']);    }
}
