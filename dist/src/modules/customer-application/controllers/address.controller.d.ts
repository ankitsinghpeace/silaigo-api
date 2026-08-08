import { AddressService } from '../services/address.service';
import { AddressDto } from '../dto/address.dto';
import { Request } from 'express';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    createAddress(addressDto: AddressDto, req: Request): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IAddress, {}, {}> & import("../../../../core-db/interface").IAddress & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    getAll(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IAddress, {}, {}> & import("../../../../core-db/interface").IAddress & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    removeAddress(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IAddress, {}, {}> & import("../../../../core-db/interface").IAddress & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateAddress(id: string, addressDto: AddressDto, req: Request): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IAddress, {}, {}> & import("../../../../core-db/interface").IAddress & Required<{
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
