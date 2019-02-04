import { Component, OnInit } from '@angular/core';
import { Customer } from '../../model/customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../service/rest/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  tableCols: any[];
  customers: Customer[];
  customerForm: FormGroup;
  showing: string = "none";
  customerSelected: Customer;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.tableCols = [
      { field: "cName", header: "Nombre" },
      { field: "cAddress", header: "Dirección" },
      { field: "cCity", header: "Ciudad" },
      { field: "cPhone", header: "Telefono" },
    ]
    this.customers = new Array<Customer>();
    this.findAllCustomers();
  }

  /**
   * This method is called when the "Agregar" button is clicked. It create an Angular Reactive Form 
   * to capture the Customer data. 
   */
  createCustomerFormGroup() {
    this.showing = 'addCustomer';
    this.customerForm = this.formBuilder.group({
      cName: ['', Validators.required],
      cAddress: ['', Validators.required],
      cCity: ['', Validators.required],
      cPhone: ['', [Validators.required,Validators.pattern("[0-9]+")]]
    })
  }

  /**
   * This method use the customerService which send request to backend server
   * to retrieve all the customer in the system.
   */
  findAllCustomers(){
    this.customerService.findAll().subscribe((response) => {
      if(response && response.length > 0){
        this.customers = response;
      }else{
        this.customers = [];
      }
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      console.log("Hubo un error en la consulta");
    })
  }

  /**
   * this method is called when the "Guardar" button located in the Create/Edit Form is 
   * clicked. Depending if the customer is being Edited or if will be created, will
   * invoke the Create / Edit methods of the CustomerService
   */
  onSubmit(){
    this.spinner.show();
    let newCustomer = Object.assign({}, this.customerForm.value);
    switch (this.showing) {
      case 'addCustomer':{
        this.customerService.create(newCustomer).subscribe((response) => {
          if(response != 'false'){
            this.findAllCustomers();
          }
          this.spinner.hide();
        }, (error) => {
          this.spinner.hide();
          console.log("Hubo un error en el guardado");
        })
      }break;
      case 'editCustomer':{
        this.customerService.edit(newCustomer).subscribe((response) => {
          if(response != 'false'){
            this.findAllCustomers();
          }
          this.spinner.hide();
        }, (error) => {
          this.spinner.hide();
          console.log("Hubo un error en el guardado");
        })
      }break;
    }
    this.showing = 'none';
  }

  /**
   * This method is called when a Customer is clicked in the Customer List. It also will
   * show the cards associated to this selected customer
   * @param customer Customer Object
   */
  selectCustomer(customer: Customer){
    this.showing = "cards";
    this.customerSelected = customer;
  }

  /**
   * This method is called when the trash icon button is clicked. It will invoke the delete method
   * of CustomerService to get this customer out of the system.
   * @param customer Customer Object
   */
  deleteCustomer(customer: Customer){
    if(customer){
      this.spinner.show();
      this.customerService.delete(customer).subscribe((response) => {
        if(response != 'false'){
          this.findAllCustomers();
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
   * with the current customer data to be edited.
   * @param customer Customer Object
   */
  editCustomer(customer: Customer){
    this.showing = 'editCustomer';
    this.customerForm = this.formBuilder.group({
      cIdPk: [customer.cIdPk, Validators.required],
      cName: [customer.cName, Validators.required],
      cAddress: [customer.cAddress, Validators.required],
      cCity: [customer.cCity, Validators.required],
      cPhone: [customer.cPhone, [Validators.required,Validators.pattern("[0-9]+")]]
    })
    
  }
}
