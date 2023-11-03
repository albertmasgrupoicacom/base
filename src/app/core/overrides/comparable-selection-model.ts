import { SelectionModel } from '@angular/cdk/collections';

export class ComparableSelectionModel<T> extends SelectionModel<T> {
    public compareWith: (o1: T, o2: T) => boolean;

    constructor(_multiple?: boolean, initial?: T[], _emitChanges?: boolean, compareWith?: (o1: T, o2: T) => boolean) {
        super(_multiple, initial, _emitChanges);

        this.compareWith = compareWith ? compareWith : (o1, o2) => o1 === o2;
    }

    /**
     * We also need to override deselect since you may have objects that
     * meet the comparison criteria but are not the same instance.
     */
    override deselect(...values: T[]): void {
        // using bracket notation here to work around private methods
        this['_verifyValueAssignment'](values);

        values.forEach(value => {
            // need to find the exact object in the selection set so it
            // actually gets deleted
            const found = this.selected.find(x => this.compareWith(value, x));
            if (found) {
                this['_unmarkSelected'](found);
            }
        });

        this['_emitChangeEvent']();
    }
}
