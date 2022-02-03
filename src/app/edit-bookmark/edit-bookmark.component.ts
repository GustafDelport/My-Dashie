import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {

  bookmark: Bookmark

  constructor(
    private bookmarkService: BookmarkService, 
    private route: ActivatedRoute, 
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id');

      this.bookmarkService.getBookmark(idParam).subscribe({
        next: b => this.bookmark = b
      })
    })
  }

  onFormSubmit(form: NgForm){
      this.bookmark.name = form.value.name;
      this.bookmark.url = new URL(form.value.url);

      this.bookmarkService.updateBookmark(this.bookmark._id,this.bookmark).subscribe();

      this.notificationService.show("Bookmark Updated!",1000);
  }

  delete(){
    // console.log(this.bookmark._id);
    this.bookmarkService.deleteBookmark(this.bookmark._id).subscribe();

    this.router.navigateByUrl('/bookmarks');
    this.notificationService.show("Bookmark was deleted!",1000);
  }

}
