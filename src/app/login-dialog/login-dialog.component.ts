import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.less']
})
export class LoginDialogComponent implements OnInit {

  account: string = '';
  password: string = '';

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.account.length <= 0 || this.password.length <= 0) {
      this.snackBar.open('请输入账号和密码', '确定', {duration: 3000, verticalPosition: 'top'})
    } else {

    }
  }
}
