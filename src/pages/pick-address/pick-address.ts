import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[]
  
  pedido: PedidoDTO

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localuser = this.storage.getLocalUser()
    if(localuser && localuser.email){
      this.clienteService.findByEmail(localuser.email).subscribe(response => {
        this.items = response['enderecos']

        let cart = this.cartService.getCart()

        this.pedido = {
          cliente: {id: response['id']},
          enderecoDeEntrega: null,
          pagamento: null,
          itens: cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
        }
      },
      error => {
        if(error.status){
          this.navCtrl.setRoot('HomePage')
        }
      });
    }else{
      this.navCtrl.setRoot('HomePage')
    }
  }

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: item.id}
    this.navCtrl.push('PaymentPage', {pedido: this.pedido})
  }

}
