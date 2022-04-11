import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { first, map } from 'rxjs';
import { Comments } from 'xlsx';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  alertify: any;

  constructor(private commentservice:CommentService) { }

  commentForm!:FormGroup;

  ngOnInit(): void
  {
    this.commentForm=new FormGroup
    ({
      Comment:new FormControl('',Validators.required),
      username:new FormControl('')
    })
  }

  get username()
  {
    return this.commentForm.get('username');
  }
  get Comment()
  {
    return this.commentForm.get('Comment');
  }

  
  message:any;
  message_2:any;


  onComment()
  {
    if(this.commentForm.valid)
    {
      alert('comment submitted');
      console.log('Comments by User'+ this.Comment);
      this.onPostComment();
      this.message='Feedback submitted';
    }

    else if(this.commentForm.invalid)
    {
      alert('comment invalid');
      console.log('Comments by User'+ this.Comment);
      this.message_2='Incorrect Feedback format';
    }

  }

  onPostComment()
  {
    this.commentservice.postComment(this.commentForm.value).subscribe(
      (comments:Comments)=>
      {
        console.log('commented')
        this.commentForm.reset();
      },
      error=>
      { console.log(error);
        this.alertify.eror(error.error)
      }
    )
  }
    
}
    
    
    
  



