import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddressUserService } from 'src/app/services/address-user.service';
import { AddAddressComponent } from '../add-address/add-address.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.css']
})
export class ChangeAddressComponent implements OnInit {
  tasks = [{
    completed: true
  },
  { completed: false }]
  address:any
  addressChangeId:any
  id:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog, private addressService:AddressUserService) { }

  ngOnInit(): void {
     this.getData()
  }
  updateAddress(data:any)
  {
    
    const dialogRef=this.dialog.open(UpdateAddressComponent, {
      width: '80%',
      height: '370px,',
      data:data
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.getData()
     
    })

    

  }
  changeAddress()
  {
     this.addressService.editAddressDefault({id:this.addressChangeId}).subscribe(res=>
      {
        this.dialog.closeAll()
        
      })
  }
  showOptions($event:any)
  {
     
    for(let i=0;i<this.address.length;i++)
      {
        if(this.address[i].isChecked==true && $event.source.id==i )
        {
          
          
          this.address[i].isChecked=false
        } 
        if(this.address[i].isChecked==true && $event.source.id!=i )
        {
           this.address[i].isChecked=false
          this.address[parseInt( $event.source.id)].isChecked=true
          this.addressChangeId=this.address[parseInt( $event.source.id)].id
          break
        } 
      }
  }
   
  getData()
  {
    this.addressService.getAllAddressUser(localStorage.getItem("userId")).subscribe(res=>{
       this.address=res
      this.address=this.address.data
      for(let i=0;i<this.address.length;i++)
      {
        if(this.address[i].id==this.data.id) 
        {
          this.address[i].isChecked=true
          this.addressChangeId=this.address[i].id
        }
        else this.address[i].isChecked=false
      }
    })
  }
  addAddress()
  {
    
   const dialogRef= this.dialog.open(AddAddressComponent, {
    width: '80%',
    height: '370px'

      
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.getData()
     
    })
  }

  

}
