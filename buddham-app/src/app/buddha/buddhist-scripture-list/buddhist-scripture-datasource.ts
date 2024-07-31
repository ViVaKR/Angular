import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface TableItem {
    name: string;
    id: number;
}

export class SutraDataSource extends DataSource<SutraDataSource> {

    data: SutraDataSource[] = [];
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;

    constructor() {
        super();
    }

    override connect(collectionViewer: CollectionViewer): Observable<SutraDataSource[]> {
        if (this.paginator && this.sort) {
            return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
                .pipe(map(() => {
                    // return this.getPagedData(this.getSortedData([...this.data]));
                }));
        } else {
            throw Error('Please set the paginator and sort on the data source before connecting.');
        }
    }

    override disconnect(collectionViewer: CollectionViewer): void {
        throw new Error('Method not implemented.');
    }

    private getPagedData(data: SutraDataSource[]): SutraDataSource[] {
        if (this.paginator) {
            const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
            return data.splice(startIndex, this.paginator.pageSize);
        } else {
            return data;
        }
    }

    // private getSortedData(data: SutraDataSource[]): SutraDataSource[] {
    //     if (!this.sort || !this.sort.active || this.sort.direction === '') {
    //         return data;
    //     }

    //     return data.sort((a, b) => {

    //         const isAsc = this.sort?.direction === 'asc';

    //         switch (this.sort?.active) {
    //             case 'id': return compare(+a.id, +b.id, isAsc)
    //         }
    //     })
    // }

}


function compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
