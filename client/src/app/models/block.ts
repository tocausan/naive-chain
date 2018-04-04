import * as _ from 'lodash';

export class Block {
  public index: number;
  public timestamp: number;
  public data: object;
  public target: number;
  public nonce: number;
  public prevHash: string;
  public currHash: string;
  public qrCode: string;

  constructor(data?: any) {
    const prevBlock = !_.isNil(data) && !_.isNil(data.prevBlock) ? data.prevBlock : null;
    this.index = !_.isNil(data) && !_.isNil(data.index) ? data.index : null;
    this.timestamp = !_.isNil(data) && !_.isNil(data.timestamp) ? data.timestamp : null;
    this.data = !_.isNil(data) && !_.isNil(data.data) ? data.data : {};
    this.target = !_.isNil(data) && !_.isNil(data.target) ? data.target : null;
    this.nonce = !_.isNil(data) && !_.isNil(data.nonce) ? data.nonce : null;
    this.prevHash = !_.isNil(data) && !_.isNil(data.prevHash) ? data.prevHash : null;
    this.currHash = !_.isNil(data) && !_.isNil(data.currHash) ? data.currHash : null;
    this.qrCode = !_.isNil(data) && !_.isNil(data.qrCode) ? data.qrCode : null;
  }

}
