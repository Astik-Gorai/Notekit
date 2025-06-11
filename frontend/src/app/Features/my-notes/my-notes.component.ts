import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  createdAt: Date;
  content?: string; // Store file content for text files
  children?: FileNode[];
}

@Component({
  selector: 'app-my-notes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './my-notes.component.html',
  styleUrl: './my-notes.component.css'
})
export class MyNotesComponent {
  isCreatePopupVisible = false;
  isEditPopupVisible = false;
  fileName = '';
  fileContent = '';
  type: 'file' | 'folder' = 'file';
  root: FileNode = { name: 'root', type: 'folder', createdAt: new Date(), children: [] };
  currentFolder: FileNode = this.root;
  path: FileNode[] = [this.root];
  editingFile: FileNode | null = null;

  openCreatePopup(type: 'file' | 'folder') {
    this.type = type;
    this.fileName = '';
    this.isCreatePopupVisible = true;
  }

  closeCreatePopup() {
    this.isCreatePopupVisible = false;
  }

  openEditPopup(file: FileNode) {
    this.editingFile = file;
    this.fileName = file.name;
    this.fileContent = file.content || '';
    this.isEditPopupVisible = true;
  }

  closeEditPopup() {
    this.isEditPopupVisible = false;
    this.editingFile = null;
    this.fileName = '';
    this.fileContent = '';
  }

  submitCreate() {
    if (!this.fileName.trim()) {
      alert('Name cannot be empty');
      return;
    }

    if (this.type === 'file') {
      this.createFile(this.fileName);
    } else {
      this.createFolder(this.fileName);
    }

    this.closeCreatePopup();
  }

  createFile(name: string) {
    // const fileNameWithExtension = name.endsWith('.txt') ? name : `${name}.txt`;
    const fileNameWithExtension = name;
    const newFile: FileNode = {
      name: fileNameWithExtension,
      type: 'file',
      createdAt: new Date(),
      content: '' // Initialize with empty content
    };

    if (!this.currentFolder.children) {
      this.currentFolder.children = [];
    }
    this.currentFolder.children.push(newFile);

    // Create a downloadable file
    const blob = new Blob([''], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileNameWithExtension;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log('File created:', fileNameWithExtension, 'in folder:', this.currentFolder.name);
  }

  createFolder(name: string) {
    const newFolder: FileNode = {
      name: name,
      type: 'folder',
      createdAt: new Date(),
      children: []
    };

    if (!this.currentFolder.children) {
      this.currentFolder.children = [];
    }
    this.currentFolder.children.push(newFolder);

    console.log('Folder created:', name, 'in folder:', this.currentFolder.name);
  }

  saveFile() {
    if (!this.editingFile || !this.fileName.trim()) {
      alert('File name cannot be empty');
      return;
    }

    // Update file content and name
    this.editingFile.name = this.fileName.endsWith('.txt') ? this.fileName : `${this.fileName}.txt`;
    this.editingFile.content = this.fileContent;

    // Create a downloadable file with updated content
    const blob = new Blob([this.fileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.editingFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log('File saved:', this.editingFile.name, 'in folder:', this.currentFolder.name);
    this.closeEditPopup();
  }

  selectFolder(folder: FileNode) {
    this.currentFolder = folder;
    this.path.push(folder);
  }

  navigateToFolder(index: number) {
    this.path = this.path.slice(0, index + 1);
    this.currentFolder = this.path[index];
  }
}