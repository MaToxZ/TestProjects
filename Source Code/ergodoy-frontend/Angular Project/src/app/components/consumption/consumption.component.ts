import { Component, OnInit, ViewChild } from '@angular/core';
import { CardConsumption } from '../../model/cardConsumption';
import { CardConsumptionService } from '../../service/rest/card-consumption.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../service/rest/customer.service';
import { Customer } from '../../model/customer';
import { BankCard } from '../../model/bankCard';
import { BankCardService } from '../../service/rest/bank-card.service';
import { CustomCurrencyPipe } from '../../util/customCurrencyPipe';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.css']
})
export class ConsumptionComponent implements OnInit {

  tableCols: any[];
  consumptions: CardConsumption[];
  consumptionForm: FormGroup;
  showing: string = 'none';
  consumptionSelected: CardConsumption;
  spanish: any;
  customers: Customer[];
  customerCards: BankCard[];
  customerSelected: Customer;
  formattedAmount: string ="";

  constructor(
    private cardConsumptionService: CardConsumptionService,
    private customerService: CustomerService,
    private bankCardService: BankCardService,
    private customCurrencyPipe: CustomCurrencyPipe,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.tableCols = [
      { field: "ccDate", header: "Fecha de Compra" },
      { field: "ccDescription", header: "Descripción" },
      { field: "ccAmount", header: "Monto" },
    ]
    this.findAllCustomers();
    this.initiliazeSpanishCalendar();
    this.findAllConsumptions();

  }

  /**
   * this method is called when the component is initialized. It does set up the calendar component to the
   * spanish calendar version .
   */
  initiliazeSpanishCalendar() {
    this.spanish = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mier", "Jue", "Vie", "Sab"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: 'Hoy',
      clear: 'Limpear',
      dateFormat: 'dd/mm/yyyy'
    };
  }

  /**
   * This method is called when the "Comprar" button is clicked. It create an Angular Reactive Form 
   * to capture the Consumption data. 
   */
  createConsumptionFormGroup() {
    this.showing = 'addConsumption';
    this.consumptionForm = this.formBuilder.group({
      ccDate: ['', Validators.required],
      ccDescription: ['', Validators.required],
      ccAmount: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      ccBankCardIdFk: ['', [Validators.required]],
      customer: ['', [Validators.required]]
    })
    this.consumptionForm.get("customer").valueChanges.subscribe((response) => {
      this.findAllCardsByCustomerId(response);
    })
  }

  /**
   * This method is called when the "amount" input lost focus. It used to set a value mask format and show
   * the value as Currency Format
   * @param element HTMLInputElement
   */
  transformAmount(element: HTMLInputElement) {
    this.formattedAmount = this.customCurrencyPipe.transform(this.consumptionForm.get("ccAmount").value);
    // Remove or comment this line if you dont want 
    // to show the formatted amount in the textbox.
    element.value = this.formattedAmount;
  }

  /**
   * This method use the customerService which send request to backend server
   * to retrieve all the customer in the system.
   */
  findAllCustomers() {
    this.spinner.show();
    this.customerService.findAll().subscribe((response) => {
      if (response && response.length > 0) {
        this.customers = response;
      }else{
        this.customers = [];
      }
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      console.log("Hubo un error en la consulta de clientes");
    })
  }

  /**
   * This method is called when the Customer select change its value. It will invoke the findByCustomerId methd
   * of the BankCardService. It will retrieve all the BankCards of the selected Customer.
   * @param customerId customer ID
   */
  findAllCardsByCustomerId(customerId: number) {
    this.spinner.show();
    this.bankCardService.findByCustomerId(customerId).subscribe((response) => {
      if (response && response.length > 0) {
        this.customerCards = response
      }else{
        this.customerCards = []
      }
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      console.log("Hubo un error en la consulta de clientes");
    })
  }

  /**
   * This method use the cardConsumptionService which send request to backend server
   * to retrieve all the consumptions in the system.
   */
  findAllConsumptions() {
    this.spinner.show();
    this.cardConsumptionService.findAll().subscribe((response) => {
      if (response && response.length > 0) {
        this.consumptions = response;
      }else{
        this.consumptions = []
      }
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      console.log("Hubo un error en la consulta");
    })
  }

  /**
   * This method is used to transform the Angular FormGroup object created in the Create/Edit Form to
   * capture the consumption data. 
   * @param object FormGroup Object
   * @returns cardConsumption Object
   */
  polymorphObject(object: any): CardConsumption {
    let newConsumption = new CardConsumption();
    newConsumption.ccDate = object.ccDate;
    newConsumption.ccDescription = object.ccDescription;
    newConsumption.ccAmount = parseFloat(object.ccAmount);
    if(typeof object.ccBankCardIdFk === 'string'){
      newConsumption.ccBankCardIdFk = this.customerCards[object.ccBankCardIdFk];
    }else{
      newConsumption.ccBankCardIdFk = object.ccBankCardIdFk;
    }
    if(object.ccIdPk){
      newConsumption.ccIdPk = object.ccIdPk;
    }
    this.formattedAmount = "";
    this.customerCards = [];
    return newConsumption;
  }

  /**
   * this method is called when the "Guardar" button located in the Create/Edit Form is 
   * clicked. Depending if the consumption is being Edited or if will be created, will
   * invoke the Create / Edit methods of the cardConsumptionService
   */
  onSubmit() {
    this.spinner.show();
    let formObject = Object.assign({}, this.consumptionForm.value);
    let newConsumption = this.polymorphObject(formObject);
    switch (this.showing) {
      case 'addConsumption': {
        this.cardConsumptionService.create(newConsumption).subscribe((response) => {
          if (response != 'false') {
            this.findAllConsumptions();
          }
          this.spinner.hide();
        }, (error) => {
          this.spinner.hide();
          console.log("Hubo un error en el guardado");
        })
      } break;
      case 'editConsumption': {
        this.cardConsumptionService.edit(newConsumption).subscribe((response) => {
          if (response != 'false') {
            this.findAllConsumptions();
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
   * This method is called when a Consumption is clicked in the Consumption List. It also will
   * show the customer and cards associated to this selected Consumption
   * @param consumption CardConsumption Object
   */
  selectConsumption(consumption: CardConsumption) {
    this.showing = "information";
    this.consumptionSelected = consumption;
  }

  /**
   * This method is called when the trash icon button is clicked. It will invoke the delete method
   * of cardConsumptionService to get this consumption out of the system.
   * @param consumption CardConsumption Object
   */
  deleteConsumption(consumption: CardConsumption) {
    if (consumption) {
      this.spinner.show();
      this.cardConsumptionService.delete(consumption).subscribe((response) => {
        if (response != 'false') {
          this.findAllConsumptions();
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
   * with the current consumption data to be edited.
   * @param consumption CardConsumption Object
   */
  editConsumption(consumption: CardConsumption) {
    this.showing = 'editConsumption';
    this.consumptionForm = this.formBuilder.group({
      ccIdPk: [consumption.ccIdPk],
      ccDate: [new Date(consumption.ccDate), Validators.required],
      ccDescription: [consumption.ccDescription, Validators.required],
      ccAmount: [consumption.ccAmount, [Validators.required, Validators.pattern("[0-9]+")]],
      ccBankCardIdFk: [consumption.ccBankCardIdFk, Validators.required],
      customer: ['asd', Validators.required]
    })
    this.formattedAmount = this.customCurrencyPipe.transform(consumption.ccAmount);
  }

}
