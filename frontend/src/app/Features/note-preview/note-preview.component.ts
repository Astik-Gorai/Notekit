import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import EditorJS, { ToolConstructable, OutputData, OutputBlockData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


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
  selector: 'app-note-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-preview.component.html',
  styleUrl: './note-preview.component.css'
})
export class NotePreviewComponent implements OnInit, OnDestroy,OnChanges {
 private editor: EditorJS | null = null;
  @Input() data! : NoteData
    // data = {
    //     time: new Date().getTime(),
    //     blocks: [
    //         {
    //             type: "header",
    //             data: {
    //                 text: "Welcome to Editor.js!",
    //                 level: 2
    //             }
    //         },
    //         {
    //             type: "paragraph",
    //             data: {
    //                 text: "This is a default paragraph block. You can edit or add more content."
    //             }
    //         },
    //         {
    //             type: "list",
    //             data: {
    //                 style: "unordered",
    //                 items: [
    //                     "Item 1",
    //                     "Item 2",
    //                     "Item 3"
    //                 ]
    //             }
    //         }
    //     ],
    //     version: "2.27.0",
    //     owner: 'Astik',
    //     like: 23,
    //     isShared: false,
    //     comment: [],
    //     title: 'DSA Notes'
    // }
    title: string='';
    isReadOnly = true;

    convertData(){
     let blocks = this.data.blocks;
     let time = this.data.time;
     let version = this.data.version;
     return {blocks,time,version};
    }
    editNote(){
      if(this.editor){
        this.isReadOnly = false;
        this.editor.readOnly.toggle(false);
        // this.isReadOnly = !this.isReadOnly;
      }
    }
    async saveNote(){
      if (this.editor && !this.isReadOnly) {
      try {
        const outputData = await this.editor.save();
        this.isReadOnly = true;
        this.editor.readOnly.toggle(true);
        if (this.data) {
          this.data.blocks = outputData.blocks;
          this.data.time = outputData.time;
          this.data.version = outputData.version;
        }
        // Emit or save to backend here if needed
        // this.cdr.detectChanges();
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
    }

    ngOnInit(): void {
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
      this.title = this.data.title; // Update the title
      this.editor.render(this.convertData()); // Re-render editor with new data
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
