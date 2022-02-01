import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {

  bookmark: Bookmark;

  showValidationErrors: boolean;

  constructor(private router: Router, private bookmarkService: BookmarkService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm){

    if (form.invalid) {return this.showValidationErrors = true}
    else {
      const bookmark = new Bookmark(form.value.name,form.value.url);
      this.bookmarkService.addBookmark(bookmark);
      this.router.navigateByUrl('/todos');
      return this.showValidationErrors = false
    }
  }
}
