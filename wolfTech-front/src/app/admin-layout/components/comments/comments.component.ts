import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from 'src/app/core/models/comment';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  commentForm: FormGroup;
  submitted = false;
  error: string = ''
  comments: Comment[]= [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      TextC: ['', Validators.required]
    }),
    this.afficherComments()//afficher comments
  }
  
  afficherComments() {
    this.commentService.afficherComments(2).subscribe((response: any) => {
      response.map(comment => {
        comment = new Comment(comment)
        this.comments.push(comment)
    
    })
    console.log(this.comments);
  })
}

  get f() { return this.commentForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = ''

    if (this.commentForm.invalid) {
      return;
    }

    this.commentService.createComment(this.commentForm.value).subscribe((response: any) => {
    }, (error: any) => {
      this.error = error.error
    })
    this.commentForm.reset()
    this.submitted = false;
  }
  
  }
