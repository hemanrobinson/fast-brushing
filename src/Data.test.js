import Data from './Data';

it( "invokes the Data function", () => {
    expect( Data()).toEqual( undefined );
});

it( "initializes the Data function", () => {
    expect( Data.isSelected ).toEqual([]);
});

it( "returns column names", () => {
    expect( Data.getColumnNames()).toEqual([ "isSelected", "A", "B", "A + B", "A * B" ]);
});

it( "returns domains", () => {
    expect( Data.getDomain( 100, 0 )).toEqual([ -2, 2 ]);
});

it( "returns values", () => {
    expect( Data.getValues( 100 ).length ).toBe( 100 );
});

