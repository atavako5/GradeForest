import { Component, OnInit } from '@angular/core';
import { CumulativeGrade } from 'interfaces/cumulativeGrade';
import { CumulativeGradeService } from 'src/app/helpers/services/cumulative-grade.service';

@Component({
  selector: 'app-cumulative-grades',
  templateUrl: './cumulative-grades.component.html',
  styleUrls: ['./cumulative-grades.component.scss'],
})
export class CumulativeGradesComponent implements OnInit {
  data: CumulativeGrade = { cumulativeGPA: 0, cumulativeGrade: 0, GPAScale: 0 };
  constructor(private cumulativeGradeService: CumulativeGradeService) {}

  ngOnInit(): void {
    this.cumulativeGradeService.currentData.subscribe((data) => {
      if (data) {
        this.data = data;
      }
    });
  }
}
