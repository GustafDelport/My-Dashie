import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NotificationService } from '../shared/notification.service';
import {v4 as uuidv4} from 'uuid'

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {

  bookmark: Bookmark;
  postID;

  constructor(
    private router: Router, 
    private bookmarkService: BookmarkService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm){
    const {name, url} = form.value;

    const bookmark = new Bookmark(uuidv4(),name, url)

    this.bookmarkService.addBookmark(bookmark).subscribe();

    this.router.navigateByUrl('/bookmarks');
    this.notificationService.show("Bookmark was added!",1000);
  }
}
