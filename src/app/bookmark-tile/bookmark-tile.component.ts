import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';

@Component({
  selector: 'app-bookmark-tile',
  templateUrl: './bookmark-tile.component.html',
  styleUrls: ['./bookmark-tile.component.scss']
})
export class BookmarkTileComponent implements OnInit {

  @Input() bookmark: Bookmark;

  tileIconSrc: string;

  fallbackIco: string;

  faviconError: boolean;

  constructor() { }

  ngOnInit(): void {
    
    if (!this.hasWhiteSpace(this.bookmark.name) && this.faviconError) {
      this.fallbackIco = this.bookmark.name[0]
    }
    else {
      this.fallbackIco = this.bookmark.name[0] + this.bookmark.name[this.bookmark.name.indexOf(' ')+1]
    }

    this.tileIconSrc = this.bookmark.url + '/favicon.ico';
  }

  hasWhiteSpace(str: string): Boolean {
    return str.indexOf(' ') >= 0;
  }

}
