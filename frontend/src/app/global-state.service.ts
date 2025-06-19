import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface GlobalStateInterface {
  user: {
    email: string;
  } | null;
  name?: string
}

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private initialState: GlobalStateInterface = {
    user: null,
    name: ''
  };
  private stateSubject: BehaviorSubject<GlobalStateInterface>;
  state: Observable<GlobalStateInterface>;
  constructor() {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      console.log('Got Some saved state');
      this.initialState = JSON.parse(savedState);
    }

    this.stateSubject = new BehaviorSubject(this.initialState);
    this.state = this.stateSubject.asObservable();
  }
  getState(): GlobalStateInterface {
    return this.stateSubject.getValue();
  }

  updateState(newState: Partial<GlobalStateInterface>) {
    const currentState = this.stateSubject.getValue();
    const updatedState = { ...currentState, ...newState };
    console.log('Updated State:', updatedState);
    this.stateSubject.next(updatedState);
    try {
      localStorage.setItem('appState', JSON.stringify(updatedState));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }

  clearState() {
    this.initialState = {
      user: null,
    };
    this.stateSubject.next(this.initialState);
    localStorage.removeItem('appState');
  }
}
