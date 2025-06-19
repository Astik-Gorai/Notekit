import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { GlobalStateService } from '../../global-state.service';
import { Observable } from 'rxjs';
import { OutputBlockData } from '@editorjs/editorjs';
import { env } from '../../../enviroments/environment';

export interface NoteComment{
  user: string
  message: string
}
export interface NoteData{
  data:{
    blocks : OutputBlockData<string, any>[];
    version?: string
    time?: number 
  }
  title: string
  noteId?: string
  like: Number
  comments: Array<NoteComment>
  isShared: boolean
  caption?:string
  
  owner: string
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  apiUrl = `${env.BACKEND_URL}/notes`
  constructor(private httpService: HttpClient, private globalStateService: GlobalStateService) { }


  getAllNotes(): Observable<any>{
    return this.httpService.get<any>(`${this.apiUrl}/all-notes`)
  }

  createNewNote(newNote: NoteData):Observable<any>{
    return this.httpService.post<any>(`${this.apiUrl}/new-note`, newNote)
  }

  updateNote(newNote:NoteData): Observable<any>{
    return this.httpService.put<any>(`${this.apiUrl}/update-note`, newNote);
  }

  deleteNote(noteData: NoteData): Observable<any> {
  return this.httpService.delete<any>(`${this.apiUrl}/delete-note`, {
    body: noteData
  });
}
shareNote(noteData: NoteData): Observable<any>{
    return this.httpService.put<any>(`${this.apiUrl}/share-note`, noteData)
  }

  getSharedNotes(): Observable<any> {
    return this.httpService.get<any>(`${this.apiUrl}/get-shared-note`);
  }

  postComment(noteId: string, message:string) : Observable<any>{
    const info ={
      noteId,
      message
    }

    console.log(`Info`, info)
    return this.httpService.post<any>(`${this.apiUrl}/post-comment`,info)
  }
}
