import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { note } from './static_note';
import { NotePreviewComponent } from '../../Features/note-preview/note-preview.component';
import { NoteData, NotesService } from '../../Features/my-space/notes.service';
import { GlobalStateService } from '../../global-state.service';
import { LoaderComponent } from '../../Features/loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-note',
  standalone: true,
  imports: [FormsModule, CommonModule, NotePreviewComponent, LoaderComponent],
  templateUrl: './shared-note.component.html',
  styleUrl: './shared-note.component.css'
})
export class SharedNoteComponent implements OnInit{

  sharedNotes :NoteData[]= [];
  selectedNote:any =null ;
commentInputs: { [key: string]: string } = {};
// commentInputs = []
   
  // ownerName: string = 'Owner Name';
  currentDate: Date = new Date();
  showNotePreview: boolean = false;
  isLiked: boolean = false;
  likeCount: number = 0;
  newComment: string = '';
  noteContent: Array<NoteData>=[];
  isSharedMode = true
  isLoading = true;
  constructor(private noteService: NotesService, private globalStateService: GlobalStateService, private router: Router){

  }
  ngOnInit(): void {
      // this.noteContent = note
      this.noteService.getSharedNotes().subscribe({
        next: (data)=>{
          this.sharedNotes = data;
          this.isLoading = false
          console.log(`Shared Notses`, this.sharedNotes)
        },
        error: (err)=>{
          if(err.status == 401){
            this.isLoading=false
            this.router.navigate(['/login'])
          }
          console.error(err)
        }
      })
      
  }
  

  getFirstLetter(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '';
  }

  openNotePreview(note:any) {
    console.log("in open preview", note)
    this.showNotePreview = true;
    this.selectedNote = note
  }

  closeNotePreview(event?: Event) {
    if (event && (event.target as HTMLElement).classList.contains('popup-overlay')) {
      this.showNotePreview = false;
      this.selectedNote = null;
    } else if (!event) {
      this.showNotePreview = false;
      this.selectedNote = null;
    }
  }

  likePost() {
    this.isLiked = !this.isLiked;
    this.likeCount += this.isLiked ? 1 : -1;
  }

  addComment(note:any) {
    // if (this.newComment.trim()) {
    //   this.note.comments.push({
    //     user: 'Current User',
    //     text: this.newComment,
    //     date: new Date()
    //   });
    //   this.newComment = '';
    // }
    console.log(note)
    note.comments.push({
      user: this.globalStateService.getState().name,
      message: this.commentInputs[note.noteId]
    });
    
    this.noteService.postComment(note.noteId,this.commentInputs[note.noteId]).subscribe({
      next: ()=>{
        this.commentInputs[note.noteId] =""
        alert('Comment Posted')
      },
      error: (err)=>{
        console.error(err)
      }
    })
  }
}
