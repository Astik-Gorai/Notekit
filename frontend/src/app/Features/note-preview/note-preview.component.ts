import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import EditorJS, { ToolConstructable, OutputData, OutputBlockData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import { CommonModule } from '@angular/common';
import { NoteData, NotesService } from '../my-space/notes.service';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-note-preview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-preview.component.html',
  styleUrl: './note-preview.component.css'
})
export class NotePreviewComponent implements OnInit, OnDestroy,OnChanges {
 private editor: EditorJS | null = null;
  @Input() data! : NoteData
  @Input() isSharedMode? : boolean
  caption: string = "Hey I have created this note on NoteKit, Checkout this";
    title: string= '';
    isReadOnly = true;
    isCaptionPopupVisible: boolean = false;
    constructor(private notesService: NotesService){

    }
    openCaptionPopup(): void {
    this.caption = '';     // reset
    this.isCaptionPopupVisible = true;
  }

  closeCaptionPopup(ev?: MouseEvent): void {
    // Optional arg because overlay click passes the event
    this.isCaptionPopupVisible = false;
  }

  postCaption(): void {
    const payload = {
      noteId: this.data.noteId,
      caption: this.caption.trim()
    };
    // 👉 call your share service here
    // this.noteService.shareNote(payload).subscribe(…);

    
    this.data.isShared = true;   // flip the badge
  }

    convertData(){
     let blocks = this.data.data.blocks;
     let time = this.data.data.time;
     let version = this.data.data.version;
     console.log(`Convert Data Function is Called` , blocks,time,version)
     return {blocks,time,version};
    }
    editNote(){
      if(this.editor){
        this.isReadOnly = false;
        this.editor.readOnly.toggle(false);
      }
    }
    async saveNote(){
      if (this.editor && !this.isReadOnly) {
      try {
        const outputData = await this.editor.save();
        this.isReadOnly = true;
        this.editor.readOnly.toggle(true);
        if (this.data) {
          this.data.data.blocks = outputData.blocks;
          this.data.data.time = outputData.time;
          this.data.data.version = outputData.version;
        }
        this.notesService.updateNote(this.data).subscribe({
          next: (t)=>{
            alert('Note Updated')
          },
          error: (err)=>{
            console.error(err);
          }
        })
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
    }

    shareNote(){
      this.data.caption = this.caption.trim();
      this.isCaptionPopupVisible = true;
     
    }
    postNote(){
       this.notesService.shareNote(this.data).subscribe({
        next: (res)=>{
          alert('Note Shared SucessFully');
        },
        error: (err)=>{
          console.error(err)
        }
      })
      this.isCaptionPopupVisible = false;
    }

    ngOnInit(): void {
      if(!this.isSharedMode){
        this.isSharedMode = false
      }
    this.title = this.data.title;
    this.initializeEditor();
    console.log('Initializing your text editor')
  }
  ngOnDestroy() : void{
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
      if (changes['data'] && this.editor) {
      this.title = this.data.title;
      this.editor.render(this.convertData());
    }
  }

    private initializeEditor() {
      this.editor = new EditorJS({
        holder: 'editorjs',
        autofocus: true,
        tools: {
          header: {
            class: Header as unknown as ToolConstructable,
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3, 4],
              defaultLevel: 1
            }
          },
          list: {
            class: List as unknown as ToolConstructable,
            inlineToolbar: true
          },
          code: {
            class: CodeTool as unknown as ToolConstructable
          },
          table: {
            class: Table as unknown as ToolConstructable,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3
            }
          },
          inlineCode: {
            class: InlineCode as unknown as ToolConstructable
          },
          quote: {
            class: Quote as unknown as ToolConstructable,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author'
            }
          },
          image: {
            class: ImageTool as unknown as ToolConstructable,
            config: {
              endpoints: {
                byFile: '/api/uploadImage', // Your backend upload endpoint
                byUrl: '/api/fetchUrl' // Your backend URL fetch endpoint
              }
            }
          }
        },
        placeholder: 'Start typing your notes...',
        onReady: () => {
          console.log('Editor.js is ready to work!');
        },
        onChange: async () => {
          if (this.editor) {
            const outputData = await this.editor.save();
            // console.log('Editor content:', outputData);
            // You can save the outputData to your backend here
          }
        },
        readOnly:true,
      data : this.convertData()
      
        

      });
    }


  }
