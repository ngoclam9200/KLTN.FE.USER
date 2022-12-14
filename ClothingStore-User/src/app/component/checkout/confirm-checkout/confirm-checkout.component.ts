import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { SigninService } from 'src/app/services/signin.service';
import Swal from 'sweetalert2';
import { CheckoutComponent } from '../checkout.component';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrls: ['./confirm-checkout.component.css']
})
export class ConfirmCheckoutComponent implements OnInit {

  constructor(private orderService: OrderService, private route: ActivatedRoute, private cartService: CartService, private router: Router, private signInService: SigninService) { }
  isPaymentSuccess: boolean = false

  ngOnInit(): void {


    if (localStorage.getItem("transaction") == "vnpay") {
      this.isPaymentSuccess = true
      this.route.queryParams.subscribe(params => {
        let orderInfo = params['vnp_OrderInfo'];
        orderInfo = orderInfo.split(":")
        let orderId = orderInfo[1]
        let data = {
          id: orderId
        }
        this.orderService.checkoutVnPay(data).subscribe(res => {

          this.signInService.getCountProductInCart()
          Swal.fire({
            title: 'Thanh toán thành công',
            text: "",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }) 
        })

      })
      localStorage.removeItem("dataPayment")
      localStorage.removeItem("transaction")
    }
    else {
      var data: any = localStorage.getItem("dataPayment")
      if (data == null)
        this.isPaymentSuccess = true
      else {
        this.checkoutPayPal()
      }
    }



  }
  checkoutPayPal() {
    this.route.queryParams.subscribe(params => {
      let paymentId = params['paymentId'];
      let PayerID = params['PayerID'];
      var data: any = localStorage.getItem("dataPayment")
      data = JSON.parse(data)
      data.paymentId = paymentId
      data.payerID = PayerID


      this.orderService.checkoutPaypal(data)
        .subscribe(res => {
          this.isPaymentSuccess = true

          localStorage.removeItem("dataPayment")
          this.signInService.getCountProductInCart()
          Swal.fire({
            title: 'Thanh toán thành công',
            text: "",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }) 

        })
    });
  }
  checkOrder() {
    this.router.navigate(['/orders/wait-confirm'])
  }
  continueBuy() {
    this.router.navigate(['/products'])
  }
}
