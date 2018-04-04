import {Component, OnInit} from '@angular/core';
import {Block} from "../../models/block";
import {BlockServices} from "../../services/block.services";

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
  providers: [BlockServices]
})
export class BlocksComponent implements OnInit {

  public blocks: Block[];

  constructor(private blockServices: BlockServices) {
    blockServices.getAllBlocks()
      .subscribe((blocks) => {
        this.blocks = blocks;
      })

  }

  ngOnInit() {
  }

}
