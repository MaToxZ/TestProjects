import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { BankCard } from '../../model/bankCard';
import { Customer } from '../../model/customer';
import { BankCardService } from '../../service/rest/bank-card.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() customer: Customer;
  tableCols: any[];
  customerCards: BankCard[];
  cardForm: FormGroup;
  showing: string = 'none';

  constructor(
    private bankCardService: BankCardService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.tableCols = [
      { field: "bcNumber", header: "Numero de Tarjeta" },
    ]
  }

  /**
   * This method is called every time the customer input got a change. It will validate the current value 
   * of the customer variable, if It's != null will refresh the cards by customer list.
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.customer.currentValue != null) {
      this.findCardByCustomersId();
    }
  }

  /**
   * This method is called when the "Agregar" button is clicked. It create an Angular Reactive Form 
   * to capture the card data. 
   */
  createCardFormGroup() {
    this.showing = 'addCard';
    this.cardForm = this.formBuilder.group({
      bcNumber1: ['', [Validators.required, Validators.minLength(4), Validators.pattern("[0-9]+")]],
      bcNumber2: ['', [Validators.required, Validators.minLength(4), Validators.pattern("[0-9]+")]],
      bcNumber3: ['', [Validators.required, Validators.minLength(4), Validators.pattern("[0-9]+")]],
      bcNumber4: ['', [Validators.required, Validators.minLength(4), Validators.pattern("[0-9]+")]],
      bcCcv: ['', [Validators.required, Validators.minLength(3), Validators.pattern("[0-9]+")]],
      bcType: ['', Validators.required],
    })
  }

  /**
   * this method is called when customer input has changed. It invoke the findByCustomerId method of
   * bankCardService to retrieve all BankCards associated to the current customer.
   */
  findCardByCustomersId() {
    this.spinner.show();
    this.bankCardService.findByCustomerId(this.customer.cIdPk).subscribe((response) => {
      if (response && response.length > 0) {
        this.customerCards = response;
      } else {
        this.customerCards = [];
      }
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      console.log("Hubo un error en la consulta de tarjetas");
    })
  }

  /**
   * This methods is used to transform the Angular formGroup object created in the Create / Edit form 
   * into an BankCard object, to capture the BankCard data
   * @param formObject FormGroup Object
   * @returns BankCard Object
   */
  polyformObject(formObject: any): BankCard {
    let newCard = new BankCard();
    if (formObject.bcIdPk) {
      newCard.bcIdPk = formObject.bcIdPk
    }
    newCard.bcNumber = `${formObject.bcNumber1} ${formObject.bcNumber2} ${formObject.bcNumber3} ${formObject.bcNumber4}`;
    newCard.bcCcv = formObject.bcCcv;
    newCard.bcType = formObject.bcType;
    newCard.bcCustomerIdFk = this.customer;
    return newCard;
  }

  /**
   * this method is called when the "Guardar" button located in the Create/Edit Form is 
   * clicked. Depending if the bankCard is being Edited or if will be created, will
   * invoke the Create / Edit methods of the bankCardService
   */
  onSubmit() {
    this.spinner.show();
    let newCardObject = Object.assign({}, this.cardForm.value);
    let newCard = this.polyformObject(newCardObject);
    switch (this.showing) {
      case 'addCard': {
        this.bankCardService.create(newCard).subscribe((response) => {
          if (response != 'false') {
            this.findCardByCustomersId();
          }
          this.spinner.hide();
        }, (error) => {
          this.spinner.hide();
          console.log("Hubo un error en el guardado");
        })
      } break;
      case 'editCard': {
        this.bankCardService.edit(newCard).subscribe((response) => {
          if (response != 'false') {
            this.findCardByCustomersId();
          }
          this.spinner.hide();
        }, (error) => {
          this.spinner.hide();
          console.log("Hubo un error en el guardado");
        })
      } break;
    }
    this.showing = 'none';
  }

  /**
   * This method is called when the trash icon button is clicked. It will invoke the delete method
   * of bankCardService to get this bankCard out of the system.
   * @param card BankCard Object
   */
  deleteCard(card: BankCard) {
    if (card) {
      this.spinner.show();
      this.bankCardService.delete(card).subscribe((response) => {
        if (response != 'false') {
          this.findCardByCustomersId();
          this.showing = 'none';
        }
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        console.log("Hubo un error en el guardado");
      })
    }
  }

  /**
   * This method is called when the pen icon button is clicked. It will create an Angular Reactive Form
   * with the current bankCard data to be edited.
   * @param card BankCard Object
   */
  editCard(card: BankCard) {
    this.showing = 'editCard';
    let splitedNumber = card.bcNumber.split(" ");
    this.cardForm = this.formBuilder.group({
      bcIdPk: [card.bcIdPk, Validators.required],
      bcNumber1: [splitedNumber[0], [Validators.required, Validators.minLength(4), Validators.pattern("[0-9]+")]],
      bcNumber2: [splitedNumber[1], [Validators.required, Validators.minLength(4), Validators.pattern("[0-9]+")]],
      bcNumber3: [splitedNumber[2], [Validators.required, Validators.minLength(4), Validators.pattern("[0-9]+")]],
      bcNumber4: [splitedNumber[3], [Validators.required, Validators.minLength(4), Validators.pattern("[0-9]+")]],
      bcCcv: [card.bcCcv, [Validators.required, Validators.minLength(3), Validators.pattern("[0-9]+")]],
      bcType: [card.bcType, Validators.required],
    })

  }

}
