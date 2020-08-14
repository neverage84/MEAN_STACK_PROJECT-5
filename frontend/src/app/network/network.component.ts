import { Component, OnInit } from '@angular/core';
import { IssueService} from '../issue.service';
@Component({
  selector: 'network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.issueService.getIssues().subscribe((issue) => {
      console.log(issue);
    })
  }

}
