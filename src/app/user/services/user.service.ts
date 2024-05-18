import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../interface/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  /**
   * Get users list
   * @return {*}  {Observable<User[]>}
   * @memberof UserService
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'users');
  }

  /**
   *
   * Save user
   * @param {User} user
   * @return {*}  {Observable<User>}
   * @memberof UserService
   */
  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'users', {
      ...user,
      id: Math.floor(Math.random() * 100),
    });
  }

  /**
   *
   * Get user by id
   * @param {number} id
   * @return {*}  {Observable<User>}
   * @memberof UserService
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + `users/${id}`);
  }

  /**
   *
   *Update user
   * @param {User} user
   * @return {*}  {Observable<User>}
   * @memberof UserService
   */
  updateUser(user: User, id: number): Observable<User> {
    return this.http.put<User>(this.apiUrl + `users/${id}`, user);
  }

  /**
   *
   * Delete user
   * @param {number} id
   * @return {*}  {Observable<User>}
   * @memberof UserService
   */
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.apiUrl + `users/${id}`);
  }
}
