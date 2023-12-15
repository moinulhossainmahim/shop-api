import { PageMetaDtoParameters } from '../interfaces/page-meta-dto-parameters.interface';
export declare class PageMetaDto {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters);
}
