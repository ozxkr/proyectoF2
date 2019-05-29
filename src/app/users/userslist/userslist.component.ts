import { Component, OnInit } from '@angular/core';
import { DaoService} from '../dao.service';


@Component({
  selector: 'userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
	public users = [];

  constructor(
  		private dao: DaoService
  	) { }

  ngOnInit() {
  	this.fetchUsers();

  }

  fetchUsers(){
  	//this.fetchPromise()
  	this.dao.getUsers().subscribe(userdata => {
  		this.users.push(userdata) ;
  		console.log('USERS [%s]',this.users.length);
  	})

  }

  fetchPromise(){
  	this.dao.getUsersPromise().then(userdata => {
  		console.log('UsersPromise [%s]',userdata['data'].length);
  	})

  }

}

interface User {
	id: string;
	nombre: string;
	apellido: string;
	avatar: string;
}


