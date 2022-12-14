import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiUrl=environment.apiUrl+"/User"
  @Output() avatar = new EventEmitter();
  constructor( private http: HttpClient ,) { }
  forgotPass(email:any)
  {
    return this.http.post(this.apiUrl+"/forgot-password", email)
  }
  registerUser(data:any)
  {
    return this.http.post(this.apiUrl+"/register-user", data)
  }
  verifyEmail(email:any)
  {
    return this.http.put(this.apiUrl+"/verify-email", email)
  }
  getUserById(id:any)
  {
    return this.http.get(this.apiUrl+ "/get-user-by-id/"+ id)
  }
  editUser(data:any)
  {
    return this.http.put(this.apiUrl+ "/edit-profile-user", data)
  }
  editAvatarUser(data:any)
  {

    return this.http.put(this.apiUrl+ "/edit-avatar-user", data).subscribe(res=>{
      this.avatar.emit(data.avatar)
    })
  }
  changePass(data:any)
  {
    return this.http.put(this.apiUrl+ "/change-password", data)
  }
  sendEmail(data)
  {
    return this.http.post(this.apiUrl+"/cskh", data)
  }
}
