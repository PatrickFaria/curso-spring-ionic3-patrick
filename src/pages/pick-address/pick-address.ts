import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[]
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localuser = this.storage.getLocalUser()
    if(localuser && localuser.email){
      this.clienteService.findByEmail(localuser.email).subscribe(response => {
        this.items = response['enderecos']
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

}
