import { Component, OnInit, OnDestroy, Output , EventEmitter} from '@angular/core';
import EditorJS, { ToolConstructable, OutputData, OutputBlockData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import Quote from '@editorjs/quote';
import { FormsModule } from '@angular/forms';
import { NoteData } from '../my-space/notes.service';
import { defaultData } from './defaultData';
import { GlobalStateService } from '../../global-state.service';





@Component({
  selector: 'app-my-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './my-editor.component.html',
  styleUrl: './my-editor.component.css'
})
export class MyEditorComponent implements OnInit, OnDestroy {
  @Output() dataEvent = new EventEmitter<NoteData>();
  private editor: EditorJS | null = null;
  noteTitle: string = '';
  completeData!: NoteData;

  constructor(private globalStateService: GlobalStateService){

  }
  ngOnInit() : void {
    this.initializeEditor();
    console.log('Initializing your text editor')
  }

  ngOnDestroy() : void{
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  }

  private initializeEditor() {
    this.editor = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      tools: {
        header: {
          class: Header ,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4],
           defaultLevel: 3
          }
        },
        list: {
          class: List,
          inlineToolbar: true
        },
        code: {
          class: CodeTool 
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
          class: InlineCode
        },
        quote: {
          class: Quote ,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author'
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
      data : defaultData.data
    
      

    });
  }

  async saveContent() {
    if(this.noteTitle.trim().length == 0){
      alert('Note Title Can not be empty');
      
    }else{
       if (this.editor) {
      try {
        const outputData = await this.editor.save();
        this.completeData = {data: {...outputData},title: this.noteTitle.trim(), isShared: false, like: 0, comments: [],owner: this.globalStateService.getState()?.user?.email|| ''}
        console.log('Saved content:', this.completeData);
        // Implement your save logic here (e.g., send to backend)
        this.dataEvent.emit(this.completeData);
        this.editor.clear();
        this.noteTitle='';
        return this.completeData;
      } catch (error) {
        console.error('Saving failed:', error);
      }
    }
    }
   
    return null;
  }
}