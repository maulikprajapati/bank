import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from 'src/app/models/branch';
import { BranchService } from '../branch.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {
  branchList: Branch[] = [];
  constructor(public router: Router, private branchService: BranchService
    , private _notify: NotificationService) { }

  ngOnInit() {
    this.branchService.getAllBranch().subscribe(data => {
      this.branchList = data;
    }, err => {
      this._notify.error(err.message);
    });
  }

  addBranch() {
    this.router.navigate(['/admin/branch/add']);
  }

  editBranch(id) {
    this.router.navigate([`/admin/branch/${id}`]);
  }
}
