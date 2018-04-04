import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Config} from "../../config";
import {Block} from "../models/block";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class BlockServices {

  constructor(private http: HttpClient) {
  }

  getAllBlocks(): Observable<Block[]> {
    return this.http.post(Config.api.naiveChain.path + '/block/all', {})
      .map((blocks: Block[]) => {
        return blocks.map(block => {
          return new Block(block);
        });
      });
  }

  getOneBlock(hash: string): Observable<Block> {
    return this.http.post(Config.api.naiveChain.path + '/block/one', {hash: hash})
      .map((block: Block) => {
        return new Block(block);
      });
  }

  createOneBlock(block: Block): Observable<Block> {
    return this.http.post(Config.api.naiveChain.path + '/block/create', {data: block})
      .map((block: Block) => {
        return new Block(block);
      });
  }


}
