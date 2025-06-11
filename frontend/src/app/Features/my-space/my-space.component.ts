import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MyEditorComponent } from '../my-editor/my-editor.component';
import { NotePreviewComponent } from '../note-preview/note-preview.component';
import { OutputBlockData } from '@editorjs/editorjs';

interface NoteData{
  title: string
  blocks : OutputBlockData<string, any>[];
  version?: string
  like: Number
  comment: Array<Object>
  isShared: boolean
  time?: number 
  owner: string
}

@Component({
  selector: 'app-my-space',
  standalone: true,
  imports: [CommonModule, MyEditorComponent, NotePreviewComponent],
  templateUrl: './my-space.component.html',
  styleUrl: './my-space.component.css'
})
export class MySpaceComponent {
  files: Array<NoteData> = [];
  title: string = ''
  isCreateNoteVisible  = true;
  isPreviewVisible = false;
  receivedData: any;
  currentFileIndex = -1;


  receiveData(data: NoteData) {
    this.files.push(data);
    console.log("Data Received: ", data)
    console.log(this.files)
    this.receivedData = data; // Store received object
  }

  createNote(){
    this.isPreviewVisible = false;
    this.isCreateNoteVisible = true;
  }

  openPreview(index: number){
    console.log(`Notes for index : ${index}`)
    this.currentFileIndex = index;
    this.isCreateNoteVisible = false;
    this.isPreviewVisible = true;
  }

     
}
