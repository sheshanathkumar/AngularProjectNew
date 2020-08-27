import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers : string[] = [];
  nameVal : string;

  ngOnInit() {
  }

  clearText() : any{
    this.nameVal = "";
  }

  showText(text : string) {
    if (text.trim() != null && text.trim() != "")
      this.customers.push(text);
    this.clearText ();
  }

}
