import { Component, OnInit, OnDestroy } from '@angular/core';
import EditorJS, { ToolConstructable, OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';



// import ColorPlugin from 'editorjs-text-color-plugin';
interface CustomOutputData extends OutputData {
  name?: string; // Optional name property
}

@Component({
  selector: 'app-my-editor',
  standalone: true,
  imports: [],
  templateUrl: './my-editor.component.html',
  styleUrl: './my-editor.component.css'
})
export class MyEditorComponent implements OnInit, OnDestroy {
  private editor: EditorJS | null = null;

  ngOnInit() {
    this.initializeEditor();
    console.log('Initializing your text editor')
  }

  ngOnDestroy() {
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
      data : {
        time: new Date().getTime(),
        blocks: [
            {
                type: "header",
                data: {
                    text: "Welcome to Editor.js!",
                    level: 2
                }
            },
            {
                type: "paragraph",
                data: {
                    text: "This is a default paragraph block. You can edit or add more content."
                }
            },
            {
                type: "list",
                data: {
                    style: "unordered",
                    items: [
                        "Item 1",
                        "Item 2",
                        "Item 3"
                    ]
                }
            }
        ],
        version: "2.27.0"
    }
    
      

    });
  }

  async saveContent() {
    if (this.editor) {
      try {
        const outputData = await this.editor.save();
        console.log('Saved content:', outputData);
        // Implement your save logic here (e.g., send to backend)
        return outputData;
      } catch (error) {
        console.error('Saving failed:', error);
      }
    }
    return null;
  }
}