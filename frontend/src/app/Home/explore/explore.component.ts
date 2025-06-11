import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';



interface Comment {
  user: string;
  text: string;
  timestamp: Date;
}

interface Note {
  id: number;
  user: string;
  content: string;
  fileName: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  @Input() note!: Note;
  isLiked: boolean = false;
  newComment: string = '';
  previewLines: string[] = [];
  maxPreviewLines: number = 5;
  showFullContent: boolean = false;


  ngOnInit(): void {
      this.generatePreview();
  }
  generatePreview(): void {
    const lines = this.note.content.split('\n');
    this.previewLines = lines.slice(0, this.maxPreviewLines);
  }

  toggleLike(): void {
    this.isLiked = !this.isLiked;
    this.note.likes += this.isLiked ? 1 : -1;
  }

   addComment(): void {
    if (this.newComment.trim()) {
      this.note.comments.push({
        user: 'CurrentUser', // Replace with actual user from auth service
        text: this.newComment,
        timestamp: new Date()
      });
      this.newComment = '';
    }
  }

  toggleContent(): void {
    this.showFullContent = !this.showFullContent;
  }

  downloadNote(): void {
    const blob = new Blob([this.note.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.note.fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
