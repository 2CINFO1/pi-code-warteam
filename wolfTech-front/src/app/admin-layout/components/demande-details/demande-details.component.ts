import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from 'src/app/core/models/demande';
import { DemandeService } from 'src/app/core/services/demande.service';

@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.css']
})
export class DemandeDetailsComponent implements OnInit {

  demande: Demande;
  demandeId = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private demandeService: DemandeService
  ) { }

  ngOnInit(): void {
    this.demandeDetails(this.demandeId)
  }

  demandeDetails (demandeId) {
    this.demandeService.readDemande(demandeId).subscribe((response: any) => {
      this.demande = new Demande(response)
      console.log(this.demande);
      
    })
  }
}
