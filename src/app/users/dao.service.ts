import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// esta anotación hace que dao.service 
// sea gestionado por el root-injector.
// Será un SINGLETON visible por todos los componentes de la app
@Injectable({
  providedIn: 'root'
})
export class DaoService {

	private url= 'https://reqres.in/api/users?page=1&per_page=10'
  
  constructor(
	  	// inyección de dependencias: http es un servicio
	  	// provisto HttpClientModule, definido en el root-module
	  	private http: HttpClient
  	) { }

  getUsers():Observable<User>{
  	/****
  	*  this.http.get(url) devuelve un Observable,
  	*  pero antes de retornarlo lo hacemos pasar por
  	*  una tubería (pipe) que lo transformará 
  	*  para finalmente devolver un Observable<User> 
  	*  (véase interface User al pie)
  	*  El operador switchMap recibe un Observable y 
  	*    devuelve un nuevo Observable. El nuevo Observable
  	*    lo produce el operador from(), que toma como input
  	*    un Array y lo devuelve como un stream elemento por elemento.
  	*    
  	*  El operador 'map' produce la transformación.
  	*  Toma como input el objeto user devuelto por la API,
  	*  y lo transforma en un nuevo objeto que responda a la interfaz User
  	****/
  	return this.http.get(this.url).pipe(
  			switchMap(res => from(res['data'] as Array<any>)),
  			map(x => {
	  					let u = {
	  						id: x['id'],
	  						nombre: x['first_name'],
	  						apellido: x['last_name'],
	  						avatar: x['avatar'],
	  					};
  				return u})
  	);

  }

  getUsersPromise(){
  	return this.http.get(this.url)
	  	.toPromise()
	  	.catch(error => {});
  }

}
interface UserDao {
	data: Array<User>;
}

interface User {
	id: string;
	nombre: string;
	apellido: string;
	avatar: string;
}





/*
		VARIANTE DE RESOLUCIÓN:

  	return this.http.get(this.url).pipe(
  		//switchMap(res => res['data'])
  		map( t => {
  				let x = t['data'].map(udao =>{ 
  					 	return {
	  						id: udao.id,
	  						nombre: udao.first_name,
	  						apellido: udao.last_name,
	  						avatar: udao.avatar,
	  						} as User
  					})
  				return x
  			})//end map
  		); // end pipe



*/


/*
		VARIANTE DE RESOLUCIÓN
		
  	return this.http.get(this.url).pipe(
  		switchMap(res => res['data']),
  		map( t => {
  				let x = t.map(udao =>{ 
  					 	return {
	  						id: udao.id,
	  						nombre: udao.first_name,
	  						apellido: udao.last_name,
	  						avatar: udao.avatar,
	  						} as User
  					})
  				return x
  			})//end map
  		); // end pipe



*/
