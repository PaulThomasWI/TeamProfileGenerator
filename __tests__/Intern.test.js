const Intern = require('../lib/Intern');

test('create intern object', () => {
    const intern = new Intern('Paul', 5309, 'paul@theseusgrp.com', 'NWMSU');
    
    expect(intern.school) .toEqual(expect.any(String));
});

test('get school', () => {
    const intern = new Intern('Paul', 5309, 'paul@theseusgrp.com', 'NWMSU');
    
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

test('get role', () => {
    const intern = new Intern('Paul', 5309, 'paul@theseusgrp.com', 'NWMSU');

    expect(intern.getRole()).toEqual("Intern");
}); 