import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { OrderItemDTO, Orderspageservice } from '../../services/orderpageservice/orderspageservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orderscomp',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './orderscomp.html',
  styleUrl: './orderscomp.css'
})
export class Orderscomp {
  
  orderItems: any[] = [];
   constructor(private route: ActivatedRoute,private orderservice:Orderspageservice,private cd: ChangeDetectorRef,private router:Router) {}

  ngOnInit(): void {
    console.log('Resolved orders items:');
    this.orderItems = this.route.snapshot.data['orderItems'];
    console.log('order items',this.orderItems);

  }
getStep(status: string): number {

  switch ((status || '').toLowerCase()) {
    case 'order placed':
    case 'placed':console.log(status)
      return 1;
    case 'out for delivery':
      return 2;
    case 'delivered':
      return 3;
    default:
      return 0;
  }
}


//   ngOnInit() {
//   console.log('Resolved order items:');
//   this.orders = [
//     {
//       id: 'OD001',
//       item: 'Apple iPhone 15',
//       status: 'Delivered',
//       step: 3
//     },
//     {
//       id: 'OD002',
//       item: 'Noise Smartwatch',
//       status: 'Out for Delivery',
//       step: 2
//     },
//     {
//       id: 'OD003',
//       item: 'Boat Earbuds',
//       status: 'Order Placed',
//       step: 1
//     }
//   ];

  
// }
   

}
