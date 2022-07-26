import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Comment } from 'src/app/core/models/comment';
import { Demande } from 'src/app/core/models/demande';
import { User } from 'src/app/core/models/user';
import { CommentService } from 'src/app/core/services/comment.service';
import { DemandeService } from 'src/app/core/services/demande.service';

@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.css']
})
export class DemandeDetailsComponent implements OnInit {

  demande: Demande;
  comment: Comment
  demandeId = this.activatedRoute.snapshot.paramMap.get('id');
  commentForm: FormGroup
  updateCommentForm: FormGroup
  submitted = false;
  comments: Comment[] = []
  closeResult = ''
  responses: any[] = []
  badWords = false;
  userId = localStorage.getItem('userId')

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
    this.updateCommentForm = this.formBuilder.group({
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
    this.badWords = false
    this.submitted = true;

    if (this.commentForm.invalid) {
        return;
    }

    let body = {  
      TextC: this.commentForm.value.textC,
      demande: this.demandeId
    } 

    this.commentService.createComment(body).subscribe((response: any) => {
      this.comments.push(new Comment(response))
      this.submitted = false;
      this.commentForm.reset()
    }, err => {
      this.submitted = false;
      this.commentForm.reset()
      this.badWords = true
    })
  }

  saveComment (comment) {
    this.comment = comment
    this.readReponses()
  }

  _updateComment (comment: Comment) {
    this.comment  = comment
    this.updateCommentForm.patchValue({
      textC: this.comment.textC
    })
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
      this.commentForm.reset()
    })
    
  }

  openDeleteCommentModal (comment ) {
    this.comment = comment
    this.open('deleteCommentModal')
  }

  deleteComment (comment: Comment) {
    this.commentService.deleteComment(comment.id).subscribe((response: any) => {
      this.modalService.dismissAll()
      this.comments = []
      this.readCommentsDemande()
    })
  }

  updateComment () {    
    this.comment.textC = this.updateCommentForm.value.textC
    this.commentService.updateComment(this.comment.id, this.comment).subscribe((response: any) => {
      this.modalService.dismissAll()
    })
  }

  existUser (comment: Comment ) {
    let userExist = comment.likes.find((user : User)  => user.id == this.userId)
    return userExist ? true : false
  }

  reactionComment (comment: Comment) {
    if (this.existUser(comment)) {
      this.commentService.createReactionDislike(comment.id).subscribe((response: any)  => {
        this.comments = []
        comment = new Comment(response)
        this.readCommentsDemande()
      })
    } else {
      this.commentService.createReactionLike(comment.id).subscribe((response: any)  => {
        this.comments = []
        comment = new Comment(response)
        this.readCommentsDemande()
      })
    }
  }
}
