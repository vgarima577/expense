import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userName = "Garima Verma";
  public userEmail = "garima@gmail.com"
  constructor() { }

  ngOnInit() {
  }

}
