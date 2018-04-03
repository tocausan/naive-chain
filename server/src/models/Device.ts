import * as _ from 'lodash';
import * as moment from 'moment';
import {EncryptionServices} from '../services';

export interface IDevice {
    name: string;
    host: string;
    publicKey: string;
    privateKey: string;
    connection: string;
}

export class Device implements IDevice {

    public name: string;
    public host: string;
    public publicKey: string;
    public privateKey: string;
    public connection: string;

    constructor(data?: any) {
        this.name = !_.isNil(data) && !_.isNil(data.name) ? data.name : null;
        this.host = !_.isNil(data) && !_.isNil(data.host) ? data.host : null;
        this.publicKey = !_.isNil(data) && !_.isNil(data.publicKey) ? data.key.publicKey : null;
        this.privateKey = !_.isNil(data) && !_.isNil(data.privateKey) ? data.key.privateKey : null;
        this.connection = !_.isNil(data) && !_.isNil(data.connection) ? data.connection : moment.utc().format();
    };

    initKeys() {
        this.publicKey = EncryptionServices.hash(EncryptionServices.randomSecret(20));
        this.privateKey = EncryptionServices.hash(EncryptionServices.randomSecret(20));
        return this;
    };

}