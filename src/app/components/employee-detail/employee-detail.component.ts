import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee-service.service';
import { Employee } from 'src/app/models/employee';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employee: Employee | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router:Router
    
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.employeeService.getEmployeeById(employeeId).subscribe(
        (employee: Employee) => {
          this.employee = employee;
        },
        (error) => {
          console.error('Failed to fetch employee', error);
        }
      );
    }
  }
  scrollToTop() {
    this.router.navigate(['/employees/']);
  }
    
}
