import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Comment } from 'src/app/core/models/comment';
import { Demande } from 'src/app/core/models/demande';
import { CommentService } from 'src/app/core/services/comment.service';
import { DemandeService } from 'src/app/core/services/demande.service';

@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.css']
})
export class DemandeDetailsComponent implements OnInit {

  demande: Demande;
  demandeId = this.activatedRoute.snapshot.paramMap.get('id');
  commentForm: FormGroup
  submitted = false;
  comments: Comment[] = []
  closeResult = ''
  comment: Comment
  responses: any[] = []

  // responses: 
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private demandeService: DemandeService,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.demandeDetails(this.demandeId)
    this.readCommentsDemande()
    this.commentForm = this.formBuilder.group({
      textC: ['', Validators.required]
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  demandeDetails (demandeId) {
    this.demandeService.readDemande(demandeId).subscribe((response: any) => {
      this.demande = new Demande(response)
    })
  }

  readCommentsDemande () {
    this.commentService.afficherComments(this.demandeId).subscribe((response: any) => {
      response.map(comment => {
        comment = new Comment(comment)
        this.comments.push(comment)
      })
    })
  }

  get f() { return this.commentForm.controls; }

  createComment () {
    this.submitted = true;

    if (this.commentForm.invalid) {
        return;
    }

    let body = {
      TextC: this.commentForm.value.textC,
      demande: this.demandeId
    } 

    this.commentService.createComment(body).subscribe((response: any) => {
      this.comments.unshift(new Comment(response))
    })
  }

  saveComment (comment) {
    this.comment = comment
    this.readReponses()
  }

  readReponses () {
    this.commentService.readResponsesByComment(this.comment.id).subscribe((response: any) => {
     this.responses = response
    })
  }

  responseComment () {
    let body = {
      textR: this.commentForm.value.textC,
      commentaire: this.comment.id
    }

    this.commentService.createReponseComment(body).subscribe((response: any) => {
      this.responses.unshift(response)
    })
    
  }
}
