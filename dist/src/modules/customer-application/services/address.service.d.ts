import { Model } from 'mongoose';
import { IAddress, IProfile } from 'core-db/interface';
import { AddressDto } from '../dto/address.dto';
export declare class AddressService {
    private readonly addressModel;
    private readonly profileModel;
    constructor(addressModel: Model<IAddress>, profileModel: Model<IProfile>);
    createAddress(addressDto: AddressDto, req: any): Promise<import("mongoose").Document<unknown, {}, IAddress, {}, {}> & IAddress & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    findAll(req: any): Promise<(import("mongoose").Document<unknown, {}, IAddress, {}, {}> & IAddress & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    removeAddress(id: string): Promise<(import("mongoose").Document<unknown, {}, IAddress, {}, {}> & IAddress & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateAddress(id: string, addressDto: AddressDto, req: any): Promise<(import("mongoose").Document<unknown, {}, IAddress, {}, {}> & IAddress & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    getAddressViaPhone(phone: string): Promise<{
        firstName: string;
        lastName: string | undefined;
        _id: string;
        profile: import("mongoose").Types.ObjectId;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        pincode?: string | undefined;
        isDefault?: boolean | undefined;
        __v: number;
    } | null>;
}
