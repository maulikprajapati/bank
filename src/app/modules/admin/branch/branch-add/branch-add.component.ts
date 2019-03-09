import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/models/branch';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../branch.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrls: ['./branch-add.component.css']
})
export class BranchAddComponent implements OnInit {
  branch: Branch = new Branch();
  isNew = true;
  branchId = undefined;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private branchService: BranchService,
    private _notify: NotificationService) {
    activatedRoute.params.subscribe(x => {
      if (x['id'] !== 'add') {
        this.isNew = false;
        this.branchId = x['id'];
      }
    });
  }

  ngOnInit() {
    if (!this.isNew) {
      this.branchService.getBranchById(this.branchId).subscribe(data => {
        if (data) {
          this.branch = data;
        } else {
          this._notify.error('Branch not found!');
        }
      }, error => {
        this._notify.error(error.message || error.statusText);
      });
    }
  }
  save() {
    this.branchService.addUpdateBranch(this.isNew, this.branch)
      .subscribe(data => {
        this._notify.success(`branch ${this.isNew ? 'added' : 'updated'} successfully`);
        this.router.navigate(['/admin/branch/list']);
      }, error => {
        this._notify.error(`branch could not ${this.isNew ? 'add' : 'update'} successfully`);
      });
  }
  onCancelClick() { }
}
