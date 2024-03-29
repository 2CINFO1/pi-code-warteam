import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Demande } from 'src/app/core/models/demande';
import { DemandeService } from 'src/app/core/services/demande.service';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {

  demandes: Demande[] = []
  public stats: any;

  constructor(
    private demandeService: DemandeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.readStatsDemande()
    this.readDemandes()
  }

  readStatsDemande () {
    this.demandeService.statsDemande().subscribe((response: any) => {
      this.stats = response.demande
    })
  }

  readDemandes () {
    this.demandeService.readDemandes({}).subscribe((response: any) => {
      response.map( demande => {
        demande = new Demande(demande)
        this.demandes.push(demande)
      })
    })
  }

  navigateToDemandeDetails(demandeId) {
    this.router.navigate(['demande-details', demandeId])
  }

  changeActionDemande(demande, status) {
    this.demandeService.changeAction(demande.id, {status}).subscribe((response: any) => {
      this.demandes = []
      this.readDemandes()
      this.readStatsDemande()
    })
  }
}
