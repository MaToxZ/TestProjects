import { Component, OnInit } from '@angular/core';
import { Adviser } from '../../model/adviser';
import { AdviserService } from '../../service/rest/adviser.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css']
})
export class AdviserComponent implements OnInit {

  tableCols: any[];
  advisers: Adviser[];
  showing: string = "none";
  adviserForm: FormGroup;
  constructor(
    private adviserService: AdviserService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.tableCols = [
      { field: "aName", header: "Nombre" },
      { field: "aSpecialty", header: "Especialidad" },
    ]
    this.findAllAdviser();
  }

  /**
   * This method use the adviserService which send request to backend server
   * to retrieve all the adviser in the system.
   */
  findAllAdviser() {
    this.spinner.show();
    this.adviserService.findAll().subscribe((response) => {
      if (response && response.length > 0) {
        this.advisers = response;
      } else {
        this.advisers = []
      }
      this.spinner.hide();
    }, (err) => {
      this.spinner.hide();
      console.log("Hubo un error en la consulta");
    })
  }

  /**
   * This method is called when the "Agregar" button is clicked. It create an Angular Reactive Form 
   * to capture the Adviser data.
   */
  createAdviserFormGroup() {
    this.showing = 'addAdviser';
    this.adviserForm = this.formBuilder.group({
      aName: ['', [Validators.required]],
      aSpecialty: ['', [Validators.required]],
    })
  }

  /**
   * this method is called when the "Guardar" button located in the Create/Edit Form is 
   * clicked. Depending if the adviser is being Edited or if will be created, will
   * invoke the Create / Edit methods of the adviserService
   */
  onSubmit() {
    this.spinner.show();
    let newAdviser = Object.assign({}, this.adviserForm.value);
    switch (this.showing) {
      case 'addAdviser': {
        this.adviserService.create(newAdviser).subscribe((response) => {
          if (response != 'false') {
            this.findAllAdviser();
          }
          this.spinner.hide();
        }, (error) => {
          this.spinner.hide();
          console.log("Hubo un error en el guardado");
        })
      } break;
      case 'editAdviser': {
        this.adviserService.edit(newAdviser).subscribe((response) => {
          if (response != 'false') {
            this.findAllAdviser();
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
   * of adviserService to get this adviser out of the system.
   * @param adviser Adviser Object
   */
  deleteAdviser(adviser: Adviser) {
    if (adviser) {
      this.spinner.show();
      this.adviserService.delete(adviser).subscribe((response) => {
        if (response != 'false') {
          this.findAllAdviser();
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
   * with the current adviser data to be edited.
   * @param adviser Adviser Object
   */
  editAdviser(adviser: Adviser) {
    this.showing = 'editAdviser';
    this.adviserForm = this.formBuilder.group({
      aIdPk: [adviser.aIdPk, Validators.required],
      aName: [adviser.aName, [Validators.required]],
      aSpecialty: [adviser.aSpecialty, [Validators.required]]
    })
  }

}
