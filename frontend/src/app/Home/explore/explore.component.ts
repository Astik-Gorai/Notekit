import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProfileCardComponent } from "./profile-card/profile-card.component";
import { ExploreService } from "./explore.service";

interface User{
  name: string
  email: string
  userId: string
}
@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, FormsModule, ProfileCardComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent  implements OnInit{

  searchQuery: string = '';
  foundUsers: User[] = [];
  friendRequests: User[]= [];
  myFriends: User[] = []
  requestSent: boolean = false;
  errorMsg: string = '';
  constructor(private exploreService: ExploreService){
    
  }
  ngOnInit(): void {
      this.exploreService.getAllFriendRequests().subscribe({
        next: (data)=>{
          this.friendRequests = data;
          console.log(data);
        },
        error:(err)=>[
          console.error('No Friend Request FOund')
        ]
      });
      this.exploreService.getMyFriends().subscribe({
        next: (allFriends)=>{
          this.myFriends = allFriends;
        },
        error: (err)=>{
          console.error(err)
        }
      })
  }
  searchFriend() {
    this.errorMsg = '';
    this.requestSent = false;
    this.foundUsers = [];
    
    this.exploreService.getUserByNameOrEmail(this.searchQuery).subscribe({
      next: (users)=>{
        console.log(this.foundUsers)
        this.foundUsers = users;
      },
      error: (err)=>{
        this.errorMsg= 'No User Found'
      }
    })
  }

  sendFriendRequest(userId: string) {
    this.exploreService.sentFriendRequest(userId).subscribe({
      next: ()=>{
        this.requestSent = true;
      },
      error: (err)=>{
        alert(`Something Wriong Happaned`)
      }
    })
  }
  acceptRequest(friendId:string){
    this.exploreService.acceptRequest(friendId).subscribe({
      next: (data)=>{
        alert(`Friend Request Accepted`)
      },
      error: (err)=>{
        console.error(err)
      }
    })
  }
  rejectRequest(friendId:string){
    this.exploreService.rejectRequest(friendId).subscribe({
      next: ()=>{
        alert(`Friend Request Rejected`)
      },
      error: (err)=>{
        console.error(err)
      }
    })
  }
  openChat(friendId:string){

  }
}