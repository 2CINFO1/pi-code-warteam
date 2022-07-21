import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demande } from 'src/app/core/models/demande';
import { DemandeService } from 'src/app/core/services/demande.service';

@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.css']
})
export class AddDemandeComponent implements OnInit {

  demandeForm: FormGroup;
  submitted = false;
  public formData = new FormData();
  demandes: Demande[] = []

  createEventBlock = false;

  constructor(
    private formBuilder: FormBuilder,
    private demandeService: DemandeService
  ) { }

  ngOnInit(): void {
    this.readDemandeByUser()
    this.demandeForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      filename: ['']
    })
  }

  get f() { return this.demandeForm.controls; }

  createDemande () {
    this.submitted = true;

    if (this.demandeForm.invalid) {
        return;
    }

    this.formData.append('title', this.demandeForm.value.title)
    this.formData.append('description', this.demandeForm.value.description)

    this.demandeService.createDemande(this.formData).subscribe((response: any) => {
      this.submitted = false;
      this.demandeForm.reset({})
    })
  }

  uploadFiles( file ) {
    console.log( 'file', file )
    for ( let i = 0; i < file.length; i++ ) {
        this.formData.append( "file", file[i], file[i]['name'] );
    }
  }

  readDemandeByUser () {
    this.demandeService.readDemandesByUser().subscribe((response: any) => {
      response.map( demande => {
        demande = new Demande(demande)
        this.demandes.push(demande)
      })
    })    
  }

  deleteDemande (demande) {
    this.demandeService.deleteDemande(demande.id).subscribe((response: any) => {
      this.readDemandeByUser()
    })
  }
}
