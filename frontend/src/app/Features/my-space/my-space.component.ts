import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MyEditorComponent } from '../my-editor/my-editor.component';
import { NotePreviewComponent } from '../note-preview/note-preview.component';
import { OutputBlockData } from '@editorjs/editorjs';
import { NoteData, NotesService } from './notes.service';



@Component({
  selector: 'app-my-space',
  standalone: true,
  imports: [CommonModule, MyEditorComponent, NotePreviewComponent],
  templateUrl: './my-space.component.html',
  styleUrl: './my-space.component.css'
})
export class MySpaceComponent implements OnInit {
  files: Array<NoteData> = [];
  title: string = ''
  isCreateNoteVisible  = true;
  isPreviewVisible = false;
  receivedData: any;
  currentFileIndex = -1;

  constructor(private notesService: NotesService){

  }

  ngOnInit(): void {
      this.notesService.getAllNotes().subscribe({
        next: (notes)=>{
          this.files = notes;
          console.log(this.files);
        },
        error: (err)=>{
          console.error('Got error while subscribing')
        }
      })
  }



  receiveData(data: NoteData) {
   
    console.log("Data Received: ", data)
    console.log(this.files)
    this.receivedData = data; 
    this.notesService.createNewNote(data).subscribe({
      next: (res)=>{
         this.files.push(data);
        console.log(res);
      },
      error: (err)=>{
        if (err.status === 400) {
    alert('Duplicate title found');
  }
        console.log(err)
      }
    })
  }

  createNote(){
    this.isPreviewVisible = false;
    this.isCreateNoteVisible = true;
  }

  openPreview(index: number){
    console.log(`Notes for index : ${index}`)
    this.currentFileIndex = index;
    console.log('On MySpace', this.files[this.currentFileIndex])
    this.isCreateNoteVisible = false;
    this.isPreviewVisible = true;
  }
  deleteNote(index: number) {
    console.log(`Index Deleted: ${index}`)
    console.log(`Frontend deletion: `, this.files[index])
    this.notesService.deleteNote(this.files[index]).subscribe({
      next: ()=>{
        alert('Note Deleted');
        if (index === this.currentFileIndex) {
    // If deleting the previewed note, hide preview
    this.isPreviewVisible = false;
    this.currentFileIndex = -1;
  }

  this.files.splice(index, 1);

  // Reset view if no notes are left
  if (this.files.length === 0) {
    this.isPreviewVisible = false;
    this.isCreateNoteVisible = true;
  }
      },
      error: (err)=>{
        console.error(err)
      }
    })
  
}


     
}
