const Manager = require('../lib/Manager');

test('create manager object', () => {
    const manager = new Manager('Paul', 5309, 'paul@theseusgpr.com', 1);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('gets role', () => {
    const manager = new Manager('Paul', 5309, 'paul@theseusgpr.com', 1);

    expect(manager.getRole()).toEqual("Manager");
}); 