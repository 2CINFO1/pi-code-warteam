import { Component, OnInit } from '@angular/core';
import { Demande } from 'src/app/core/models/demande';
import { DemandeService } from 'src/app/core/services/demande.service';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {

  demandes: Demande[] = []

  constructor(
    private demandeService: DemandeService
  ) { }

  ngOnInit(): void {
    this.readStatsDemande()
    this.readDemandes()
  }

  readStatsDemande () {
    this.demandeService.statsDemande().subscribe((response: any) => {
      console.log(response);
      
    })
  }

  readDemandes () {
    this.demandeService.readDemandes().subscribe((response: any) => {
      response.map( demande => {
        demande = new Demande(demande)
        this.demandes.push(demande)
      })
    })
  }

}
